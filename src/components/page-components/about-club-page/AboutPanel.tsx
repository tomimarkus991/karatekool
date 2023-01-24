import { Tab } from "@headlessui/react";
import { motion, Variants } from "framer-motion";

interface Props {
  children: React.ReactNode;
  id: string;
}
const panelVariants: Variants = {
  hidden: {
    opacity: 0.3,
    y: 0,
  },
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.6,
    },
  },
};

export const AboutPanel = ({ children, id }: Props) => {
  return (
    <Tab.Panel
      as={motion.div}
      initial="hidden"
      animate="active"
      exit="exit"
      variants={panelVariants}
      key={id}
    >
      {children}
    </Tab.Panel>
  );
};
