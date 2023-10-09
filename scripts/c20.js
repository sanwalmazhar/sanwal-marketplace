const { ethers } = require("hardhat");

async function main() {
  // Get a signer or deployer
  const [deployer] = await ethers.getSigners();


  console.log("Deploying ERC20 token...");

  // Deploy the ERC20 token contract with the provided constructor arguments
  const ERC20Token = await ethers.getContractFactory("MyERC20Token");
  const erc20Token = await ERC20Token.deploy();

  //await erc20Token.deployed();

 console.log(`FunToken deployed to: ${erc20Token.target}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  //0xBc771A8e2fb8920Bb61ac2c90e672B651B49a605