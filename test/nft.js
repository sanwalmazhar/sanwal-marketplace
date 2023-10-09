
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


   describe ("getNFTDetails",function (){
    it ("getting nft details", async function (){
        const tokenId = 1;
        const price = ethers.parseEther("1");
        const listingPrice = ethers.parseEther("1");
        await nft.connect(owner).mintNFT(owner.address);
        await marketplaceContract.connect(owner).getNFTOwner(tokenId);

        await marketplaceContract.connect(owner).listNFT(tokenId, price);
        await marketplaceContract.connect(addr2).buyNFT(tokenId, {value : listingPrice});
        await marketplaceContract.connect(addr2).getNFTDetails(tokenId);
    })
   })
   describe("getNFTOwner",function (){
    it ("it should get nft details",async function (){
        const tokenId = 1;
        const price = ethers.parseEther("1");
        const listingPrice = ethers.parseEther("1");
        await nft.connect(owner).mintNFT(owner.address);
        await marketplaceContract.connect(owner).getNFTOwner(tokenId);

        await marketplaceContract.connect(owner).listNFT(tokenId, price);
        await marketplaceContract.connect(addr2).buyNFT(tokenId, {value : listingPrice});
        await marketplaceContract.connect(addr2).getNFTDetails(tokenId);
        await marketplaceContract.connect(addr2).getNFTOwner(tokenId);
    })
   })
   describe("isNFTListed",function (){
    it ("it should check  nft listed or not",async function (){
        const tokenId = 1;
        const price = ethers.parseEther("1");
        const listingPrice = ethers.parseEther("1");
        await nft.connect(owner).mintNFT(owner.address);
        await marketplaceContract.connect(owner).getNFTOwner(tokenId);

        await marketplaceContract.connect(owner).listNFT(tokenId, price);
        await marketplaceContract.connect(addr2).buyNFT(tokenId, {value : listingPrice});
        await marketplaceContract.connect(addr2).getNFTDetails(tokenId);
        await marketplaceContract.connect(addr2).getNFTOwner(tokenId);
        await marketplaceContract.connect(addr2).isNFTListed(tokenId);
    })
   })
});
