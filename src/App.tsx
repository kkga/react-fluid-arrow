import { useState } from "react";
import { Arrow } from "./Arrow";
import "./styles.css";

export default function App() {
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState({ x: 0, y: 0 });

  function handleMouseMove(ev: React.MouseEvent) {
    setEnd({ x: ev.clientX, y: ev.clientY });
  }

  function handleClick(ev: React.MouseEvent) {
    setStart({ x: ev.clientX, y: ev.clientY });
  }

  const windowSize = { x: window.innerWidth, y: window.innerHeight };

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{ width: windowSize.x, height: windowSize.y }}
    >
      <Arrow
        showControlPoints={true}
        size={windowSize}
        offsetMult={0.35}
        minOffset={100}
        start={start}
        end={end}
      />
    </div>
  );
}
