import * as React from 'react';
import * as Style from './style';

interface IGraphIconProps {
  circleFill?: string,
  circleStroke?: string,
  lineStroke?: string,
  size?: number,
}

const GraphIcon: React.SFC<IGraphIconProps> = ({circleFill, circleStroke, lineStroke, size}) => {
  const circleStyle: React.CSSProperties = Style.strokeStyle(circleFill, circleStroke, 1);
  const lineStyle: React.CSSProperties = Style.strokeStyle('none', lineStroke, .5);
  return (<svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} preserveAspectRatio="xMidYMid meet">
  <g id="e8_group">
          <circle id="e1_circle" cx="12.3" cy="12.3" style={circleStyle} r="1.85"/>
          <circle id="e3_circle" cx="2.6" cy="10.5" style={circleStyle} r="1.85"/>
          <circle id="e4_circle" cx="22" cy="14" style={circleStyle} r="1.85"/>
          <circle id="e5_circle" cx="14" cy="2.6" style={circleStyle} r="1.85"/>
          <circle id="e2_circle" cx="10.5" cy="22" style={circleStyle} r="1.85"/>
          <line id="e3_line" x1="2.6" y1="10.5" x2="22" y2="14" style={lineStyle}/>
          <line id="e5_line" x1="14" y1="2.6" x2="10.5" y2="22" style={lineStyle}/>
      </g>
</svg>);
};

export default GraphIcon;