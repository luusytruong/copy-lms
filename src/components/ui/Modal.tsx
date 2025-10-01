import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Modal = ({
  isShow,
  close,
  children,
}: {
  isShow: boolean;
  close?: () => void;
  children: ReactNode;
}) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-51 flex items-center justify-center bg-[#00000099]"
        >
          <motion.div
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            transition={{ duration: 0.32 }}
            className="bg-white p-6 flex flex-col rounded-xl"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
