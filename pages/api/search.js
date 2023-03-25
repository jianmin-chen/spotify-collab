import { getAccessToken } from "@/lib/spotify";

export default async function handler(req, res) {
    try {
        const query = req.query.query;
        if (!query) throw new Error("Invalid query");
        const { access_token: accessToken } = await getAccessToken();
        const json = await fetch(
            `https://api.spotify.com/v1/search?q=${query}&type=track`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ).then(res => res.json());
        const items = json.tracks.items;
        if (!items)
            return res.status(200).json({
                results: []
            });
        return res.status(200).json({
            results: items.map(item => ({
                id: item.id,
                name: item.name,
                artists: item.artists.map(artist => artist.name)
            }))
        });
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
}
