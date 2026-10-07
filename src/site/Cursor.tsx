"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Custom cursor. Any element with data-cursor="Label" turns it into a labelled bubble. */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState("");
  const [link, setLink] = useState(false);
  const [light, setLight] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const c = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(c?.dataset.cursor ?? "");
      setLink(!c && !!t?.closest("a,button,[role=button]"));
      setLight(!!t?.closest(".contact"));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const big = !!label;
  return (
    <motion.div className="cursor" style={{ x: sx, y: sy }} aria-hidden>
      <motion.div
        className="cursor-dot"
        animate={{ width: big ? 96 : link ? 54 : 12, height: big ? 96 : link ? 54 : 12 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        data-big={big}
        data-light={light}
      >
        {big && <span>{label}</span>}
      </motion.div>
    </motion.div>
  );
}
