 import { ethers } from "ethers";
 import allowanceTracker from '../../artifacts/contracts/allowanceTracker.sol/allowanceTracker.json'

 const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

 export async function getContract() {
 	if (!window.ethereum) {
 		throw new Error('metamask not installed');
 	}

 	const provider = new ethers.BrowserProvider(window.ethereum);
 	const signer = await provider.getSigner();
 	return new ethers.Contract(contractAddress, allowanceTracker.abi, signer)
 }
