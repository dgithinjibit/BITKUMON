
import React from 'react';

export default function ConfidenceScore({ score }) {
  const sqSize = 120;
  const strokeWidth = 10;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * score) / 100;

  const scoreColorClass = score < 40 ? 'text-security-low' : score < 75 ? 'text-security-medium' : 'text-security-high';

  return (
    <div className="relative flex flex-col items-center">
      <svg width={sqSize} height={sqSize} viewBox={viewBox}>
        <circle
          className="fill-none stroke-gray-200"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className={`fill-none ${scoreColorClass.replace('text-', 'stroke-')} transition-all duration-300`}
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            strokeLinecap: 'round',
          }}
        />
        <text
          className={`text-3xl font-bold ${scoreColorClass}`}
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
        >
          {`${score}%`}
        </text>
      </svg>
      <p className="text-sm font-semibold mt-2 text-gray-700">Security Confidence Score</p>
    </div>
  );
}
