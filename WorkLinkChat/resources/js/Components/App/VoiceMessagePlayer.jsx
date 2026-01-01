import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

export default function VoiceMessagePlayer({ src, isSender }) {
    const waveformRef = useRef(null);
    const wsRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        wsRef.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: isSender ? "#93c5fd" : "#6ee7b7",
            progressColor: isSender ? "#2563eb" : "#059669",
            cursorColor: "transparent",
            barWidth: 2,
            barGap: 2,
            height: 32,
            normalize: true,
        });

        wsRef.current.load(src);

        wsRef.current.on("ready", () => {
            setDuration(wsRef.current.getDuration());
        });

        wsRef.current.on("audioprocess", () => {
            setCurrent(wsRef.current.getCurrentTime());
        });

        wsRef.current.on("finish", () => {
            setPlaying(false);
        });

        return () => wsRef.current.destroy();
    }, [src]);

    const toggle = () => {
        wsRef.current.playPause();
        setPlaying(!playing);
    };

    const format = (t) =>
        `${Math.floor(t / 60)}:${Math.floor(t % 60)
            .toString()
            .padStart(2, "0")}`;

    return (
        <div
            className={`flex items-center gap-3 p-3 rounded-xl ${
                isSender ? "bg-sky-500/20" : "bg-emerald-500/20"
            }`}
        >
            <button
                onClick={toggle}
                className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center"
            >
                {playing ? (
                    <PauseIcon className="w-5 h-5 text-white" />
                ) : (
                    <PlayIcon className="w-5 h-5 text-white" />
                )}
            </button>

            <div className="flex-1">
                <div ref={waveformRef} />
                <div className="flex justify-between text-xs text-white/70 mt-1">
                    <span>{format(current)}</span>
                    <span>{format(duration)}</span>
                </div>
            </div>
        </div>
    );
}
