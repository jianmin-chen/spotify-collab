import dynamic from "next/dynamic";
import CurrentlyPlaying from "@/components/CurrentlyPlaying";
import Search from "@/components/Search";
import Playlist from "@/components/Playlist";
import { useToast } from "@/hooks/ui/useToast";
import { useState, useEffect } from "react";

const Visualizer = dynamic(() => import("components/Visualizer"), {
    ssr: false
});

export default function Home() {
    const { toast } = useToast();
    const [playlistImage, setPlaylistImage] = useState(null);
    const [playlistName, setPlaylistName] = useState(null);
    const [playlist, setPlaylist] = useState(null);

    const getPlaylist = () => {
        fetch("/api/playlist")
            .then(res => res.json())
            .then(json => {
                setPlaylistImage(json.image);
                setPlaylistName(json.name);
                setPlaylist(json.items);
            })
            .catch(err =>
                toast({
                    variant: "destructive",
                    description: `Error getting playlist: ${err.message}`
                })
            );
    };

    useEffect(() => {
        getPlaylist();
    }, []);

    return (
        <>
            <Visualizer />
            <div className="grid grid-cols-12">
                <div className="col-span-3 pl-5 py-5 h-screen max-h-screen">
                    <Playlist
                        playlistImage={playlistImage}
                        playlistName={playlistName}
                        playlist={playlist}
                    />
                </div>
                <div className="px-5 col-span-9 flex flex-col items-center justify-end gap-y-5 py-5 h-screen">
                    <Search onAddSong={() => getPlaylist()} />
                    <CurrentlyPlaying />
                </div>
            </div>
        </>
    );
}
