import React from "react";
import { Menubar } from "../_components/Menubar";
import { Participants } from "../_components/Participants";
import { Whiteboard } from "../_components/Whiteboard";
import { Chat } from "../_components/Chat";
import { SocketProvider } from "@/context/SocketProvider";

const Play: React.FC = () => {
  return (
    <SocketProvider>
      <div className=" bg-[url('/bg.avif')] h-[100vh] bg-cover bg-center bg-repeat " >
        <div className="flex pt-24 rounded-sm" >
          <Menubar />
        </div>
        <div className="flex justify-center mt-2">
          <div className="ml-2 rounded-sm " > <Participants /> </div>
          <div className="ml-2 rounded-sm" > <Whiteboard /> </div>
          <div className="ml-2 rounded-sm" > <Chat /> </div>
        </div>
      </div>
    </SocketProvider>
  )
}

export default Play;
