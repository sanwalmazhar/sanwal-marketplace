// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract NFTMarketplace is IERC721Receiver {
    // Define the owner of the marketplace
    address public owner;
    uint256 nftPrice = 1;

    IERC721 public nftContract;

    using Address for address payable;

    event NFTListed(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );
    event NFTUnlisted(uint256 indexed tokenId);
    event NFTSold(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );

    // Mapping from token ID to listing
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => NFTOwnership) private nftOwners;

    // Struct to represent NFT listings
    struct Listing {
        uint256 tokenId;
        address seller;
        uint256 price;
        bool isListed;
    }
    struct NFTOwnership {
        address owner;
        bool isListed;
    }

    constructor(address _nftContract) {
        owner = msg.sender;
        nftContract = IERC721(_nftContract);
    }

    // List an NFT for sale
    function listNFT(uint256 _tokenId, uint256 _price) external {
        // require(
        //     nftContract.ownerOf(_tokenId) == msg.sender,
        //     "You can only list your own NFT"
        // );
        require(!listings[_tokenId].isListed, "NFT is already listed");

        listings[_tokenId] = Listing(_tokenId, msg.sender, _price, true);
        emit NFTListed(_tokenId, msg.sender, _price);
    }

    // Unlist an NFT from sale
    function unlistNFT(uint256 _tokenId) external {
        require(listings[_tokenId].isListed, "NFT is not listed");
        require(
            listings[_tokenId].seller == msg.sender,
            "You can only unlist your own NFT"
        );

        delete listings[_tokenId];
        emit NFTUnlisted(_tokenId);
    }

    // Buy an NFT
    function buyNFT(uint256 _tokenId) external payable {
        Listing memory listing = listings[_tokenId];
        require(listing.isListed, "NFT is not listed");
        // require(nftPrice == listing.price, "Insufficient funds sent");

        // Transfer the NFT to the buyer
        nftContract.safeTransferFrom(
            listing.seller,
            msg.sender,
            listing.tokenId
        );

        // Transfer the payment to the seller
        payable(listing.seller).sendValue(nftPrice);

        // Remove the listing
        delete listings[_tokenId];

        emit NFTSold(_tokenId, listing.seller, msg.sender, listing.price);
    }

    function getNFTDetails(uint256 _tokenId)
        external
        view
        returns (
            address _owner,
            uint256 price,
            bool isListed
        )
    {
        NFTOwnership memory nftOwnership = nftOwners[_tokenId];
        Listing memory listing = listings[_tokenId];
        return (nftOwnership.owner, listing.price, nftOwnership.isListed);
    }

    function getNFTOwner(uint256 _tokenId) external view returns (address) {
        return nftOwners[_tokenId].owner;
    }

    function isNFTListed(uint256 _tokenId) external view returns (bool) {
        return nftOwners[_tokenId].isListed;
    }

    // Fallback function to receive ETH
    receive() external payable {}

    // ERC721 receiveApproval function (required for safeTransferFrom)
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
