"use client";

import { useState } from "react";

import { QuestionForm } from "@/components";

export default function Page() {
  const [requestSuccess, setRequestSuccess] = useState(false);
  return <QuestionForm requestSuccess={requestSuccess} setRequestSuccess={setRequestSuccess} />;
}
