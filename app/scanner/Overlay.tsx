import React, { useState } from "react";
import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";

const innerDimension = 300;

export const Overlay = () => {
  const [layout, setLayout] = useState<{ width: number; height: number } | null>(null);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  if (!layout) {
    return <View style={StyleSheet.absoluteFill} onLayout={onLayout} />;
  }

  const outer = rrect(rect(0, 0, layout.width, layout.height), 0, 0);
  const inner = rrect(
    rect(
      layout.width / 2 - innerDimension / 2,
      layout.height / 2 - innerDimension / 2,
      innerDimension,
      innerDimension
    ),
    50,
    50
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" onLayout={onLayout}>
      <Canvas style={StyleSheet.absoluteFill}>
        <DiffRect inner={inner} outer={outer} color="black" opacity={0.4} />
      </Canvas>
    </View>
  );
};
