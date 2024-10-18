import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

export const Chat: React.FC = () => {

  const [message, setMessage] = useState<string>("");
  const { sendMessageGeneralRoom, socket } = useSocket();
  const searchParams = useSearchParams();


  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage("");

      const username = localStorage.getItem('username');
      if (!username) return;

      const roomId = searchParams.get('roomId');
      if (!roomId) return;

      sendMessageGeneralRoom(username, message, roomId);
    }
  };

  return (
    <div className="bg-white w-[18vw] h-[65vh] flex flex-col" >

      <div className="flex-grow overflow-y-auto p-2">
        {/* Chat messages will go here */}
      </div>

      <form onSubmit={handleSend} className="flex items-center p-1 bg-blue-500 rounded-lg shadow-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 rounded-l-lg border-2 border-blue-400 focus:outline-none focus:border-blue-300"
        />
        <button
          type="submit"
          className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-2 rounded-lg transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  )
}

