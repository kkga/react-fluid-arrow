import { FC } from "react";

const curveStyle: React.CSSProperties = {
  strokeWidth: 2,
  stroke: "dodgerblue",
  strokeLinecap: "round",
  fill: "none"
};

const pointStyle: React.CSSProperties = {
  fill: "dodgerblue"
};

const controlPointStyle: React.CSSProperties = {
  fill: "#ccc"
};

const handleStyle: React.CSSProperties = {
  strokeWidth: 1,
  stroke: "#ccc",
  strokeLinecap: "round",
  strokeDasharray: "4,4"
};

type Point = {
  x: number;
  y: number;
};

type ArrowProps = {
  size: { x: number; y: number };
  start: Point;
  end: Point;
  offsetMult: number;
  minOffset: number;
  showControlPoints: boolean;
};

export const Arrow: FC<ArrowProps> = ({
  size,
  start,
  end,
  offsetMult,
  minOffset,
  showControlPoints
}) => {
  // distance between start and end
  const distance = (p1: Point, p2: Point) =>
    Math.hypot(p2.x - p1.x, p2.y - p1.y);

  // calculate horizontal offset for control points
  const calcOffsetX = (start: Point, end: Point) =>
    Math.max(distance(start, end) * offsetMult, minOffset);

  // get positions for bezier curve control points
  const getCp1 = (start: Point, end: Point) => ({
    x: start.x + calcOffsetX(start, end),
    y: start.y
  });
  const getCp2 = (start: Point, end: Point) => ({
    x: end.x + -calcOffsetX(start, end),
    y: end.y
  });

  const cp1 = getCp1(start, end);
  const cp2 = getCp2(start, end);

  return (
    <svg
      style={{
        border: "1px solid",
        width: `${size.x}px`,
        height: `${size.y}px`
      }}
      viewBox={`0 0 ${size.x} ${size.y}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        style={curveStyle}
        d={`M${start.x},${start.y}
          C${cp1.x},${cp1.y} 
          ${cp2.x},${cp2.y} 
          ${end.x},${end.y}`}
      />
      <circle style={pointStyle} cx={start.x} cy={start.y} r="6" />
      <circle style={pointStyle} cx={end.x} cy={end.y} r="6" />

      {showControlPoints && (
        <>
          <line
            style={handleStyle}
            x1={start.x}
            y1={start.y}
            x2={cp1.x}
            y2={cp1.y}
          />
          <line
            style={handleStyle}
            x1={end.x}
            y1={end.y}
            x2={cp2.x}
            y2={cp2.y}
          />
          <circle style={controlPointStyle} cx={cp1.x} cy={cp1.y} r="3" />
          <circle style={controlPointStyle} cx={cp2.x} cy={cp2.y} r="3" />
        </>
      )}
    </svg>
  );
};

export default Arrow;
