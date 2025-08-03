import { AnimatePresence, motion } from "framer-motion";
interface LoadingProps {
  isShow?: boolean;
  text?: string;
}
const Loading = ({ isShow = false, text = "Loading" }: LoadingProps) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex flex-col justify-center items-center z-[100] bg-white/70"
        >
          <div className="flex flex-col gap-4 bg-white w-60 px-6 py-4 rounded-lg border border-gray-200">
            <div className="text-center text-sm animate-pulse">{text}</div>
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full w-1/2 bg-[#0081ff]"
                initial={{ x: -50 }}
                animate={{ x: 150 }}
                transition={{
                  duration: 1,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
