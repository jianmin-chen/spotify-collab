import { getAccessToken } from "@/lib/spotify";

export default async function handler(req, res) {
    try {
        const songId = req.query.songId;
        if (!songId) throw new Error("Invalid song");
        const { access_token: accessToken } = await getAccessToken();
        const json = await fetch(
            `https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks?uris=spotify:track:${songId}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ).then(res => res.json());
        console.log(json);
        return res.status(200).json({ results: json });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
    }
}
