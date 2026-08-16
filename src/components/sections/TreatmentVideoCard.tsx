import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function TreatmentVideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="notch-card group relative col-span-full flex h-full min-h-[280px] flex-col justify-end overflow-hidden bg-brand-900 text-paper sm:col-span-3 sm:row-span-2">
      <video
        ref={videoRef}
        src="/videos/treatment-preview.mp4"
        poster="/images/hero/hero-2-1536.jpg"
        muted
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setElapsed(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          setPlaying(false);
          setElapsed(0);
        }}
        className="absolute inset-0 h-full w-full object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,25,19,0.35)_0%,rgba(13,25,19,0.25)_45%,rgba(13,25,19,0.9)_100%)]" />

      <button
        type="button"
        onClick={togglePlay}
        aria-pressed={playing}
        aria-label={playing ? "Pause treatment video preview" : "Play treatment video preview"}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.span
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="glass-dark flex h-16 w-16 items-center justify-center rounded-full border border-white/30 sm:h-20 sm:w-20"
        >
          {playing ? (
            <Pause size={26} className="text-paper" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play size={26} className="ml-1 text-paper" fill="currentColor" strokeWidth={0} />
          )}
        </motion.span>
      </button>

      <div className="relative z-10 flex flex-col gap-3 p-6 sm:p-7">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full rounded-full bg-gold-400"
            animate={{ width: duration ? `${(elapsed / duration) * 100}%` : "0%" }}
            transition={{ duration: 0.2, ease: "linear" }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-paper/60">
          <span className="glass-dark rounded-full border border-white/15 px-2.5 py-1 font-medium">
            Veterinary Treatment · Preview
          </span>
          <span className="glass-dark rounded-full border border-white/15 px-2.5 py-1 tabular-nums">
            {formatTime(elapsed)} / {formatTime(duration)}
          </span>
        </div>
        <p className="font-display text-lg leading-snug text-paper sm:text-xl">
          "Compassionate care, from examination to recovery."
        </p>
      </div>
    </div>
  );
}
