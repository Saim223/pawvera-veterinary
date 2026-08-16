import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  MessageCircle,
  ImagePlus,
  PhoneOff,
  Send,
  Loader2,
  Phone,
} from "lucide-react";
import { PersonMark } from "@/components/ui/PersonMark";
import { doctors } from "@/data/doctors";

const doctor = doctors[0];

type CallState = "idle" | "connecting" | "live" | "ended";

interface ChatMessage {
  id: number;
  from: "owner" | "doctor";
  text: string;
}

const seedMessages: ChatMessage[] = [
  { id: 1, from: "doctor", text: "Hi! I can see the photo you uploaded — how long has Hazel been licking that paw?" },
  { id: 2, from: "owner", text: "About 3 days now. It looks a bit red and swollen." },
];

const cannedReplies = [
  "Thanks for sharing that. Any changes in her appetite or energy?",
  "Understood. I'd like to take a closer look — can you angle the camera toward her paw?",
  "That's helpful. I'll send a treatment plan to her profile after we finish.",
];

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

interface ConsultationCallCardProps {
  /** When set, the idle "Start a Video Consult" button navigates here instead
   * of triggering the inline demo — used on the homepage embed, where the
   * button should take visitors to the full /consultation page rather than
   * simulate a call in place. */
  startHref?: string;
}

export function ConsultationCallCard({ startHref }: ConsultationCallCardProps = {}) {
  const [callState, setCallState] = useState<CallState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState(seedMessages);
  const [draft, setDraft] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const replyIndex = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (callState !== "live") return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [callState]);

  useEffect(() => {
    if (callState !== "connecting") return;
    const timeout = setTimeout(() => setCallState("live"), 1300);
    return () => clearTimeout(timeout);
  }, [callState]);

  const startCall = () => {
    setCallState("connecting");
    setSeconds(0);
  };

  const endCall = () => {
    setCallState("ended");
  };

  const restart = () => {
    setCallState("idle");
    setSeconds(0);
    setMessages(seedMessages);
    setUploaded(false);
  };

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const ownerMsg: ChatMessage = { id: Date.now(), from: "owner", text: draft.trim() };
    setMessages((prev) => [...prev, ownerMsg]);
    setDraft("");
    window.setTimeout(() => {
      const reply = cannedReplies[replyIndex.current % cannedReplies.length];
      replyIndex.current += 1;
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: "doctor", text: reply }]);
    }, 1000);
  };

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = () => setUploaded(true);

  return (
    <div className="notch-card overflow-hidden border border-line bg-brand-900 text-paper shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <img src={doctor.photo} alt={doctor.name} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-paper">{doctor.name}</p>
            <p className="text-xs text-paper/55">{doctor.specialization}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {callState === "live" && (
            <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tabular-nums text-paper sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400" />
              </span>
              {formatTime(seconds)}
            </span>
          )}
          <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-100">
            {callState === "live" ? "Online" : callState === "connecting" ? "Connecting…" : "Offline"}
          </span>
        </div>
      </div>

      <div className="relative grid gap-0 sm:grid-cols-[1fr_260px]">
        <div className="relative flex min-h-[280px] items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(63,122,95,0.35),rgba(13,25,19,0.95))] sm:min-h-[340px]">
          <AnimatePresence mode="wait">
            {callState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 px-6 text-center"
              >
                <img src={doctor.photo} alt={doctor.name} className="h-[84px] w-[84px] rounded-full object-cover" />
                <p className="max-w-xs text-sm text-paper/70">Ready to talk about Hazel's paw irritation.</p>
                {startHref ? (
                  <Link
                    to={startHref}
                    className="mt-2 inline-flex items-center gap-2 rounded-md bg-accent-500 px-5 py-3 text-sm font-bold text-brand-700 transition-colors hover:bg-accent-600 hover:text-paper"
                  >
                    <Phone size={16} />
                    Start a Video Consult
                  </Link>
                ) : (
                  <button
                    onClick={startCall}
                    className="mt-2 inline-flex items-center gap-2 rounded-md bg-accent-500 px-5 py-3 text-sm font-bold text-brand-700 transition-colors hover:bg-accent-600 hover:text-paper"
                  >
                    <Phone size={16} />
                    Start a Video Consult
                  </button>
                )}
              </motion.div>
            )}

            {callState === "connecting" && (
              <motion.div
                key="connecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 text-paper/80"
              >
                <Loader2 size={26} className="animate-spin text-gold-400" />
                <p className="text-sm">Connecting you with {doctor.name}…</p>
              </motion.div>
            )}

            {callState === "live" && (
              <motion.div
                key="live"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex h-full w-full items-center justify-center"
              >
                {camOn ? (
                  <img src={doctor.photo} alt={doctor.name} className="h-[130px] w-[130px] rounded-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-paper/50">
                    <VideoOff size={28} />
                    <span className="text-xs">Doctor camera is off</span>
                  </div>
                )}

                <div className="glass-dark absolute bottom-4 right-4 flex h-20 w-28 items-center justify-center rounded-xl border border-white/20 sm:h-24 sm:w-32">
                  {camOn ? (
                    <PersonMark palette="gold" size={44} />
                  ) : (
                    <VideoOff size={18} className="text-paper/50" />
                  )}
                  <span className="absolute bottom-1 left-1.5 text-[0.6rem] font-semibold text-paper/70">You</span>
                </div>
              </motion.div>
            )}

            {callState === "ended" && (
              <motion.div
                key="ended"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 px-6 text-center"
              >
                <p className="font-display text-lg text-paper">Consultation ended</p>
                <p className="text-sm text-paper/60">{formatTime(seconds)} elapsed</p>
                <button
                  onClick={restart}
                  className="mt-1 rounded-md border border-white/25 px-4 py-2 text-sm font-semibold text-paper hover:bg-white/10"
                >
                  Start another consult
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="glass-dark flex flex-col border-t border-white/10 sm:border-l sm:border-t-0">
          <div className="border-b border-white/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-paper/45">Pet information</p>
            <p className="mt-2 font-display text-base text-paper">Hazel</p>
            <p className="text-xs text-paper/55">Golden Retriever · 4 years</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Itchy paws", "Redness", "3 days"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/8 px-2 py-1 text-[0.65rem] font-medium text-paper/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4">
            <button
              type="button"
              onClick={handleUploadClick}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-2.5 text-xs font-semibold text-paper/75 transition-colors hover:border-gold-400 hover:text-gold-400"
            >
              <ImagePlus size={14} />
              {uploaded ? "Image sent ✓" : "Upload Pet Image"}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.8, 0.28, 1] }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="flex max-h-56 flex-col gap-2.5 overflow-y-auto p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm " +
                    (m.from === "owner"
                      ? "self-end rounded-br-sm bg-brand-500 text-paper"
                      : "self-start rounded-bl-sm border border-white/10 bg-white/10 text-paper/90 backdrop-blur-md")
                  }
                >
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
                aria-label="Chat message"
                className="flex-1 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-sm text-paper backdrop-blur-md placeholder:text-paper/40 outline-none focus:border-white/35"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-paper hover:bg-brand-400"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center gap-3 border-t border-white/10 px-4 py-4">
        <button
          onClick={() => setMicOn((v) => !v)}
          aria-pressed={micOn}
          aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-paper transition-colors hover:bg-white/10"
        >
          {micOn ? <Mic size={17} /> : <MicOff size={17} className="text-red-400" />}
        </button>
        <button
          onClick={() => setCamOn((v) => !v)}
          aria-pressed={camOn}
          aria-label={camOn ? "Turn camera off" : "Turn camera on"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-paper transition-colors hover:bg-white/10"
        >
          {camOn ? <VideoIcon size={17} /> : <VideoOff size={17} className="text-red-400" />}
        </button>
        <button
          onClick={() => setChatOpen((v) => !v)}
          aria-pressed={chatOpen}
          aria-label="Toggle chat"
          className={
            "flex h-11 w-11 items-center justify-center rounded-full border text-paper transition-colors " +
            (chatOpen ? "border-gold-400 bg-gold-400/15" : "border-white/15 hover:bg-white/10")
          }
        >
          <MessageCircle size={17} />
        </button>
        {callState === "live" && (
          <button
            onClick={endCall}
            aria-label="End consultation"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/90 text-paper transition-colors hover:bg-red-500"
          >
            <PhoneOff size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
