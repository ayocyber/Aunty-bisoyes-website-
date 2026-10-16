"use client";

import { AnimatePresence, motion } from "framer-motion";
import { sessionStore } from "@/lib/portal";
import { useHydrated } from "@/lib/store";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";

export function Portal() {
  const hydrated = useHydrated();
  const member = sessionStore.useStore();

  // Reserve the viewport until client state is known — avoids a login/dashboard flash.
  if (!hydrated) return <div className="min-h-[100svh]" aria-busy="true" />;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={member ? "dash" : "login"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={member ? "" : "pt-20"}
      >
        {member ? <Dashboard member={member} /> : <Login />}
      </motion.div>
    </AnimatePresence>
  );
}
