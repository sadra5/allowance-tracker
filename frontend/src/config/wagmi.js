import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia, hardhat } from "viem/chains";

export const config = getDefaultConfig({
    appName: 'Allowance Tracker',
    projectId: '',
    chains: [mainnet, sepolia, hardhat],
})