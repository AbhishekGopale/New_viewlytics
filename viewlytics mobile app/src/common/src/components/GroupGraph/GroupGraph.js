import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Line, Rect, Text as SvgText } from "react-native-svg";
import { COLORS } from "../../colors/colors";

const GroupedBarGraph = ({ data, leftValues, bottomValues, barColors }) => {
  const barWidth = 100;
  const barSpacing = 20;
  const graphWidth = (barWidth + barSpacing + 5) * data.length;
  const maxBarValue = Math.max(...data.flat());
  function formatValue(value) {
    if (value >= 100000) {
      return (value / 100000).toFixed(1) + " L";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + " K";
    }
    return value.toString();
  }

  const yScale = (value) => (value / maxBarValue) * 100;

  return (
    <View style={styles.container}>
      <Svg width={graphWidth} height={200}>
        {leftValues.map((value, index) => (
          <React.Fragment key={index}>
            <Line
              x1={0}
              y1={yScale(value)}
              x2={graphWidth}
              y2={yScale(value)}
              stroke="#ccc"
              strokeWidth={0}
            />
            {/* labal */}
            {/* <SvgText
              x={40}
              y={yScale(value)}
              fill="black"
              textAnchor="start"
              fontSize={12}
            >
              {value}
            </SvgText> */}
          </React.Fragment>
        ))}

        {/* Draw vertical axis labels */}
        {bottomValues.map((value, index) => (
          <SvgText
            key={index}
            x={(barWidth + barSpacing) * index + 100}
            y={190}
            fill="black"
            textAnchor="middle"
            fontSize={12}
          >
            {value}
          </SvgText>
        ))}

        {data.map((group, index) => {
          const x = (barWidth + barSpacing) * index;

          return (
            <React.Fragment key={index}>
              {group.map((value, barIndex) => {
                const barHeight = yScale(value) + 1;
                const y = 170 - barHeight;
                const barX = x + (barWidth / group.length) * barIndex + 50;

                return (
                  <React.Fragment key={barIndex}>
                    <Rect
                      x={barX}
                      y={y}
                      width={barWidth / group.length}
                      height={barHeight}
                      fill={barColors[barIndex]}
                    />
                    <SvgText
                      x={barX + barWidth / group.length / 2}
                      y={y - 5}
                      fill="black"
                      textAnchor="middle"
                      fontSize={12}
                    >
                      {formatValue(value)}

                      {/* {(value / 100000).toLocaleString("en-IN")} L */}
                    </SvgText>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    alignItems: "center",
  },
});

export default GroupedBarGraph;
