import { useState, useEffect } from "react";
import { Search, Plus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/ui/useToast";

export default function SearchComponent() {
    const { toast } = useToast();
    const [showSearch, setShowSearch] = useState(true);
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query.length) {
            fetch(`/api/search?query=${query}`)
                .then(res => res.json())
                .then(json => {
                    setResults(json.results || []);
                })
                .catch(err =>
                    toast({
                        variant: "destructive",
                        description: `Error searching for songs: ${err.message}`
                    })
                );
        }
    }, [query]);

    const addSong = id => {
        fetch(`/api/add?songId=${id}`)
            .then(res => res.json())
            .then(json => {
                toast({
                    description: "Added to playlist!"
                });
            })
            .catch(err =>
                toast({
                    variant: "destructive",
                    description: `Error adding song: ${err.message}`
                })
            );
    };

    /*
        <Command>
            <CommandInput
                placeholder="Search for a song..."
                onValueChange={setQuery}
                value={query}
            />
            <CommandList>
                {loading && (
                    <CommandFrame.Loading className="py-6 text-center text-sm text-white">
                        Loading...
                    </CommandFrame.Loading>
                )}
                <CommandGroup heading="Suggestions">
                    {results.map(song => (
                        <CommandItem key={song.name}>
                            <span>
                                {song.name} &middot;{" "}
                                {song.artists.join(", ")}
                            </span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
     */

    return (
        <>
            {showSearch === true && (
                <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-[#242424]">
                    <div className="bg-[#282828] flex items-center px-4">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-white" />
                        <input
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                            placeholder="Search for a song..."
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                        />
                    </div>
                    <div className="overflow-y-auto overflow-x-hidden">
                        {results.length === 0 ? (
                            <p className="py-6 text-center text-sm text-white">
                                No results found.
                            </p>
                        ) : (
                            <div className="overflow-hidden py-3 px-2 text-white">
                                {results.map(song => (
                                    <button
                                        className="bg-[#242424] block w-full hover:bg-[#282828] rounded-md"
                                        key={song.id}
                                        onClick={() => addSong(song.id)}>
                                        <p className="relative flex cursor-default select-none items-center text-left rounded-md py-1.5 px-2 text-sm font-medium outline-none disabled:opacity-50">
                                            {song.name} &middot;{" "}
                                            {song.artists.join(", ")}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <button
                className="bg-[#303030] fixed top-4 right-4 rounded-full p-1 z-[999] text-neutral-500"
                onClick={() => setShowSearch(!showSearch)}>
                {showSearch === true ? (
                    <ArrowLeft className="w-5 h-5" />
                ) : (
                    <Plus className="w-5 h-5" />
                )}
            </button>
        </>
    );
}
