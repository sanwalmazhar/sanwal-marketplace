//const { expect } = require("chai");
//const { ethers } = require("hardhat");
const hre = require("hardhat");
const ethers = hre.ethers;

describe("NFT ", function () {
    let nft;
    let marketplaceContract;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        // Deploy the NFT contract
        [owner, addr1, addr2] = await ethers.getSigners();
        const NFT = await ethers.getContractFactory("NFT");
        nft = await NFT.deploy();
        //await nft.deployed();
        // await nft.connect(owner).deployed();

        //await nft.deployed();
       // console.log("nft.address",nft?.address);
        let NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        marketplaceContract = await NFTMarketplace.deploy("0xE4761aB1ac27A309b9fa36f6dab3376805f80A82");
        console.log("marketplaceContract",marketplaceContract.address);
        // marketplaceContract = await NFTMarketplace.deploy();

        
    });

    // it("Should deploy the contract with the correct name and symbol", async function () {
    //     expect(await nft.name()).to.equal("MyNFT");
    //     expect(await nft.symbol()).to.equal("NFT");
    // });
    

    describe("mintNFT", function (){
        it ("owner should mint the nft", async function (){
            await nft.connect(owner).mintNFT(owner);
        })
    });
    describe("ownerNFT", function (){
        it ("owner of the nft", async function (){
            let tokenId = 1;
            await nft.connect(owner).mintNFT(owner);
            await marketplaceContract.connect(owner).getNFTOwner(tokenId);
        })
    });
    describe("listNFT", function () {
        it("Should list an NFT for sale", async function () {
            const tokenId = 1;
            const price = ethers.parseEther("1");
            await nft.connect(owner).mintNFT(owner.address);
            await marketplaceContract.connect(owner).getNFTOwner(tokenId);
            await marketplaceContract.connect(owner).listNFT(tokenId, price)
        });
    })

    describe("buyNFT" , function () {
        it ("it should buy nft ", async function (){
            const tokenId = 1;
            const price = ethers.parseEther("1");
            const listingPrice = ethers.parseEther("1");
            console.log ("listingPrice",listingPrice);
            await nft.connect(owner).mintNFT(owner.address);
            console.log("owner",owner);
            await marketplaceContract.connect(owner).getNFTOwner(tokenId);
            console.log ("tokenID",tokenId);

            await marketplaceContract.connect(owner).listNFT(tokenId, price);
            console.log("tokenId,price",tokenId,price);
            await marketplaceContract.connect(addr2).buyNFT(tokenId, {value : listingPrice});
            console.log("addr2",addr2);
        })
    })


    //   it("Should allow buying an NFT", async function () {
    //     const tokenId = 1;
    //     const price = ethers.utils.parseEther("1.0");

    //     // Ensure that addr1 has sufficient funds
    //     await addr1.sendTransaction({ to: marketplaceContract.address, value: price });

    //     // Buy the NFT
    //     await marketplaceContract.connect(addr2).buyNFT(tokenId, { value: price });

    //     // Verify that the NFT is no longer listed
    //     const isListed = await marketplaceContract.isNFTListed(tokenId);
    //     expect(isListed).to.be.false;

    //     // Verify the NFT owner is now addr2
    //     const nftOwner = await marketplaceContract.getNFTOwner(tokenId);
    //     expect(nftOwner).to.equal(addr2.address);
    //   });

    //   it("Should unlist an NFT", async function () {
    //     const tokenId = 1;

    //     // Unlist the NFT
    //     await marketplaceContract.connect(addr1).unlistNFT(tokenId);

    //     // Verify that the NFT is no longer listed
    //     const isListed = await marketplaceContract.isNFTListed(tokenId);
    //     expect(isListed).to.be.false;
    //   });
});
