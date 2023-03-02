import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

interface Props {
  children: React.ReactNode;
  duration?: number;
}

export const ResizablePanel = ({ children, duration = 2 }: Props) => {
  const [ref, bounds] = useMeasure();

  return (
    <motion.div
      id="resizable-div"
      animate={{ height: bounds.height > 0 ? bounds.height : 0, transition: { duration } }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};
