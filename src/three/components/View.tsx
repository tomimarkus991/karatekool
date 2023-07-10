"use client";

import { OrbitControls, View as ViewDrei } from "@react-three/drei";
import dynamic from "next/dynamic";
import { forwardRef, useImperativeHandle, useRef } from "react";

import { r3f } from "../helpers/global";

import { Loading3D } from "./Loading3D";

interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  orbit?: boolean;
  children?: React.ReactNode;
}

export const View = forwardRef<HTMLDivElement, ViewProps>(({ children, orbit, ...props }, ref) => {
  const localRef = useRef<HTMLDivElement>(null!);
  useImperativeHandle(ref, () => localRef.current);

  return (
    <>
      <div ref={localRef} {...props} />
      <r3f.In>
        <ViewDrei track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewDrei>
      </r3f.In>
    </>
  );
});

View.displayName = "View";

export const DynamicView = dynamic(() => import("./View").then(item => item.View), {
  ssr: false,
  loading: () => <Loading3D />,
});
