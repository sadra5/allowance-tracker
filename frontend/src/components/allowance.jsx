import { useAccount ,useReadContract } from "wagmi";
import { formatEther } from "viem";
import { allowanceTrackerAddress, allowanceTrackerAbi } from "../contracts/allowanceTracker";

function Allowance() {
    const {address, isConnected} = useAccount()

    const { data, isLoading, error } = useReadContract({
        address: allowanceTrackerAddress,
        abi: allowanceTrackerAbi,
        functionName: "getAllowance",
        account: address,
    })

    console.log("Allowance data: ", data)
    console.log(error)

    return(
        <div>
            YOUR Allowance: {data ? formatEther(data) : "0"} ETH
        </div>
    )
}

export default Allowance