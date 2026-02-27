import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Apakah kamu yakin?",
  message = "Tindakan ini tidak bisa dibatalkan.",
  confirmText = "Ya, saya lanjutkan",
  cancelText = "Batal",
  type = "danger", // "primary" atau "danger"
}) {
  const colors = {
    primary: {
      bg: "bg-blue-500",
      hover: "hover:bg-blue-600",
    },
    danger: {
      bg: "bg-red-500",
      hover: "hover:bg-red-600",
    },
    success: {
      bg: "bg-green-500",
      hover: "hover:bg-green-600",
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white w-[360px] rounded-2xl shadow-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

              <p className="text-sm text-gray-500 mt-2">{message}</p>

              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                >
                  {cancelText}
                </button>

                <button
                  onClick={onConfirm}
                  className={`px-4 py-2 rounded-lg text-white transition ${colors[type].bg} ${colors[type].hover}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
