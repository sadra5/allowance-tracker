import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "viem/chains";

const hardhatChain = {
  id: 31337,
  name: "Hardhat",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
  },
} 

export const config = getDefaultConfig({
    appName: 'Allowance Tracker',
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    chains: [mainnet, sepolia, hardhatChain],
})