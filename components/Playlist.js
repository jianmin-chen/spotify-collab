export default function Playlist({ playlistImage, playlistName, playlist }) {
    return (
        <div className="bg-[#282828] rounded-[12px] max-h-full overflow-auto">
            <div className="bg-[#242424] flex flex-col items-center py-3 gap-y-3">
                {playlistImage !== null && (
                    <img
                        className="rounded-[12px] w-[100px] h-[100px]"
                        src={playlistImage}
                    />
                )}
                {playlistName !== null && (
                    <h1 className="font-bold text-white">{playlistName}!</h1>
                )}
            </div>
            <div className="py-5">
                {playlist &&
                    playlist.map((song, idx) => (
                        <div className="flex gap-x-4 text-sm items-center text-[#9f9f9f] px-4 py-2">
                            <p>{idx + 1}</p>
                            <div className="flex-1">
                                <h2 className="text-white">{song.name}</h2>
                                <p>{song.artists.join(", ")}</p>
                            </div>
                            <p>{song.duration}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
