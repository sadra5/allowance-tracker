import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ConnectWalletButton from './components/connectWalletButton.jsx'
import WithrawButton from './components/withrawButton.jsx'
import { useAllowance } from './hooks/useAllowance.js'
import './App.css'

function App() {
  const [account, setAccount] = useState('')
  const [contract, setContract] = useState()
  // const [provider, setProvider] = useState()

  const allowance = useAllowance(account, contract, setContract)


  return (
    <>
      <div>
        <ConnectWalletButton/>
        <button onClick={() => setCount((count) => count + 1)}>
          your current allowance is {allowance} ETH
        </button>
        <WithrawButton contract={contract}/>
      </div>
    </>
  )
}

export default App
