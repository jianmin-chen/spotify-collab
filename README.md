**This only supports one playlist at once, defined in `.env`!**

## About

Created for [Horizon](https://horizon.hackclub.com). Unnecessarily ~~complicated~~ hacky, but so cool. Basically, the web interface at [horizonmusic.vercel.app](https://horizonmusic.vercel.app) allows everyone to add music to a Spotify playlist without having to log in (especially if they don't have an account) + automatically filters out explicit songs in the search so nobody adds explicit songs. Waveform with `p5.js` and `Tone.js` record surround sound (coming from speakers and other close noise) and transform it into a cool waveform, while a set of LED lights (Neopixels) flash along to the music, utilizing an Adafruit Feather Huzzah to wirelessly communicate with a computer (computer mic -> computer -> computer processing -> send FPS to Adafruit -> flash Neopixels!) through the amazing [`audio-reactive-led-strip`](https://github.com/scottlawsonbc/audio-reactive-led-strip) library.

## Getting set up

*Note: Some of these instructions are for Mac, so make sure _you follow _the _appropriate__ instructions for_ those.*

1. Set up the led strip using [`audio-reactive-led-strip`](https://github.com/scottlawsonbc/audio-reactive-led-strip).
    * Make sure you follow the Adafruit Huzzah instructions [here](https://learn.adafruit.com/adafruit-feather-huzzah-esp8266/using-arduino-ide) to get it working with Arduino IDE!
    * Make sure you have adequate power to power the Neopixels. Probably use a relay to the power supply.
    * I had to replace line 260 in `/python/visualization.py` with ``. If you don't want to do this, a copy of the repo is already in this repo.
    * Serial Monitor in Arduino IDE is very useful for making sure data is actually transmitted.
    * Place speaker next to the computer (and have a working set of Neopixels haha) for this to work beautifully
    * Once you get this setup, the Adafruit Huzzah and the rest of the circuit do not need to be connected to the computer! 
2. Grab the appropriate Spotify client id/secret and refresh token by following this [article](https://leerob.io/blog/spotify-api-nextjs). Make sure to select all the scopes needed for this to actually run! These scopes will be (just copy and paste this) `user-read-playback-state%20playlist-read-private%20playlist-read-collaborative%20user-read-currently-playing%20user-read-playback-position%20playlist-modify-private%20playlist-modify-public`
3. Git clone this repo and run `npm i`.
4. Add an `.env` file to the clone:
```
SPOTIFY_CLIENT_ID=<id>
SPOTIFY_CLIENT_SECRET=<secret>
SPOTIFY_REFRESH_TOKEN=<token>
SPOTIFY_PLAYLIST_ID=<playlist>
```
    * To get the playlist id, just copy the link for the playlist. The playlist id will be the last part of the route (i.e. `https://open.spotify.com/playlist/13M4FKrzemk1gN0tLaT7u5?si=f6a0ee5c1544436f`, `13M4FKrzemk1gN0tLaT7u5` is the playlist id)
5. `npm run dev`, open up the given port, and the web interface should work!

## Drawbacks

I had an original version of this, but I accidentally `rm -rf` that. (Yes, I know.) So I rebuilt the web interface the day before and during the hackathon, and one apparent bug stood out: **there are no blocking requests**. And since Spotify adds songs in a queue/threads, the user might not receive feedback (i.e., "Added to playlist!") right away, which means they might press the add button for a song multiple times. And you know what that means? You get to manually remove multiple instances of the same song! Woo! No, I'm just joking. I'll probably never get around to it, but it's definitely on the to-fix list.

