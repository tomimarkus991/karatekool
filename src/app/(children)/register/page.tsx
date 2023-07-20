"use client";

import { RegisterForm, ResizablePanel } from "@/components";

export default function Page() {
  return (
    <div className="p-6 bg-white rounded-xl overflow-hidden max-w-[25rem] m-auto">
      <ResizablePanel duration={1}>
        <RegisterForm />
      </ResizablePanel>
    </div>
  );
}
