import { useState } from 'react'
import { generateMnemonic } from "bip39";
import './App.css'
import { SolanaWallet } from './components/solanawallet';
import { EthWallet } from './components/ethereumwallet';


function App() {
  const [mnemonic, setMnemonic] = useState("");
  
  // useEffect(() => {
  //   if (mnemonic) {
  //     SolanaWallet(mnemonic);
  //     // EthWallet(mnemonic);
  //   }
  // }, [mnemonic]);

  return (
    <main>
      <button onClick={async function () {
        const mn = await generateMnemonic();
        setMnemonic(mn)
      }}>
        Create Seed Phrase
      </button>
      <input type="text" value={mnemonic}></input>
      
      {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
      {mnemonic && <EthWallet mnemonic={mnemonic} />}
      {/* {SolanaWallet(mnemonic)}
      {EthWallet(mnemonic)} */}
    </main>
  )
}

export default App;