import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

const accordionMaxWidth = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
};

interface Props {
  title: string;
  body: ReactNode;
  iconClassName: string;
  titleClassname?: string;
  maxWidth?: keyof typeof accordionMaxWidth;
}

export const Accordion = ({
  title,
  body,
  iconClassName,
  maxWidth = "2xl",
  titleClassname,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const rotateAmount = 480;
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(
        "w-full rounded-2xl bg-white px-2 py-3 flex flex-col",
        accordionMaxWidth[maxWidth]
      )}
      onClick={() => setIsOpen(prev => !prev)}
    >
      <button
        aria-controls={title}
        aria-expanded={isOpen}
        className={clsx("flex justify-between items-center w-full space-x-4 px-4")}
      >
        <p className={clsx("text-lg sm:text-xl font-medium text-start", titleClassname)}>{title}</p>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "minus" : "plus"}
            initial={{
              rotate: isOpen ? -rotateAmount : rotateAmount,
            }}
            animate={{
              rotate: 0,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circOut",
              },
            }}
            exit={{
              rotate: isOpen ? -rotateAmount : rotateAmount,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circIn",
              },
            }}
          >
            {isOpen ? (
              <HiMinus className={clsx("", iconClassName)} />
            ) : (
              <HiPlus className={clsx("", iconClassName)} />
            )}
          </motion.div>
        </AnimatePresence>
      </button>
      <motion.div
        id={title}
        initial={false}
        animate={
          isOpen
            ? {
                height: "auto",
                opacity: 1,
                display: "block",
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                    delay: 0.15,
                  },
                },
              }
            : {
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                  },
                },
                transitionEnd: {
                  display: "none",
                },
              }
        }
        className={clsx("px-4 overflow-hidden")}
      >
        <div className="pt-4">{body}</div>
      </motion.div>
    </div>
  );
};
