import { useSocket } from "@/context/SocketProvider";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const searchParams = useSearchParams();
  const { sendMessage, message: messages } = useSocket();

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = message.trim();
    if (message.trim()) {
      setMessage("");

      const username = localStorage.getItem("username");
      const roomId = searchParams.get("roomId");
      if (!username || !roomId) return;

      sendMessage({
        username,
        room: roomId,
        message: msg,
      });
    }
  };

  return (
    <div className="flex h-[65vh] w-[18vw] flex-col bg-white">
      <div className="flex-grow overflow-y-auto p-2">
        {/* Chat messages will go here */}
        {messages.map((item, id) => {
          if (item.correct) {
            return <div key={id} > 
              <p className="text-green-400" >{ item.username } guessed the word</p>
            </div>;
          } else {
            return (
              <div key={id} className="mx-2 my-2">
                <p>
                  {item.username} : {item.msg}
                </p>
              </div>
            );
          }
        })}
      </div>

      <form
        onSubmit={handleSend}
        className="flex items-center rounded-lg bg-blue-500 p-1 shadow-lg"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow rounded-l-lg border-2 border-blue-400 p-2 focus:border-blue-300 focus:outline-none"
        />
        <button
          type="submit"
          className="ml-2 rounded-lg bg-yellow-400 px-2 py-2 font-bold text-white transition duration-300 hover:bg-yellow-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};
