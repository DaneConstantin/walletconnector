'use client'
import { useWeb3 } from '../contexts/Web3Context'
import { amoyChainId } from '../utils/polygonAmoy'

export default function WalletConnector() {

    const { address, chainId, connectWallet, disconnectWallet, ensureCorrectNetwork } = useWeb3()

    const handleConnectWallet = async () => {
        await connectWallet()
        await ensureCorrectNetwork()
    }

    const isCorrectNetwork = chainId == amoyChainId;

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    {address ? (
                        <>
                            <div className='px-8'>{address.slice(0, 6)}...{address.slice(-4)}</div>
                            <button onClick={disconnectWallet} className='rounded-xl  bg-gradient-to-b from-red-500 to-red-400 p-3 px-6 text-sm leading-normal text-white shadow-sm hover:border-[#ececec] hover:to-[#ececec]'>
                                Disconnect
                            </button>

                            {!isCorrectNetwork && (
                                <button onClick={ensureCorrectNetwork} className='rounded-xl border border-gray-300 bg-gradient-to-b from-[#ffffff] to-[#ebebeb] p-3 px-6 text-sm leading-normal text-black shadow-sm hover:border-[#ececec] hover:to-[#ececec]'>
                                    Switch to Amoy
                                </button>
                            )}
                        </>
                    ) : (
                        <button onClick={handleConnectWallet} className='rounded-xl border border-[#ffffff1a] border-gray-300 bg-gradient-to-br from-[#ffffff] to-[#e6e6e6] p-3 px-6 text-sm leading-normal text-black shadow-sm hover:border-[#ececec] hover:to-[#ececec]'>Connect Wallet</button>
                    )}
                </div>


            </div>
        </>
    )
}
