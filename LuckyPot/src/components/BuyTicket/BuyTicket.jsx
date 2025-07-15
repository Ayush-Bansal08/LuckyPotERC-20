import {React,useEffect,useState } from "react"
import { ethers } from "ethers"

function BuyTicket(){
 const [name, setname] = useState("");
 const [ParticipantsLength, setParticipantsLength] = useState(0);
 const [LotteryState, setLotteryState] = useState("unknown");
 const [LotteryPrice, setLotteryPrice] = useState(0);
 const [nextDraw, setNextDraw] = useState(0);
 const [timeLeft, setTimeLeft] = useState("");

const walletAddress = "0xab9e1101C771518a310dCB210A4e36feE24D122b";
const walletABI = [{"type":"constructor","inputs":[{"name":"pricefeed","type":"address","internalType":"address"},{"name":"vrfcoordinator","type":"address","internalType":"address"},{"name":"gaslane","type":"bytes32","internalType":"bytes32"},{"name":"subsID","type":"uint256","internalType":"uint256"},{"name":"gaslimit","type":"uint32","internalType":"uint32"}],"stateMutability":"nonpayable"},{"type":"function","name":"AddressToName","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"IsParticipant","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"NameToAddress","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"Participants","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"acceptOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"buyEntryTicket","inputs":[{"name":"name","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"checkUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"UpKeepNeeded","type":"bool","internalType":"bool"},{"name":"","type":"bytes","internalType":"bytes"}],"stateMutability":"view"},{"type":"function","name":"entryticket","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract EntryTicket"}],"stateMutability":"view"},{"type":"function","name":"getContractBalance","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getETHUSDPrice","inputs":[{"name":"ETHAmount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getEntryTicketPriceInETH","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getInterval","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"pure"},{"type":"function","name":"getLastTimeStamp","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getLotteryState","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"enum LuckyPotERC20.LotteryState"}],"stateMutability":"view"},{"type":"function","name":"getParticipantsLength","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getUSDETHPrice","inputs":[{"name":"USDAmount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getWinner","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"i_callbackGasLimit","inputs":[],"outputs":[{"name":"","type":"uint32","internalType":"uint32"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"performUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"rawFulfillRandomWords","inputs":[{"name":"requestId","type":"uint256","internalType":"uint256"},{"name":"randomWords","type":"uint256[]","internalType":"uint256[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"s_LastTimeStamp","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_lotterystate","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"enum LuckyPotERC20.LotteryState"}],"stateMutability":"view"},{"type":"function","name":"s_pricefeed","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract AggregatorV3Interface"}],"stateMutability":"view"},{"type":"function","name":"s_vrfCoordinator","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IVRFCoordinatorV2Plus"}],"stateMutability":"view"},{"type":"function","name":"setCoordinator","inputs":[{"name":"_vrfCoordinator","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"to","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"winnerName","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"event","name":"CoordinatorSet","inputs":[{"name":"vrfCoordinator","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Debug","inputs":[{"name":"message","type":"string","indexed":false,"internalType":"string"}],"anonymous":false},{"type":"event","name":"LotteryWinner","inputs":[{"name":"winner","type":"string","indexed":false,"internalType":"string"},{"name":"amountWon","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"OwnershipTransferRequested","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RequestIdGenerated","inputs":[{"name":"requestId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"AnotherLotteryInProgress","inputs":[]},{"type":"error","name":"OnlyCoordinatorCanFulfill","inputs":[{"name":"have","type":"address","internalType":"address"},{"name":"want","type":"address","internalType":"address"}]},{"type":"error","name":"OnlyOwnerOrCoordinator","inputs":[{"name":"have","type":"address","internalType":"address"},{"name":"owner","type":"address","internalType":"address"},{"name":"coordinator","type":"address","internalType":"address"}]},{"type":"error","name":"PayTheExactAmount","inputs":[]},{"type":"error","name":"RepeatedParticipant","inputs":[]},{"type":"error","name":"RequestDenied","inputs":[{"name":"balance","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"RewardTransferFailed","inputs":[{"name":"balanceContract","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"StalePrice","inputs":[]},{"type":"error","name":"UpkeepNeededFalse","inputs":[]},{"type":"error","name":"ZeroAddress","inputs":[]}];
  const buyTicket = async()=>{             
        // Logic to buy a ticket
        try{
          if (typeof window.ethereum === "undefined") {
             alert("Please install Metamask!");
           return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum); // setting up provider
        await provider.send("eth_requestAccounts",[]); // requesting the accounts
        const signer = provider.getSigner(); // getting the signer
        const contract = new ethers.Contract(walletAddress, walletABI, signer);
        const contract2 = new ethers.Contract(walletAddress, walletABI, provider);
        const USDValue = 51;
      
        const amountToBeSentETH = await contract2.getUSDETHPrice(USDValue);
        const actualPrice = await contract.getETHUSDPrice(amountToBeSentETH);
        console.log("Actual Price in ETH:", actualPrice.toString());
        console.log("Amount to be sent in ETH:", amountToBeSentETH.toString());
        const transaction = await contract.buyEntryTicket(name, { value: amountToBeSentETH, gasLimit: 500000})
        await transaction.wait(); 
        alert("Congratulations you have entered the LuckyPot Lottery😊");
       
       }
       catch(error){
        alert("The transaction has failed😟");
        console.log(error);
       }
    }
 // i have to use useeffect to show the length of the participant sbcz everytime i refresh the page the frontend is dubm and it forgets and clear all the values it stores to itself so we hav to use useeffect..it just clears the data when we refresh the page
   useEffect(() => {
  const fetchAllData = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/H_BVCva0za8l4qjBADOoD");
      const contract = new ethers.Contract(walletAddress, walletABI, provider);

      //  Get Participants Length
      const length = await contract.getParticipantsLength();
      setParticipantsLength(parseInt(length.toString()));

      //  Get Lottery State
     
      const lotteryState = await contract.getLotteryState();
      console.log(lotteryState);
      if (lotteryState === 0) {
        setLotteryState("Close");
      } else if (lotteryState === 1) {
        setLotteryState("Open");
      }

      //  Get Time Until Next Draw
      const lastTimeStamp = await contract.getLastTimeStamp();
      const interval = await contract.getInterval();
      const nextDraw = Number(lastTimeStamp) + Number(interval);
      setNextDraw(nextDraw);

    } catch (error) {
      console.error("Error fetching data in combined fetch:", error);
    }
  };

  fetchAllData();
  const intervalId = setInterval(fetchAllData, 15000); // every 15s is enough
  return () => clearInterval(intervalId);
}, []);


    useEffect(()=>{
        const fetchLotteryPrice = async()=>{
            try{ 
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract2 = new ethers.Contract(walletAddress, walletABI, provider);
            const USDValue = 51;
            const amountToBeSentETH = await contract2.getUSDETHPrice(USDValue);
            const amountToBeDisplayed = ethers.utils.formatEther(amountToBeSentETH);
            const amount = Number(amountToBeDisplayed).toFixed(4); // rounding to 2 decimal places
            setLotteryPrice(amount); // this would return the price of 51 dollars in ETH
            console.log("Lottery Price in ETH:", amount);
            }
            catch(error){
            console.error("Error fetching lottery price:", error);
            }
        };
        fetchLotteryPrice();
        const intervalId = setInterval(fetchLotteryPrice, 600000); // Update every second
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    },[]);



    useEffect(() => {
    const tick = () => {
       if (!nextDraw || nextDraw === 0) return;
      const now = Math.floor(Date.now() / 1000);
      console.log("Current Time (seconds):", now);
      const diff = nextDraw - now; 
      console.log("Time until next draw (seconds):", diff);
      if (diff <= 0) {
        setTimeLeft("Waiting for Chainlink keeper🎉");
      } else {
        const hours = Math.floor(diff / 3600);
        const mins = Math.floor((diff % 3600) / 60);
        const secs = diff % 60;
        setTimeLeft(`${hours}h ${mins}m ${secs}s`);
      }
    };

    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [nextDraw]);
  

return (
  <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#050505] via-[#111111] to-[#050505] text-white">

    
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute w-[600px] h-[600px] bg-gradient-radial from-[#d6b84a55] to-transparent rounded-full filter blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-gradient-radial from-[#d38b82aa] to-transparent rounded-full filter blur-2xl bottom-20 right-20 animate-ping"></div>
      <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-[#97c47b66] to-transparent rounded-full filter blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
    </div>

    
    <h1 className="absolute top-25 text-center text-4xl md:text-6xl lg:text-7xl font-serif animate-pulse font-extrabold tracking-widest bg-gradient-to-r from-[#fff5c2] via-[#d6b84a] to-[#fff5c2] text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(214,184,74,0.5)]">
      LuckyPot Lottery
    </h1>

    
    <div className="absolute right-4 md:right-0 top-5 z-20 px-4 py-3 md:px-6 md:py-4 rounded-2xl bg-gradient-to-br from-yellow-300/20 via-yellow-100/10 to-transparent border border-yellow-400/30 shadow-[0_0_30px_rgba(214,184,74,0.4)] text-center backdrop-blur-xl max-w-fit animate-bounce">
      <span className="block text-yellow-200 text-sm md:text-base font-serif font-semibold mb-1 drop-shadow-[0_0_10px_gold]">
        Next Draw In
      </span>
      <span className="block text-yellow-50 text-xl md:text-3xl font-bold font-mono tracking-wide drop-shadow-[0_0_20px_gold] animate-pulse">
        {timeLeft}
      </span>
    </div>

    
    <div className="relative z-10 mt-40 md:mt-48 w-full max-w-4xl p-6 md:p-10 rounded-3xl bg-gradient-to-br from-[#1c1c23]/80 to-[#101015]/80 border border-[#d6b84a40] shadow-[0_0_60px_rgba(214,184,74,0.3)] flex flex-col items-center space-y-10 md:space-y-12 backdrop-blur-xl">

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full">

        
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#d6b84a33] via-[#30260e22] to-transparent rounded-2xl p-5 md:p-6 border border-[#d6b84a80] hover:scale-105 transition-transform shadow-[0_0_50px_rgba(214,184,74,0.4)]">
          <span className="text-[#fbe49c] text-lg md:text-xl font-serif mb-2 drop-shadow-[0_0_10px_gold]">
            Participants
          </span>
          <span className="text-4xl md:text-5xl font-extrabold text-[#fff9d0] font-serif drop-shadow-[0_0_15px_gold]">
            {ParticipantsLength}
          </span>
        </div>

        
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#d38b8233] via-[#43181822] to-transparent rounded-2xl p-5 md:p-6 border border-[#d6b84a80] hover:scale-105 transition-transform shadow-[0_0_50px_rgba(214,184,74,0.4)]">
          <span className={`text-[#ffc2b5] text-lg md:text-xl font-serif mb-2 ${
    LotteryState === "Close"
      ? "text-red-400 drop-shadow-[0_0_25px_red]"
      : "text-[#ffe4df] drop-shadow-[0_0_15px_blue]"
  }`}>
            Lottery State
          </span>   
         <span
  className={`text-5xl font-extrabold font-serif drop-shadow-[0_0_10px] ${
    LotteryState === "Close"
      ? "text-red-400 drop-shadow-[0_0_25px_red]"
      : "text-[#ffe4df] drop-shadow-[0_0_15px_blue]"
  }`}
>
            {LotteryState}
          </span>
        </div>

        
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#97c47b33] via-[#18341622] to-transparent rounded-2xl p-5 md:p-6 border border-[#d6b84a80] hover:scale-105 w-full transition-transform shadow-[0_0_50px_rgba(214,184,74,0.4)]">
          <span className="text-[#c8fcb0] text-lg md:text-xl font-serif mb-2 drop-shadow-[0_0_10px_lime]">
            Entry Price
          </span>
          <span className="text-4xl md:text-5xl font-extrabold text-[#e9ffe2] text-center font-serif drop-shadow-[0_0_15px_lime]">
            {LotteryPrice} ETH
          </span>
        </div>

      </div>

      
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 w-full max-w-xl space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="flex-1 py-4 px-6 text-[#d6b84a] text-lg rounded-full bg-[#2a2a33]/50 border border-[#d6b84a70] placeholder-[#d6b84a80] focus:outline-none focus:ring-2 focus:ring-[#d6b84a] transition duration-300 font-serif shadow-[0_0_20px_rgba(214,184,74,0.3)]"
        />
        <button
          onClick={buyTicket}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d6b84a] via-[#bfa031] to-[#d6b84a] text-black text-lg md:text-xl font-bold tracking-wider shadow-[0_0_40px_rgba(214,184,74,0.6)] transform hover:scale-105 animate-pulse hover:shadow-[0_0_60px_rgba(214,184,74,0.8)] transition font-serif"
        >
          Buy Ticket 🪙
        </button>
      </div>
    </div>
  </div>
);




}
export default BuyTicket;
