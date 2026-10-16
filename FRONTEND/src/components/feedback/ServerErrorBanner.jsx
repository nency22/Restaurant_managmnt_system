import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiWifiOff } from "react-icons/fi";

const ServerErrorBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showBanner = () => setVisible(true);
    const hideBanner = () => setVisible(false);
    window.addEventListener("api:server-down", showBanner);
    window.addEventListener("api:server-up", hideBanner);
    return () => {
      window.removeEventListener("api:server-down", showBanner);
      window.removeEventListener("api:server-up", hideBanner);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="alert"
          className="fixed inset-x-0 top-0 z-[200] flex items-center justify-center gap-3 bg-[#2C2523] px-4 py-3 text-center text-sm text-[#FAF7F2]"
        >
          <FiWifiOff className="shrink-0 text-[#C5A059]" />
          <span>Unable to connect to kitchen servers. Please try again shortly.</span>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss"
            className="ml-2 text-[#FAF7F2]/60 hover:text-[#FAF7F2]"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServerErrorBanner;
