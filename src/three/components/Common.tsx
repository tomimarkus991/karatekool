import { PerspectiveCamera } from "@react-three/drei";
import dynamic from "next/dynamic";
import { Suspense } from "react";

interface Props {
  color?: string;
}

/**
 * Adds lights, background and camera to the scene.
 */
export const Common = ({ color }: Props) => (
  <Suspense fallback={null}>
    <ambientLight intensity={0.5} />
    <pointLight position={[20, 30, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} color="blue" />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
);

export const DynamicCommon = dynamic(() => import("./Common").then(item => item.Common), {
  ssr: false,
});
