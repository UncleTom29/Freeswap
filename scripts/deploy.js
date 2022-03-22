const { ethers } = require('hardhat');

async function main() {
  const FreeswapFactory = await ethers.getContractFactory('FreeswapFactory');
  const factory = await FreeswapFactory.deploy();
  console.log(`FreeswapFactory deployed at ${factory.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
