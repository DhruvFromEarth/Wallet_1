import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

export const SolanaWallet = ({mnemonic}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

const addWallet = async () => {
    if (!mnemonic) {
        console.error("Mnemonic is empty");
        return; // Exit if mnemonic is empty
    }
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey]);
};

    return(
        <div>
        <button onClick={addWallet}>
            Add Solana Wallet
        </button>
        {publicKeys.map(p => <div>
            {p.toBase58()}
        </div>)}
    </div>
    )
}



