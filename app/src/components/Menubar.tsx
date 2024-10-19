import { useSocket } from "@/context/SocketProvider";
import React, { useEffect, useState } from "react";

export const Menubar: React.FC = () => {

  const [timeLeft, setTimeLeft] = useState(10);
  const { currentPlayer, currentWord } = useSocket();

  useEffect(() => {
    setTimeLeft(10);
  }, [currentPlayer])

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="w-3/4 flex justify-between items-center  bg-white h-[6.5vh] mx-auto " >
      <div className="text-3xl flex items-center" >
        <p className="ml-2" >{timeLeft}</p>
        <p className="text-2xl ml-8" >Round 2 of 3</p>
      </div>
      <div className="text-xl" >
        <div>Guess</div>
        <div> { currentPlayer === localStorage.getItem('username') ? currentWord : `-----${currentWord.length}` } </div>
      </div>
      <div className="mr-2" >
        Settings
      </div>
    </div>
  )
}

