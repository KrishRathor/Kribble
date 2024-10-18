import React from "react";

export const Menubar: React.FC = () => {
  return (
    <div className="w-3/4 flex justify-between items-center  bg-white h-[6.5vh] mx-auto " >
      <div className="text-3xl flex items-center" >
        <p className="ml-2" >80</p>
        <p className="text-2xl ml-8" >Round 2 of 3</p>
      </div>
      <div className="text-xl" >
        <div>Guess</div>
        <div> _ _ _ _ _ 5</div>
      </div>
      <div className="mr-2" >
        Settings
      </div>
    </div>
  )
}

