'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="flex justify-center gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                disabled={loading}
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300"
                disabled={loading}
              >
                {loading ? 'Deleting...' : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
