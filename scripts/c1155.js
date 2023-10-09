const { ethers } = require("hardhat");

async function main() {
  // Get a signer or deployer
  const [deployer] = await ethers.getSigners();

  // The initial supply you want to set

  // Deploy the ERC20 token contract with the provided constructor arguments
  const MyToken = await ethers.getContractFactory("MyToken");
  const erc1155Token = await MyToken.deploy();

  //await erc20Token.deployed();

 console.log(`FunToken deployed to: ${erc1155Token.target}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  //0x8b141E3f3b26d2a6536A778F7E0F72CF833db26B