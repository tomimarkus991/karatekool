import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

interface Props {
  children: React.ReactNode;
}

export const ResizablePanel = ({ children }: Props) => {
  const [ref, bounds] = useMeasure();

  return (
    <motion.div animate={{ height: bounds.height > 0 ? bounds.height : 0 }}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};
