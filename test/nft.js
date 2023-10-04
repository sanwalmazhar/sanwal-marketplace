// // Import necessary modules
// const { expect } = require('chai');
// const { ethers } = require('hardhat');

// describe("NFT ", function () {
//     let nft;
//     let owner;
//     let addr1;
//     let addr2;

//     beforeEach(async function () {
//         // Deploy the NFT contract
//         [owner, addr1, addr2] = await ethers.getSigners();
//         const NFT = await ethers.getContractFactory("NFT");
//         nft = await NFT.deploy();
//         //await nft.deployed();
//     });

//     it("Should deploy the contract with the correct name and symbol", async function () {
//         expect(await nft.name()).to.equal("MyNFT");
//         expect(await nft.symbol()).to.equal("NFT");
//     });
     
//     describe("mintNFT", function (){
//         it ("owner should mint the nft", async function (){
//             await nft.connect(owner).mintNFT(owner.address);
//         })
//     })

//     // it("Should not allow minting by non-owner", async function () {
//     //     // Attempt to mint an NFT by addr1 (not the owner)
//     //     await expect(nft.connect(owner).mintNFT(addr2.address)).to.be.revertedWith("Ownable: caller is not the owner");
//     // });
// });
