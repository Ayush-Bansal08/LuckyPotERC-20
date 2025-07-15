import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  
  const coins = Array.from({ length: 20 }).map((_, i) => {
    const left = Math.random() * 100;
    const duration = 5 + Math.random() * 5;
    const size = 24 + Math.random() * 24;

    return (
      <span
        key={i}
        className="absolute top-[-50px] text-yellow-300 drop-shadow-lg coin-fall"
        style={{
          left: `${left}%`,
          animationDuration: `${duration}s`,
          fontSize: `${size}px`,
        }}
      >
        🪙
      </span>
    );
  });

  return (
    <div className="w-full h-screen bg-gradient-to-br from-black via-indigo-900 to-black flex items-center justify-center relative overflow-hidden">
      
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(120vh);
            opacity: 0;
          }
        }
        .coin-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {coins}

      <div className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-0 left-0"></div>
      <div className="absolute w-[400px] h-[400px] bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-1/2 right-0 transform -translate-y-1/2"></div>
      <div className="absolute w-[400px] h-[400px] bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse bottom-0 left-1/2 transform -translate-x-1/2"></div>

      <div className="relative flex flex-col items-center justify-center text-center px-6 md:px-12 py-10 bg-black/50 rounded-2xl backdrop-blur-lg border border-purple-500 shadow-2xl max-w-3xl">
        
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-teal-400 bg-clip-text text-transparent animate-bounce mb-6">
          🎲 LuckyPot Lottery
        </h1>

        <p className="text-base md:text-lg mb-8 text-gray-200 leading-relaxed">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-teal-400 animate-pulse">
            LuckyPotERC20
          </span>{" "}
          is a cutting-edge blockchain lottery built on the Ethereum network, combining{" "}
          <span className="text-pink-400 font-semibold">fairness</span>,{" "}
          <span className="text-yellow-300 font-semibold">transparency</span>, and the power of decentralized technology.
          <br className="hidden md:block" /><br className="hidden md:block" />
          Powered by{" "}
          <span className="text-pink-400 font-bold">Chainlink’s decentralized services</span>, including secure price feeds, verifiable randomness (VRF), and automated smart contract execution, LuckyPotERC20 ensures every step of the lottery is{" "}
          <span className="text-yellow-300 font-bold">tamper-proof</span> and{" "}
          <span className="text-teal-300 font-bold">trustworthy</span>.
          <br className="hidden md:block" /><br className="hidden md:block" />
          Our mission is simple: give everyone a chance to{" "}
          <span className="text-pink-400 font-bold">win big</span> in a trustless environment, with all processes handled by smart contracts and reliable Chainlink oracles.
        </p>

        <NavLink to="/BuyTicket" className="px-8 py-4 rounded-full font-bold text-black bg-gradient-to-r from-yellow-400 via-pink-500 to-teal-400 shadow-xl hover:scale-105 hover:rotate-1 transform transition duration-500 ease-in-out animate-bounce">
          Join the Lottery
        </NavLink>

      </div>
    </div>
  );
};

export default Home;
