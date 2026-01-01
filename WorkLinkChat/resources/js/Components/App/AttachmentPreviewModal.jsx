import { useEffect, useMemo, useState } from "react";

export default function AttachmentPreviewModal({
    attachments = [],
    index = 0,
    show = false,
    onClose,
}) {
    const previewable = useMemo(
        () => attachments.filter(a => a.url),
        [attachments]
    );

    const [currentIndex, setCurrentIndex] = useState(index);
    const current = previewable[currentIndex];

    useEffect(() => {
        setCurrentIndex(index);
        document.body.style.overflow = show ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [index, show]);

    if (!show || !current) return null;

    const isImage = current.mime?.startsWith("image/");
    const isVideo = current.mime?.startsWith("video/");
    const isPdf = current.mime === "application/pdf";

    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 text-white">
                <span className="truncate">{current.name}</span>

                <div className="flex items-center gap-4">
                    <a
                        href={current.url}
                        download
                        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-sm"
                    >
                        ⬇ Download
                    </a>

                    <button onClick={onClose} className="text-2xl">
                        ✕
                    </button>
                </div>
            </div>

            {/* Preview */}
            <div className="flex-1 flex items-center justify-center relative">
                {isImage && (
                    <img
                        src={current.url}
                        className="max-h-full max-w-full object-contain"
                    />
                )}

                {isVideo && (
                    <video
                        src={current.url}
                        controls
                        className="max-h-full max-w-full"
                    />
                )}

                {isPdf && (
                    <iframe
                        src={current.url}
                        className="w-full h-full"
                    />
                )}

                {/* Navigation */}
                {currentIndex > 0 && (
                    <button
                        onClick={() => setCurrentIndex(i => i - 1)}
                        className="absolute left-4 text-white text-4xl"
                    >
                        ‹
                    </button>
                )}

                {currentIndex < previewable.length - 1 && (
                    <button
                        onClick={() => setCurrentIndex(i => i + 1)}
                        className="absolute right-4 text-white text-4xl"
                    >
                        ›
                    </button>
                )}
            </div>
        </div>
    );
}
