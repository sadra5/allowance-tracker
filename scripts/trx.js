const hre = require("hardhat");
const { ethers, network } = require('hardhat');

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {
    

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});