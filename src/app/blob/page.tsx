"use client";

import { DynamicBlob, DynamicCommon, DynamicView } from "@/three";

export default function Page() {
  return (
    <>
      <div className="flex flex-col flex-wrap items-center w-full mx-auto md:flex-row lg:w-4/5">
        <div className="flex flex-col items-start justify-center w-full p-12 text-center md:w-2/5 md:text-left">
          <p className="w-full uppercase">Next + React Three Fiber</p>
          <h1 className="my-4 text-5xl font-bold leading-tight">Next 3D Starter</h1>
          <p className="mb-8 text-2xl leading-normal">
            A minimalist starter for React, React-three-fiber and Threejs.
          </p>
        </div>
      </div>

      <DynamicView className="flex flex-col items-center justify-center w-full h-96">
        <DynamicBlob />

        <DynamicCommon />
      </DynamicView>
    </>
  );
}
