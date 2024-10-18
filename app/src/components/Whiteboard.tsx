import React, { useRef } from "react";
import CanvasDraw from "react-canvas-draw";

export const Whiteboard: React.FC = () => {

  const canvasRef = useRef(null);

  return (
    <div className="bg-white w-[44vw] h-[65vh]" >
      <CanvasDraw
        ref={canvasRef}
        brushColor="black"
        brushRadius={4}
        style={{ width: '100%', height: '100%' }}
        hideGrid={true}
        disabled={false}
        onChange={e => console.log(e.getSaveData())}
      />
    </div>
  )
}
