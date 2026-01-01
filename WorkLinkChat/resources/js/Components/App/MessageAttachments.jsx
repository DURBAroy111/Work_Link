import React from "react";

const MessageAttachments = ({ attachments = [], attachmentClick }) => {
    if (!attachments.length) return null;

    return (
        <div className="mt-2 grid grid-cols-2 gap-2 max-w-xs">
            {attachments.map((attachment, index) => {
                const isImage = attachment.mime?.startsWith("image/");
                const isVideo = attachment.mime?.startsWith("video/");

                return (
                    <button
                        key={attachment.id}
                        onClick={() => attachmentClick(attachments, index)}
                        className="relative group rounded-lg overflow-hidden border bg-black/5 hover:bg-black/10"
                    >
                        {isImage && (
                            <img
                                src={attachment.url}
                                alt=""
                                className="w-full h-32 object-cover"
                            />
                        )}

                        {isVideo && (
                            <video
                                src={attachment.url}
                                className="w-full h-32 object-cover"
                                muted
                            />
                        )}

                        {!isImage && !isVideo && (
                            <div className="h-32 flex flex-col items-center justify-center text-sm">
                                <span className="font-medium">
                                    {attachment.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {attachment.size}
                                </span>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
                    </button>
                );
            })}
        </div>
    );
};

export default MessageAttachments;
