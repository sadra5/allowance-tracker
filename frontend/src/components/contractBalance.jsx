import { useReadContract } from "wagmi";
import { formatEther } from "viem";
import { allowanceTrackerAddress, allowanceTrackerAbi } from "../contracts/allowanceTracker";

function ContractBalance() {
    const { data, isLoading, error } = useReadContract({
        address: allowanceTrackerAddress,
        abi: allowanceTrackerAbi,
        functionName: "getBalance"
    })

    
    console.log(data)
    console.log(error)

    return(
        <div>
            Contract balance: {data? formatEther(data) : "0"} ETH
        </div>
    )
}

export default ContractBalance