async function main() {

    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const marketplace = await NFTMarketplace.deploy("0xE4761aB1ac27A309b9fa36f6dab3376805f80A82");
    //await marketplace.deployed();
  
    console.log("Marketplace deployed to address:", marketplace.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1);
    });

    //0x3B198b2F7dfe7e4f5F397E4Ec906Dd1BbA878802