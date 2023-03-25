import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/ui/useToast";

export default function CurrentlyPlaying() {
    const { toast } = useToast();
    const [song, setSong] = useState(null);
    const count = useRef(0);

    const getSong = () => {
        fetch("/api/current")
            .then(res => res.json())
            .then(json => {
                if (json.current !== "N/A") setSong(json.current);
            })
            .catch(err => {
                toast({
                    variant: "destructive",
                    description: `Error getting current song: ${err.message}`
                });
            });
    };

    useEffect(() => {
        if (song != null) {
            const timer = setTimeout(getSong, song.duration);
            return () => clearTimeout(timer);
        } else if (count.current === 0) {
            getSong();
        } else {
            const timer = setTimeout(getSong, 5000);
            return () => clearTimeout(timer);
        }
    }, [song]);

    return (
        <>
            {song !== null ? (
                <div className="items-center flex gap-x-3 text-white">
                    <div>
                        <img
                            className="-rotate-[5deg] shadow-neutral-800 shadow-sm rounded-[12px] w-[64px] h-[64px]"
                            src={song.image}
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold text-lg">{song.name}</h1>
                        <p>{song.artists.join(", ")}</p>
                    </div>
                </div>
            ) : (
                <div />
            )}
        </>
    );
}
