  import React, { useEffect, useState } from "react";
  import { ethers } from "ethers";

  function Winner() {
    const [recentWinner, setRecentWinner] = useState("");
    const [timeWhenWinnerIsDrawn, setTimeWhenWinnerIsDrawn] = useState(0);

const walletAddress = "0xab9e1101C771518a310dCB210A4e36feE24D122b";
const walletABI = [{"type":"constructor","inputs":[{"name":"pricefeed","type":"address","internalType":"address"},{"name":"vrfcoordinator","type":"address","internalType":"address"},{"name":"gaslane","type":"bytes32","internalType":"bytes32"},{"name":"subsID","type":"uint256","internalType":"uint256"},{"name":"gaslimit","type":"uint32","internalType":"uint32"}],"stateMutability":"nonpayable"},{"type":"function","name":"AddressToName","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"IsParticipant","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"NameToAddress","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"Participants","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"acceptOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"buyEntryTicket","inputs":[{"name":"name","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"checkUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"UpKeepNeeded","type":"bool","internalType":"bool"},{"name":"","type":"bytes","internalType":"bytes"}],"stateMutability":"view"},{"type":"function","name":"entryticket","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract EntryTicket"}],"stateMutability":"view"},{"type":"function","name":"getContractBalance","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getETHUSDPrice","inputs":[{"name":"ETHAmount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getEntryTicketPriceInETH","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getInterval","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"pure"},{"type":"function","name":"getLastTimeStamp","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getLotteryState","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"enum LuckyPotERC20.LotteryState"}],"stateMutability":"view"},{"type":"function","name":"getParticipantsLength","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getUSDETHPrice","inputs":[{"name":"USDAmount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getWinner","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"i_callbackGasLimit","inputs":[],"outputs":[{"name":"","type":"uint32","internalType":"uint32"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"performUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"rawFulfillRandomWords","inputs":[{"name":"requestId","type":"uint256","internalType":"uint256"},{"name":"randomWords","type":"uint256[]","internalType":"uint256[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"s_LastTimeStamp","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_lotterystate","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"enum LuckyPotERC20.LotteryState"}],"stateMutability":"view"},{"type":"function","name":"s_pricefeed","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract AggregatorV3Interface"}],"stateMutability":"view"},{"type":"function","name":"s_vrfCoordinator","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IVRFCoordinatorV2Plus"}],"stateMutability":"view"},{"type":"function","name":"setCoordinator","inputs":[{"name":"_vrfCoordinator","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"to","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"winnerName","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"event","name":"CoordinatorSet","inputs":[{"name":"vrfCoordinator","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Debug","inputs":[{"name":"message","type":"string","indexed":false,"internalType":"string"}],"anonymous":false},{"type":"event","name":"LotteryWinner","inputs":[{"name":"winner","type":"string","indexed":false,"internalType":"string"},{"name":"amountWon","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"OwnershipTransferRequested","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RequestIdGenerated","inputs":[{"name":"requestId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"AnotherLotteryInProgress","inputs":[]},{"type":"error","name":"OnlyCoordinatorCanFulfill","inputs":[{"name":"have","type":"address","internalType":"address"},{"name":"want","type":"address","internalType":"address"}]},{"type":"error","name":"OnlyOwnerOrCoordinator","inputs":[{"name":"have","type":"address","internalType":"address"},{"name":"owner","type":"address","internalType":"address"},{"name":"coordinator","type":"address","internalType":"address"}]},{"type":"error","name":"PayTheExactAmount","inputs":[]},{"type":"error","name":"RepeatedParticipant","inputs":[]},{"type":"error","name":"RequestDenied","inputs":[{"name":"balance","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"RewardTransferFailed","inputs":[{"name":"balanceContract","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"StalePrice","inputs":[]},{"type":"error","name":"UpkeepNeededFalse","inputs":[]},{"type":"error","name":"ZeroAddress","inputs":[]}];

    useEffect(() => {
      const fetchLotteryWinner = async () => {
        try {
          const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/H_BVCva0za8l4qjBADOoD");
          const contract = new ethers.Contract(walletAddress, walletABI, provider);

          const winner = await contract.getWinner();
          setRecentWinner(winner);
          

          const lastTimestamp = await contract.getLastTimeStamp();
          console.log("Last Timestamp (seconds):", lastTimestamp.toString());
          setTimeWhenWinnerIsDrawn(lastTimestamp);
        } catch (error) {
          console.error("Error fetching lottery winner:", error);
        }
      };

      fetchLotteryWinner();
      const intervalId = setInterval(fetchLotteryWinner, 60000);
      return () => clearInterval(intervalId);
    }, []);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-black text-white">
        <div className="relative max-w-2xl w-full p-10 rounded-3xl bg-gradient-to-br from-[#1f1f1f]/60 to-[#111111]/60 border border-yellow-400/20 backdrop-blur-2xl shadow-[0_0_40px_rgba(255,215,0,0.4)]">
          
          <div className="absolute inset-0 rounded-3xl border-2 border-yellow-300 animate-pulse pointer-events-none"></div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-500 drop-shadow-[0_0_30px_gold] text-center mb-6">
            🎉 LuckyPot Winner 🎉
          </h1>

          {recentWinner ? (
            <>
              <p className="text-center text-2xl font-bold text-yellow-300 drop-shadow-[0_0_10px_gold] mb-4">
                {recentWinner} has won the lottery!
              </p>

              <p className="text-center text-lg text-gray-200">
                Drawn at:{" "}
                <span className="text-yellow-400 font-medium">
                  {new Date(timeWhenWinnerIsDrawn * 1000).toLocaleString()}
                </span>
              </p>
            </>
          ) : (
            <p className="text-center text-xl text-gray-400">Loading winner data...</p>
          )}
        </div>
      </div>
    );
  }

  export default Winner;
