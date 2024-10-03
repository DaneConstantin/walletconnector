import WalletConnector from './components/WalletConnector';
import { BrowserProvider } from './contexts/Web3Context'

function App() {
  return (
    <div className="flex flex-col relative min-h-screen justify-center items-center overflow-hidden bg-gray-50">
      <h1 className="text-2xl font-semibold text-center mb-4">Simple Metamask Wallet Connector</h1>
      <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
      

        <BrowserProvider>
          <WalletConnector />
        </BrowserProvider>

      
    </div>
  );
}

export default App;
