import ConnectWalletButton from './components/connectWalletButton.jsx'
import ContractBalance from './components/contractBalance.jsx'
import Allowance from './components/allowance.jsx'
import './App.css'

function App() {

  return (
    <>
      <div>
        <ConnectWalletButton/>
        <ContractBalance />
        <Allowance />
      </div>
    </>
  )
}

export default App
