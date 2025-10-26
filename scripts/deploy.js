const hre = require("hardhat");
const { ethers, network } = require('hardhat');

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {
	const [parent, kid1, kid2, kid3] = await ethers.getSigners()

	const Allowance = await ethers.getContractFactory("allowanceTracker")
	const allowance = await Allowance.connect(parent).deploy()

	console.log(`allowance deployed with this address: ${allowance.target}`)
	console.log("depositing value ...")

	transaction = await allowance.connect(parent).deposit({ value: tokens(50)})
	await transaction.wait()
	console.log("deposited 50 ETH")

	console.log("setting allowances for kids...")
	transaction = await allowance.connect(parent).setAllowance(tokens(14), kid1)
	await transaction.wait()

	transaction = await allowance.connect(parent).setAllowance(tokens(26), kid2)
	await transaction.wait()

	transaction = await allowance.connect(parent).setAllowance(tokens(10), kid3)
	console.log('kids allowances setted')

	console.log("adding kids...")
	transaction = await allowance.connect(parent).addKid(kid1)
	await transaction.wait()

	transaction = await allowance.connect(parent).addKid(kid2)
	await transaction.wait()

	transaction = await allowance.connect(parent).addKid(kid3)
	await transaction.wait()
	console.log('kids added')

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
