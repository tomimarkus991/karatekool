import { HTMLMotionProps, motion } from "framer-motion";

import { useIsMobile } from "@/hooks";

interface Props {
  children?: React.ReactNode;
  /**
   * @description Set false if you don't want to use animation on mobile
   * @default true
   */
  child?: boolean;
  animateOnMobile?: boolean;
}

type IProps = Props & HTMLMotionProps<"div">;

export const AnimationWrapper = ({
  children,
  animateOnMobile = true,
  variants,
  child = false,
  ...props
}: IProps) => {
  const { isMobile } = useIsMobile();

  // when user is on mobile and you dont want to animate on mobile
  // return regular div
  if (!animateOnMobile && isMobile) {
    <motion.div variants={{}} {...props}>
      {children}
    </motion.div>;
  }

  return (
    <motion.div
      initial={child ? undefined : "initial"}
      animate={child ? undefined : "animate"}
      exit={child ? undefined : "exit"}
      whileHover={child ? undefined : "whileHover"}
      whileTap={child ? undefined : "whileTap"}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};
