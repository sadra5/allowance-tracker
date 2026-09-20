import ConnectWalletButton from './components/connectWalletButton.jsx'
import ContractBalance from './components/contractBalance.jsx'
import Allowance from './components/allowance.jsx'
import SetAllowance from './components/setAllowance.jsx'
import './App.css'

function App() {

  return (
    <>
      <div>
        <ConnectWalletButton/>
        <ContractBalance />
        <Allowance />
        <SetAllowance />
      </div>
    </>
  )
}

export default App
