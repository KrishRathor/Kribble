import { Chat } from "@/components/Chat";
import { Menubar } from "@/components/Menubar";
import { Participants } from "@/components/Participants";
import { Whiteboard } from "@/components/Whiteboard";
import React from "react";

const Play: React.FC = () => {
  return (
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
  )
}

export default Play;


