import { View } from 'react-native';
import { Svg, Line, Circle } from 'react-native-svg';

type GridSvgProps = {
  color?: string;
  strokeWidth?: number;
  gridSize?: number;
  lineSpacing?: number;
  dotsPerGridBox?: number;
};

export const GridSvg = ({
  color = '#000',
  strokeWidth = 0.75,
  gridSize = 100,
  lineSpacing = 17,
  dotsPerGridBox = 6,
}: GridSvgProps) => {
  // Store the distance between dots
  const dotSpacing = lineSpacing / dotsPerGridBox;

  // Generate line positions
  const linePositions = [];
  for (let i = 0; i < gridSize; i += lineSpacing) {
    linePositions.push(i);
  }

  // Generate dot positions
  var xCount = 0;
  var yCount = 0;
  const dotPositions = [];
  for (let x = 0; x < gridSize; x += dotSpacing) {
    for (let y = 0; y < gridSize; y += dotSpacing) {
      if (xCount % dotsPerGridBox !== 0 && yCount % dotsPerGridBox !== 0) {
        dotPositions.push({ x, y });
      }
      yCount++;
    }
    xCount++;
  }

  return (
    <View
      style={{
        height: 250,
        width: 250,
        position: 'absolute',
        top: -30,
        right: -22,
        zIndex: 1,
      }}>
      <Svg viewBox="0 0 100 100" preserveAspectRatio="xMin yMin slice">
        {/* Horizontal Lines */}
        {linePositions.map(pos => (
          <Line
            key={`h-${pos}`}
            x1="1"
            y1={pos}
            x2="99"
            y2={pos}
            strokeWidth={strokeWidth}
            stroke={color}
          />
        ))}

        {/* Vertical Lines */}
        {linePositions.map(pos => (
          <Line
            key={`v-${pos}`}
            x1={pos}
            y1="1"
            x2={pos}
            y2="99"
            strokeWidth={strokeWidth}
            stroke={color}
          />
        ))}

        {/* Dots */}
        {dotPositions.map((dot, index) => (
          <Circle
            key={`dot-${index}`}
            cx={dot.x}
            cy={dot.y}
            r="0.5"
            fill={color}
          />
        ))}
      </Svg>
    </View>
  );
};
