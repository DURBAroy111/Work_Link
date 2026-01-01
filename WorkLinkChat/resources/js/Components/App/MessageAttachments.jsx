import {
    FilmIcon,
    EyeIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";
import VoiceMessagePlayer from "./VoiceMessagePlayer";

export default function MessageAttachments({
    attachments = [],
    AttachmentClick,
}) {
    if (!attachments.length) return null;

    return (
        <div className="mt-2 flex flex-col gap-3 max-w-xs">
            {attachments.map((attachment, index) => {
                const mime = attachment.mime ?? "";
                const name = attachment.name?.toLowerCase() ?? "";

                const isImage =
                    mime.startsWith("image/");

                const isVideo =
                    mime.startsWith("video/");

                const isAudio =
                    mime.startsWith("audio/") ||
                    name.endsWith(".ogg") ||
                    name.endsWith(".mp3") ||
                    name.endsWith(".wav");

                const isPdf =
                    mime === "application/pdf" ||
                    name.endsWith(".pdf");

                // ✅ AUDIO — ALWAYS WaveSurfer
                if (isAudio) {
                    return (
                        <VoiceMessagePlayer
                            key={attachment.id}
                            src={attachment.url}
                            isSender={false}
                        />
                    );
                }

                // ⬇️ Everything else opens modal
                return (
                    <button
                        key={attachment.id}
                        type="button"
                        onClick={() => AttachmentClick(attachments, index)}
                        className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition text-left"
                    >
                        {isImage && (
                            <img
                                src={attachment.url}
                                className="h-32 w-full object-cover"
                            />
                        )}

                        {isVideo && (
                            <div className="h-32 flex items-center justify-center bg-black/40">
                                <FilmIcon className="w-10 h-10 text-white/70" />
                            </div>
                        )}

                        {isPdf && (
                            <div className="h-32 flex items-center gap-3 px-4 bg-red-500/10">
                                <DocumentTextIcon className="w-10 h-10 text-red-400" />
                                <div>
                                    <div className="text-sm font-medium truncate">
                                        {attachment.name}
                                    </div>
                                    <div className="text-xs text-white/50">
                                        PDF document
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <EyeIcon className="w-8 h-8 text-white" />
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
