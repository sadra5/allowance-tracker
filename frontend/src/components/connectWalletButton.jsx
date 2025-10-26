import { useState } from 'react';

function ConnectWalletButton({account, setAccount}) {

	async function connectWallet() {
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
		setAccount(accounts[0])
	}

	return (
			<div> 
				<button onClick={connectWallet}> 
					{account ? `Connected: ${account}` : 'connectWallet'}
				</button>
			</div>
		)
}

export default ConnectWalletButton