import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { getContract } from '../contract.jsx'

export function useAllowance(account, contract, setContract) {
  const [allowance, setAllowance] = useState(0)

  useEffect(() => {
      async function fetchAllowance() {
        // const contract = await getContract()
        setContract(await getContract())
        const value = await contract.allowance(account)
        setAllowance(ethers.formatUnits(value, 18))
      }

      fetchAllowance()
  }, [account])

  return allowance
 }