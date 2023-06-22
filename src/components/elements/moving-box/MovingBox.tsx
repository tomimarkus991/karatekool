import { Variants, motion } from "framer-motion";

interface TwoElementMovingBoxProps {
  selectedIndex: number;
  duration?: number;
}

export const TwoElementMovingBox = ({
  selectedIndex,
  duration = 0.4,
}: TwoElementMovingBoxProps) => {
  const whiteMovingBox: Variants = {
    active: {
      left: "0%",
      transition: {
        ease: "easeOut",
        duration,
      },
    },
    inactive: {
      left: "50%",
      transition: {
        ease: "easeOut",
        duration,
      },
    },
  };
  return (
    <motion.div
      variants={whiteMovingBox}
      animate={selectedIndex === 0 ? "active" : "inactive"}
      className="bg-white absolute inset-0 w-[50%] rounded-2xl"
    />
  );
};

interface ThreeElementMovingBoxProps {
  selectedIndex: number;
  duration?: number;
}

export const ThreeElementMovingBox = ({
  selectedIndex,
  duration = 0.4,
}: ThreeElementMovingBoxProps) => {
  const whiteMovingBox: Variants = {
    active0: {
      left: "0%",
      transition: {
        ease: "easeOut",
        duration,
      },
    },
    active1: {
      left: "33.33%",
      transition: {
        ease: "easeOut",
        duration,
      },
    },
    active2: {
      left: "66.67%",
      transition: {
        ease: "easeOut",
        duration,
      },
    },
  };
  return (
    <motion.div
      variants={whiteMovingBox}
      animate={selectedIndex === 0 ? "active0" : selectedIndex === 1 ? "active1" : "active2"}
      className="bg-white absolute inset-0 w-[33.33%] rounded-xl"
    />
  );
};
