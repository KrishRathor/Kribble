import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

export const EntryModal: React.FC = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePlayClick = (e: any) => {
    e.preventDefault();

    if (username === "") return;
    localStorage.setItem("username", username);
    const roomId = searchParams.get("roomId");
    console.log(roomId);

    if (!roomId) {
      console.log("came here");
      router.push("/play?roomId=default");
    } else {
      router.push(`/play?roomId=${roomId}`);
    }
  };

  return (
    <div className="mt-[15vh] h-[40vh] w-[30vw] bg-[#123595] text-white ">
      <form>
        <div className="flex">
          <input
            placeholder="Enter your name"
            className="mx-auto mt-4 h-[5vh] w-4/5 rounded-sm text-black"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="mt-4 flex items-center justify-center ">
          <AvatarSelector />
        </div>
        <div className="mx-auto mt-4 flex flex-col items-center justify-center">
          <button
            type="submit"
            onClick={handlePlayClick}
            className="h-[5vh] w-4/5 bg-[#38C41C] "
          >
            Play!
          </button>
          <button className="mt-2 h-[5vh] w-4/5 bg-[#1671C5] ">
            Create Private Room
          </button>
        </div>
      </form>
    </div>
  );
};

const AvatarSelector: React.FC = () => {
  return <div className="h-[15vh] w-[10vw] border border-black"></div>;
};
