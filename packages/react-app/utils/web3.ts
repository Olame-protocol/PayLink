import { BrowserProvider, Interface, InterfaceAbi, JsonRpcProvider, ethers } from "ethers";

//process.env.NODE_ENV === "production" ? "https://celo-mainnet.infura.io" :
const RPC = "https://alfajores-forno.celo-testnet.org";

export default class Web3 {
  public provider: JsonRpcProvider | BrowserProvider;
  constructor() {
    this.provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : new ethers.JsonRpcProvider(RPC);
  }

  async contract(contractAddress: `0x${string}`, ABI: Interface | InterfaceAbi, connectedWalletAddress: `0x${string}`) {
    const signer = await this.provider.getSigner(connectedWalletAddress ?? undefined);
    return new ethers.Contract(contractAddress, ABI, signer);
  }
}
