const { expect } = require('chai');
const { ethers, network } = require('hardhat');

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether')
}

describe("allowanceTracker", () => {
	let allowance;

	beforeEach( async() => {

		[parent, kid1, kid2, ananymos] = await ethers.getSigners()

		const Allowance = await ethers.getContractFactory("allowanceTracker")
		allowance = await Allowance.connect(parent).deploy()

		transaction = await allowance.connect(parent).deposit({ value: tokens(20)})
		await transaction.wait()

		transaction = await allowance.connect(parent).setAllowance(tokens(3), kid1)
		await transaction.wait()

		transaction = await allowance.connect(parent).setAllowance(tokens(5), kid2)
		await transaction.wait()

		transaction = await allowance.connect(parent).addKid(kid1)
		await transaction.wait()

		transaction = await allowance.connect(parent).addKid(kid2)
		await transaction.wait()
	})

	it ('deopist funds', async() => {
		const result = await allowance.getBalance()
		expect(result).to.be.equal(tokens(20))
	})

	it ('setting allowance', async() => {
		const result1 = await allowance.connect(kid1).getAllowance()
		const result2 = await allowance.connect(kid2).getAllowance()

		expect(result1).to.be.equal(tokens(3))
		expect(result2).to.be.equal(tokens(5))
	})

	it ('are those my kids???', async() => {
		const result1 = await allowance.myKids(kid1)
		const result2 = await allowance.myKids(kid2)
  		const result3 = await allowance.myKids(ananymos)

		expect(result1 && result2).to.be.equal(true)
		expect(result3).to.be.equal(false)
	})

	it('only parent can setAllowance, addKid and deposit', async() => {
		await expect(
			allowance.connect(ananymos).deposit({ value: tokens(1)})
			&& 
			allowance.connect(kid1).addKid(kid1) 
			&& 
			allowance.connect(kid2).setAllowance(tokens(4), kid2)
		).to.be.revertedWith('only parent can call this function')
	})

	it('kids withrawing + checnking allowance and time ', async() => {
		await expect(allowance.connect(kid1).withraw(tokens(10))).to.be.revertedWith('The amount is higher than your allowance honey')

		await expect(allowance.connect(kid1).withraw(tokens(2))).to.changeEtherBalances([allowance, kid1], [-tokens(2), tokens(2)])

		// transaction = await allowance.connect(kid1).withraw(tokens(2))
		
		expect( await allowance.getBalance()).to.be.equal(tokens(18))
		expect(await allowance.connect(kid1).getAllowance()).to.be.equal(tokens(1))

		await expect(allowance.connect(kid1).withraw(tokens(1))).to.be.revertedWith('you can try agian in two minutes honey')

		await network.provider.send("evm_increaseTime", [130]);
        await network.provider.send("evm_mine");

        await expect(allowance.connect(kid1).withraw(tokens(2))).to.be.revertedWith('The amount is higher than your allowance honey')
		expect(await allowance.connect(kid1).withraw(tokens(1))).to.changeEtherBalances([allowance, kid1], [-tokens(1), tokens(1)])
	})

	it('only kids can withraw', async() => {
		await expect(
			allowance.connect(ananymos).withraw(tokens(10))
			&& 
			allowance.connect(parent).withraw(tokens(1)) 
		).to.be.revertedWith('only kids can call this function')
	})
})