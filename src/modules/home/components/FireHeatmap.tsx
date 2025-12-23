import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { colorFor, daysBetween, isoDate, startOfWeek } from "./function";
import { FireHeatmapProps } from "./types";
import { Lottie } from "./smallComponents";

export default function FireHeatmap({
  data = [],
  // threshold = 10,
  cellSize = 16,
  gap = 2,
  lottieAnimationData = null,
}: FireHeatmapProps) {
  const map = useMemo(() => {
    const m = new Map<string, number>();
    (data || []).forEach((d) => {
      if (d && d.date) m.set(d.date, d.count || 0);
    });
    return m;
  }, [data]);

  const today = new Date();
  const currentYear = today.getFullYear();
  const yearStartDate = new Date(currentYear, 0, 1);
  const yearEndDate = new Date(currentYear, 11, 31);

  const gridStart = startOfWeek(yearStartDate);
  const totalDays = daysBetween(gridStart, yearEndDate);

  const weeks = Math.ceil((totalDays + 1) / 7);

  const grid: { date: string; count: number }[][] = [];

  for (let w = 0; w < weeks; w++) {
    const col: { date: string; count: number }[] = [];
    for (let dow = 0; dow < 7; dow++) {
      const day = new Date(gridStart);
      day.setDate(gridStart.getDate() + w * 7 + dow);
      const key = isoDate(day);
      const count = map.get(key) || 0;
      col.push({ date: key, count });
    }
    grid.push(col);
  }

  const Fire = ({ size = 18 }: { size?: number }) => {
    if (lottieAnimationData) {
      return (
        <div style={{ width: size, height: size, pointerEvents: "none" }}>
          {/* Lottie is dynamically imported and typed above */}
          <Lottie
            animationData={lottieAnimationData}
            loop
            autoplay
            style={{ width: "65%", height: "65%" }}
          />
        </div>
      );
    }
    // fallback SVG (valid path data restored)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          fill="#ffd08a"
          d="M32 2 C28 12 22 16 22 26 C22 36 28 40 32 52 C36 40 42 36 42 26 C42 16 36 12 32 2 Z"
        />
        <path
          fill="#ff7a00"
          d="M32 10 C29 16 26 18 26 24 C26 30 29 32 32 40 C35 32 38 30 38 24 C38 18 35 16 32 10 Z"
        />
      </svg>
    );
  };

  return (
    <div className="p-4 rounded-lg bg-neutral-900">
      {/* The top of heat map */}
      <div className="flex items-center gap-4 mb-3">
        <h3 className="text-sm text-gray-300">Contributions</h3>
        <div className="text-xs text-gray-400">Days you were on fire:</div>
        <div className="ml-auto text-xs text-gray-400">Less</div>
        <div className="w-4 h-4 bg-[#0f1720] ml-2 rounded-sm" />
        <div className="w-4 h-4 bg-[#064e3b] ml-1 rounded-sm" />
        <div className="w-4 h-4 bg-[#065f46] ml-1 rounded-sm" />
        <div className="w-4 h-4 bg-[#16a34a] ml-1 rounded-sm" />
        <div className="w-4 h-4 bg-[#22c55e] ml-1 rounded-sm flex items-center justify-center">
          <Lottie
            animationData={lottieAnimationData}
            loop
            autoplay
            style={{ width: "110%", height: "110%" }}
          />
        </div>
        <div className="text-xs text-gray-400 ml-2">More</div>
      </div>

      <div
        className="inline-flex"
        style={{ gap: `${gap}px`, alignItems: "flex-start" }}
        role="grid"
        aria-label="contribution heatmap"
      >
        {grid.map((col, ci) => {
          // --- CHANGE #2: LOGIC FOR MONTH GAP ---
          // Check the month of the first day of this week
          const firstDayOfWeek = new Date(col[0].date);

          // Find the first day of the *next* week (if it exists)
          const nextWeek = grid[ci + 1];
          const firstDayOfNextWeek = nextWeek
            ? new Date(nextWeek[0].date)
            : null;

          // Show a gap if:
          // 1. There is a next week
          // 2. The next week's month is different from this week's month
          // 3. The next week is *still in the current year* (no gap for Dec -> Jan)
          const showMonthGap =
            firstDayOfNextWeek &&
            firstDayOfWeek.getMonth() !== firstDayOfNextWeek.getMonth() &&
            firstDayOfNextWeek.getFullYear() === currentYear;
          // --- END CHANGE #2 ---

          return (
            <div
              key={ci}
              className="inline-flex flex-col"
              role="row"
              style={{
                gap: `${gap}px`,
                // Apply the margin to create the gap
                marginRight: showMonthGap ? `${gap * 2}px` : undefined, // e.g., 8px
              }}
            >
              {col.map((cell) => {
                // --- CHANGE #1: LIMIT TO CURRENT YEAR ---
                const cellDate = new Date(cell.date);
                const isCurrentYear = cellDate.getFullYear() === currentYear;

                // If the cell is not in the current year, render a blank placeholder
                if (!isCurrentYear) {
                  return (
                    <div
                      key={cell.date}
                      className="rounded-sm"
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                      }}
                    />
                  );
                }
                // --- END CHANGE #1 ---

                // If we're here, it's a valid day. Render the full cell.
                const bgClass = colorFor(cell.count);
                const showFire = cell.count >= 2;
                return (
                  <div
                    key={cell.date}
                    role="gridcell"
                    aria-label={`${cell.date}: ${cell.count} submissions`}
                    title={`${cell.date}: ${cell.count} submissions`}
                    className="relative rounded-sm overflow-visible"
                    style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                  >
                    <div
                      className={`${bgClass} rounded-sm`}
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                      }}
                    />
                    {showFire && (
                      <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{
                          scale: [0.98, 1.02, 0.99],
                          rotate: [0, 1.2, -1.2],
                        }}
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
                        style={{ transform: "translateY(-6%)" }}
                      >
                        <div
                          style={{
                            transform: "translateY(14%) translateX(18%)",
                          }}
                        >
                          <Fire size={Math.round(cellSize * 1.6)} />
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
