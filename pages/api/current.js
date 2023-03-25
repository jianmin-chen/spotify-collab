import { getAccessToken } from "@/lib/spotify";

export default async function handler(req, res) {
    const { access_token: accessToken } = await getAccessToken();
    try {
        const json = await fetch(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ).then(res => res.json());
        const { item } = json;
        if (!item) return res.status(200).json({ current: "N/A" });
        return res.status(200).json({
            current: {
                duration: item.duration_ms
                    ? item.duration_ms - item.progress_ms
                    : 5000,
                image: item.album.images[0].url,
                artists: item.artists.map(artist => artist.name),
                name: item.name
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ current: "N/A" });
    }
}
