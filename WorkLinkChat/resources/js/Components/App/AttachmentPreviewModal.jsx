import { useEffect, useMemo, useRef, useState } from "react";
import {
    XMarkIcon,
    ArrowDownTrayIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DocumentTextIcon,
    PlayIcon,
    PauseIcon,
} from "@heroicons/react/24/outline";

export default function AttachmentPreviewModal({
    attachments = [],
    index = 0,
    show,
    onClose,
}) {
    const previewable = useMemo(
        () => attachments.filter(a => a?.url),
        [attachments]
    );

    const [currentIndex, setCurrentIndex] = useState(index);
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);

    const current = previewable[currentIndex];

    useEffect(() => {
        setCurrentIndex(index);
        setPlaying(false);
        document.body.style.overflow = show ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [index, show]);

    if (!show || !current) return null;

    const mime = current.mime || "";
    const isImage = mime.startsWith("image/");
    const isVideo = mime.startsWith("video/");
    const isAudio = mime.startsWith("audio/");
    const isPdf = mime === "application/pdf";

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 text-white bg-black/60">
                <span className="truncate text-sm opacity-80">
                    {current.name}
                </span>

                <div className="flex items-center gap-4">
                    <a
                        href={current.url}
                        download
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-sm"
                    >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Download
                    </a>

                    <button onClick={onClose}>
                        <XMarkIcon className="w-7 h-7" />
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-black">
                {isImage && (
                    <img
                        src={current.url}
                        alt={current.name}
                        className="max-h-[calc(100vh-72px)] max-w-[calc(100vw-72px)] object-contain"
                    />
                )}

                {isVideo && (
                    <video
                        src={current.url}
                        controls
                        className="max-h-[calc(100vh-72px)] max-w-[calc(100vw-72px)]"
                    />
                )}

                {/* AUDIO – WhatsApp style */}
                {isAudio && (
                    <div className="bg-emerald-500/15 rounded-xl p-6 w-[420px]">
                        <audio ref={audioRef} src={current.url} />
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleAudio}
                                className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center"
                            >
                                {playing ? (
                                    <PauseIcon className="w-6 h-6 text-white" />
                                ) : (
                                    <PlayIcon className="w-6 h-6 text-white" />
                                )}
                            </button>
                            <div className="flex-1">
                                <div className="h-1.5 bg-white/20 rounded">
                                    <div className="w-1/3 h-full bg-emerald-400 rounded" />
                                </div>
                                <span className="text-xs text-white/70 mt-1 block">
                                    Voice message
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* PDF */}
                {isPdf && (
                    <div className="flex flex-col items-center gap-4 text-white">
                        <DocumentTextIcon className="w-20 h-20 text-red-400" />
                        <div className="text-sm opacity-80">
                            {current.name}
                        </div>
                        <div className="flex gap-4">
                            <a
                                href={current.url}
                                target="_blank"
                                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
                            >
                                Open PDF
                            </a>
                        </div>
                    </div>
                )}

                {/* NAVIGATION */}
                {currentIndex > 0 && (
                    <button
                        onClick={() => setCurrentIndex(i => i - 1)}
                        className="absolute left-4 text-white hover:scale-110 transition"
                    >
                        <ChevronLeftIcon className="w-10 h-10" />
                    </button>
                )}

                {currentIndex < previewable.length - 1 && (
                    <button
                        onClick={() => setCurrentIndex(i => i + 1)}
                        className="absolute right-4 text-white hover:scale-110 transition"
                    >
                        <ChevronRightIcon className="w-10 h-10" />
                    </button>
                )}
            </div>
        </div>
    );
}
