"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SVGProps } from "react";

const x = 1;
const t = (v: number) => x * v;

const checkIconTransition = {
  ease: "easeOut",
  type: "tween",
  delay: t(0.2),
  duration: t(0.3),
};
const checkIconVariants = {
  complete: {
    pathLength: [0, 1],
  },
};

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <motion.path
        variants={checkIconVariants}
        transition={checkIconTransition}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

const backgroundTransition = { duration: t(0.2) };
const backgroundVariants = {
  inactive: {
    background: "var(--white)",
    borderColor: "var(--slate-200)",
    color: "var(--slate-400)",
  },
  active: {
    background: "var(--white)",
    borderColor: "var(--orange-500)",
    color: "var(--orange-500)",
  },
  complete: {
    background: "var(--orange-500)",
    borderColor: "var(--orange-500)",
  },
};

const rippleTransition = {
  duration: t(0.6),
  delay: t(0.2),
  type: "tween",
  ease: "circOut",
};

const rippleVariants = {
  inactive: {
    background: "var(--orange-200)",
  },
  active: {
    background: "var(--orange-200)",
    scale: 1,
    transition: {
      duration: t(0.3),
      type: "tween",
      ease: "circOut",
    },
  },
  complete: {
    background: "var(--orange-200)",
    scale: 1.25,
  },
};

export const Step = ({ step, currentStep }: any) => {
  const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  return (
    <motion.div animate={status} initial={status} className="relative">
      <motion.div
        transition={rippleTransition}
        variants={rippleVariants}
        className="absolute inset-0 rounded-full"
      />

      <motion.div
        variants={backgroundVariants}
        transition={backgroundTransition}
        className="relative flex items-center justify-center w-10 h-10 font-semibold bg-white border-2 rounded-full border-slate-400 text-slate-500"
      >
        <div className="relative flex items-center justify-center">
          <AnimatePresence>
            {status === "complete" ? (
              <CheckIcon className="w-6 h-6 text-white" />
            ) : (
              <span key="step" className="absolute">
                {step}
              </span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// export const Steps = () => {
//   const [step, setStep] = useState(1);

//   return (
//     <>
//       <div className="flex justify-between p-8 rounded">
//         <Step step={1} currentStep={step} />
//         <Step step={2} currentStep={step} />
//       </div>
//       <div className="px-8 pb-8">
//         {step === 1 && <>tere</>}
//         {step === 2 && <>hehe</>}

//         <div className="flex justify-between mt-10">
//           <button
//             onClick={() => setStep(step < 2 ? step : step - 1)}
//             className="px-2 py-1 rounded text-slate-400 hover:text-slate-700"
//           >
//             Back
//           </button>
//           <button
//             onClick={() => setStep(step > 1 ? step : step + 1)}
//             className={cn(
//               step > 1
//                 ? "hidden"
//                 : "flex items-center justify-center rounded-full bg-orange-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-orange-600 active:bg-orange-700",
//             )}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
