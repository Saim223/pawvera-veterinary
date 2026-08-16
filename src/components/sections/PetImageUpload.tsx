import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, Eye, Bone, Sparkle, AlertTriangle, Camera } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface PreviewFile {
  id: string;
  url: string;
  name: string;
}

const symptomTypes = [
  { icon: Sparkle, label: "Skin conditions" },
  { icon: AlertTriangle, label: "Wounds & swelling" },
  { icon: Eye, label: "Eye problems" },
  { icon: Bone, label: "Other visible symptoms" },
];

export function PetImageUpload() {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = useCallback((list: FileList | null) => {
    if (!list) return;
    const next: PreviewFile[] = Array.from(list)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 6)
      .map((f) => ({ id: `${f.name}-${f.lastModified}-${Math.random()}`, url: URL.createObjectURL(f), name: f.name }));
    setFiles((prev) => [...prev, ...next].slice(0, 6));
  }, []);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((f) => f.id !== id);
    });
  };

  return (
    <section className="py-12 sm:py-16" id="pet-image-upload">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Before the appointment"
            icon={Camera}
            title="Show your veterinarian what you see."
            description="A photo of the paw, the eye, the spot that wasn't there yesterday — upload it beforehand so your vet walks into the consultation already informed."
          />
          <div className="mt-8 grid grid-cols-2 gap-3.5">
            {symptomTypes.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-3 text-sm font-medium text-ink-soft"
              >
                <Icon size={16} className="shrink-0 text-brand-500" />
                {label}
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-sm text-sm italic leading-relaxed text-ink-faint">
            Images help your veterinarian understand your pet's condition before the consultation — they
            support the exam, they don't replace it.
          </p>
        </div>

        <Reveal direction="right">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={
              "notch-card flex min-h-[280px] flex-col items-center justify-center gap-4 border-2 border-dashed bg-surface p-8 text-center transition-colors " +
              (isDragging ? "border-brand-500 bg-brand-50" : "border-line")
            }
          >
            <motion.div
              animate={isDragging ? { scale: 1.08 } : { scale: 1 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-500"
            >
              <UploadCloud size={24} />
            </motion.div>
            <div>
              <p className="font-display text-lg text-brand-700">Drag & drop pet photos</p>
              <p className="mt-1 text-sm text-ink-soft">or</p>
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-md bg-brand-500 px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-brand-600"
            >
              Upload Pet Photos
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />

            {files.length > 0 && (
              <div className="mt-2 grid w-full grid-cols-3 gap-3 sm:grid-cols-4">
                {files.map((f) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-line"
                  >
                    <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(f.id)}
                      aria-label={`Remove ${f.name}`}
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-paper opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X size={11} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
