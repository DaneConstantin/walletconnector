import WalletConnector from './components/WalletConnector';
import { BrowserProvider } from './contexts/Web3Context'

function App() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <div className="max-w-lg w-full p-6 bg-gray-800 rounded-lg shadow-md text-white">
        <h1 className="text-2xl font-semibold text-center mb-4">Web3 Wallet Connector</h1>
        <BrowserProvider>
          <WalletConnector />
        </BrowserProvider>

      </div>
    </div>
  );
}

export default App;
