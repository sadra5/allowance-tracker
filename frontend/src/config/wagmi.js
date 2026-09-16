import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "viem/chains";

export const config = getDefaultConfig({
    appName: 'Allowance Tracker',
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    chains: [mainnet, sepolia],
})