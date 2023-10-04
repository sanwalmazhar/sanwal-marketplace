const {ethers} = require("hardhat");


async function main() {
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
 // await nft.deployed();

  console.log("NFT deployed to address:", nft.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
  //0xE4761aB1ac27A309b9fa36f6dab3376805f80A82