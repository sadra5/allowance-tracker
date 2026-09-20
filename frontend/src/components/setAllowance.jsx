import { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseEther } from "viem";

import { allowanceTrackerAddress, allowanceTrackerAbi} from "../contracts/allowanceTracker";

function SetAllowance() {
    const [kidAddress, setKidAddress] = useState("")
    const [amount, setAmount] = useState("")

    const { address } = useAccount()

    const { data: parent } = useReadContract({
        address: allowanceTrackerAddress,
        abi: allowanceTrackerAbi,
        functionName: "parent"
    })

    const { writeContract, isPending, error} = useWriteContract()

    const isParent =
        address &&
        parent &&
        address.toLowerCase() === parent.toLowerCase();


    function handleSetAllowance() {
        if (!kidAddress || !amount) return;

        writeContract({
            address: allowanceTrackerAddress,
            abi: allowanceTrackerAbi,
            functionName: "setAllowance",
            args: [
                parseEther(amount),
                kidAddress,
            ],
        })
    }

    if (!isParent) {
        return null;
    }

    return (
        <div>
            <h2>Set Allowance</h2>

            <input
                type="text"
                placeholder="Kid wallet address"
                value={kidAddress}
                onChange={(e) => setKidAddress(e.target.value)}
            />

            <input
                type="text"
                placeholder="Allowance in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <button
                onClick={handleSetAllowance}
                disabled={isPending}
            >
                {isPending ? "Confirming..." : "Set Allowance"}
            </button>

            {error && <p>{error.message}</p>}
        </div>
    )
}

export default SetAllowance;