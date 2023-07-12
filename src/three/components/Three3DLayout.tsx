"use client";

import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";

import { r3f } from "../helpers/global";

interface Props {
  children: React.ReactNode;
}

export const Three3DLayout = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null!);

  return (
    <div
      ref={ref}
      // can't use tailwind here
      // style={{
      //   position: "relative",
      //   width: " 100%",
      //   height: "100%",
      //   overflow: "auto",
      //   touchAction: "auto",
      // }}
    >
      {children}
      <Canvas
        // can't use tailwind here
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
        eventSource={ref}
        eventPrefix="client"
      >
        <r3f.Out />
        <Preload all />
      </Canvas>
    </div>
  );
};
