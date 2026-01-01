import { useEventBus } from "@/EventBus";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UserAvatar from "./UserAvatar";

export default function NewMessageNotification() {
    const [toasts, setToasts] = useState([]);
    const { on, off } = useEventBus();

    useEffect(() => {
        const handler = ({ message, user, group_id }) => {
            const uuid = uuidv4();

            setToasts((prev) => [
                ...prev,
                { message, uuid, user, group_id },
            ]);

            setTimeout(() => {
                setToasts((prev) =>
                    prev.filter((toast) => toast.uuid !== uuid)
                );
            }, 7000);
        };

        on("newMessageNotification", handler);
        return () => off("newMessageNotification", handler);
    }, [on, off]);

    return (
        /* 🔥 WIDTH MUST BE HERE */
        <div className="toast toast-top toast-center max-w-[420px] w-full">
            {toasts.map((toast) => (
                <div
                    key={toast.uuid}
                    className="alert alert-success py-3 px-4 text-gray-100 rounded-md"
                >
                    <Link
                        href={
                            toast.group_id
                                ? route("chat.group", toast.group_id)
                                : route("chat.user", toast.user.id)
                        }
                        className="flex items-center gap-2 w-full overflow-hidden"
                    >
                        <UserAvatar user={toast.user} />

                        {/* ✅ REAL truncation */}
                        <span className="truncate flex-1">
                            {toast.message}
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    );
}
