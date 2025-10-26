import { ethers } from 'ethers'
// import { getContract } from '../contract.jsx'

function WithrawButton({contract}) {
	const tokens = (n) => {
    	return ethers.parseUnits(n.toString(), 'ether')
	}

	const withrawHandler = async () => {
		const transaction = await contract.withraw(tokens(1))
		await transaction.wait()
	}

		return (
			<div> 
				<button onClick={withrawHandler}> 
					withraw 1 ETH
				</button>
			</div>
	)
}

export default WithrawButton