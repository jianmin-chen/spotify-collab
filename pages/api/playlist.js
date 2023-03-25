import { getAccessToken } from "@/lib/spotify";

const format = ms => {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export default async function handler(req, res) {
    try {
        const { access_token: accessToken } = await getAccessToken();
        const json = await fetch(
            `https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST_ID}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ).then(res => res.json());
        return res.status(200).json({
            image: json.images[0].url,
            name: json.name,
            items: json.tracks.items.map(({ track: item }) => ({
                name: item.name,
                artists: item.artists.map(artist => artist.name),
                duration: format(Number(item.duration_ms))
            }))
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
    }
}
