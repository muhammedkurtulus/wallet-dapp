import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { Messages } from "primereact/messages";
import {accountMessage} from "../myfiles/msg";
import {chainMessage} from "../myfiles/msg";
import {balanceMessage} from "../myfiles/msg";

declare var window: any;

export default function Home() {

  const Metamask = () => {
    return (
      <p>
        <a href="https://metamask.io/">
          It apprears that Metamask is not installed, <br />
          Download Metamask to continue.
        </a>
      </p>
    );
  };

  const signMessage = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      signer.signMessage("Hello World").then((result) => {
        console.log(result);
      });
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  const sendTransaction = async () => {
    
    // await ethereum
    //   .request({
    //     method: "eth_sendTransaction",
    //     params: [
    //       {
    //         from: accounts[0],
    //         to: "0x0467e55E2e0baa38BbDDccf39799f6c3E1d1A9a2",
    //         gas: "0x76c0", // 30400 -> *10^(-8)
    //         gasPrice: "0x2540be400",
    //         value: "0x46fab15a3f4e",
    //         data: "0x0", //smart contract
    //       },
    //     ],
    //   })

    //  const provider=ethers.getDefaultProvider('goerli');
    //  const balance = await provider.getBalance('0x445935FeD8Cb41749D5e8176e60c9D2484FABF01');
    //  console.log(ethers.utils.formatEther(balance));

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: "0x0467e55E2e0baa38BbDDccf39799f6c3E1d1A9a2",
      value: ethers.utils.parseEther("0.0001"),
    }).catch(err => messenger?.show(balanceMessage));

    // const txresult = await tx.wait();
    // console.log(txresult);
  };

  const connectWeb3 = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setclient({
        isConnected: true,
        // address: accounts[0],
      });
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  const [haveMetamask, sethaveMetamask] = useState(true);

  const [client, setclient] = useState({
    isConnected: false,
  });

  const [balance, setBalanceValue] = useState("");

  const [account, setAccount] = useState("");

  const checkConnection = async () => {
    const { ethereum } = window;
    if (ethereum) {
      sethaveMetamask(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setclient({
          isConnected: true,
        });

        const balanceHEX = await ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        });

        // const balance = (parseInt(balanceHEX, 16) * 10e-19).toFixed(4); //10(-18)
        const balance = ethers.utils.formatEther(balanceHEX);
        setBalanceValue(Number(balance).toFixed(4));
      } else {
        setclient({
          isConnected: false,
        });
      }
    } else {
      sethaveMetamask(false);
      console.log("connection lost");
    }
  };

  const msgs1 = useRef<Messages>(null);
  const messenger = msgs1?.current;

  useEffect(() => {
    checkConnection();

    const { ethereum } = window;
    if (ethereum) {
      window.ethereum.on("accountsChanged", function (accounts: any) {
        messenger
          ? messenger.show(accountMessage)
          : console.log(accountMessage);
      });

      window.ethereum.on("chainChanged", function (chainId: any) {
        // window.location.reload();

        messenger ? messenger.show(chainMessage) : console.log(chainMessage);
      });
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>blockchain-web3</title>
        <meta name="description" content="" />
        <link rel="icon" href="/ico16.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to dApp</h1>

        <div className="card">
          <Messages ref={msgs1} />
        </div>

        <div className={styles.grid}>
          <a className={styles.card}>
            <p>
              {!haveMetamask ? (
                <Metamask />
              ) : client.isConnected ? (
                <>
                  <br />
                  <h2>You're connected ✅</h2>
                  <br />
                  Account:  {account}
                  <br />
                  Wallet balance: {balance}
                  <br />
                  <button
                    onClick={signMessage}
                    type="button"
                    className="btn sign-btn"
                  >
                    Sign Message
                  </button>
                  <button
                    onClick={sendTransaction}
                    type="button"
                    className="btn sign-btn"
                  >
                    Send Transaction
                  </button>
                </>
              ) : (
                <>
                  <br />
                  <button className="btn connect-btn" onClick={connectWeb3}>
                    Connect Wallet
                  </button>
                </>
              )}
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
