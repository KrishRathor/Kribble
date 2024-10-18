import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useSocket } from "../context/SocketProvider";

export const EntryModal: React.FC = () => {

  const [username, setUsername] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams()
  const { joinRoom } = useSocket();

  const handlePlayClick = (e: any) => {
    e.preventDefault();

    if (username === '') return;
    localStorage.setItem('username', username);
    const roomId = searchParams.get('roomId');
    console.log(roomId);

    if (!roomId) {
      console.log('came here');
      joinRoom(username, 'default');
      router.push('/play?roomId=default');
    } else {
      joinRoom(username, roomId);
      router.push(`/play?roomId=${roomId}`);
    }

  }

  return (
    <div className="w-[30vw] h-[40vh] mt-[15vh] bg-[#123595] text-white ">
      <form>
        <div className="flex" >
          <input
            placeholder="Enter your name"
            className="h-[5vh] w-4/5 mx-auto mt-4 rounded-sm text-black"
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="flex items-center justify-center mt-4 " >
          <AvatarSelector />
        </div>
        <div className="flex mx-auto flex-col items-center justify-center mt-4" >
          <button type="submit" onClick={handlePlayClick} className="bg-[#38C41C] w-4/5 h-[5vh] " >
            Play!
          </button>
          <button className="bg-[#1671C5] w-4/5 h-[5vh] mt-2 " >
            Create Private Room
          </button>
        </div>
      </form>
    </div >
  )
}

const AvatarSelector: React.FC = () => {
  return (
    <div className="w-[10vw] h-[15vh] border border-black" >

    </div>
  )
}

