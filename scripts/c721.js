const { ethers } = require("hardhat");

async function main() {
  // Get a signer or deployer
  const [deployer] = await ethers.getSigners();


  console.log("Deploying ERC20 token...");

  // Deploy the ERC20 token contract with the provided constructor arguments
  const NFTMinter = await ethers.getContractFactory("NFTMinter");
  const erc721Token = await NFTMinter.deploy("0xBc771A8e2fb8920Bb61ac2c90e672B651B49a605","0x8b141E3f3b26d2a6536A778F7E0F72CF833db26B");

  //await erc20Token.deployed();

 console.log(`FunToken deployed to: ${erc721Token.target}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//0x401455A43c473f3F019d3e433F85693077145a98
