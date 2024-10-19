import { intervalTimeState } from "@/atoms/intervalTimeState";
import { useSocket } from "@/context/SocketProvider";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export const Participants: React.FC = () => {
  const { users, currentPlayer } = useSocket();

  const participantColors = [
    "#FF5733", // bright red-orange
    "#33FF57", // neon green
    "#3375FF", // bright blue
    "#FF33A1", // vibrant pink
    "#FFFF33", // bright yellow
    "#33FFF5", // electric cyan
    "#FF33F5", // hot magenta
    "#FF8633", // bright tangerine
    "#A833FF", // vivid purple
    "#33FF86", // bright mint
  ];

  const participantBackgroundColors = [
    "#FFE6E1", // light red-orange background for bright red-orange text
    "#E1FFE6", // light green background for neon green text
    "#E1F0FF", // light blue background for bright blue text
    "#FFE1F4", // light pink background for vibrant pink text
    "#FFFFE1", // light yellow background for bright yellow text
    "#E1FFFF", // light cyan background for electric cyan text
    "#FFE1FF", // light magenta background for hot magenta text
    "#FFEDE1", // light tangerine background for bright tangerine text
    "#EDE1FF", // light purple background for vivid purple text
    "#E1FFF0", // light mint background for bright mint text
  ];

  return (
    <div className="h-[65vh] w-[12vw] bg-white">
      {users.map((user, id) => (
        <div
          key={id}
          style={{
            background:
              participantBackgroundColors[
                id % participantBackgroundColors.length
              ],
          }}
          className="py-3 text-center text-xl"
        >
          <p
            style={{ color: participantColors[id % participantColors.length] }}
          >
            {user.token } { user.token === currentPlayer && "Your Turn!" }
          </p>
        </div>
      ))}
    </div>
  );
};
