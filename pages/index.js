import dynamic from "next/dynamic";
import { useResizeDetector } from "react-resize-detector";
import CurrentlyPlaying from "@/components/CurrentlyPlaying";
import Search from "../components/Search";

const Visualizer = dynamic(() => import("components/Visualizer"), {
    ssr: false
});

export default function Home() {
    const { width, height, ref } = useResizeDetector();

    return (
        <>
            <Visualizer />
            <div className="grid grid-cols-12">
                <div className="col-span-3 pl-5 py-5 h-screen max-h-screen">
                    <iframe
                        className="h-full outline-none w-full"
                        style={{
                            borderRadius: "12px",
                            border: "0 !important"
                        }}
                        src="https://open.spotify.com/embed/playlist/5O18mY3VJr5x5EaZX87Wor?utm_source=generator&theme=0"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    />
                </div>
                <div
                    className="px-5 col-span-9 flex flex-col items-center justify-end gap-y-5 py-5 h-screen"
                    ref={ref}>
                    <Search />
                    <CurrentlyPlaying />
                </div>
            </div>
        </>
    );
}
