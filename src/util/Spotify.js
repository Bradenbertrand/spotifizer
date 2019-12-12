const client_id = "625e66c97196477bb95bcad767c15d24"
const Spotify = {
    getAccessToken() {
        // Get the hash of the url
        const hash = window.location.hash
            .substring(1)
            .split('&')
            .reduce(function (initial, item) {
                if (item) {
                    var parts = item.split('=');
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                }
                return initial;
            }, {});
        window.location.hash = '';

        // Set token
        let _token = hash.access_token;

        const authEndpoint = 'https://accounts.spotify.com/authorize';

        // Replace with your app's client ID, redirect URI and desired scopes
        const clientId = client_id;
        const redirectUri = 'http://localhost:3000/';
        const scopes = [
            'playlist-modify-public',
            'playlist-modify-private'
        ];

        // If there is no token, redirect to Spotify authorization
        if (!_token) {
            window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
        }

        return _token;
    },

    getClientID(accessToken) {
        let clientID = fetch(`https://api.spotify.com/v1/me`, 
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.id
        })
        return clientID
    },

    //Uploads playlist to user account, returns playlist id
    async uploadPlaylist(name, accessToken) {
        let clientID = await this.getClientID(accessToken)
        return fetch(`https://api.spotify.com/v1/users/${clientID}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                name: name
            })
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.id
        })
    },

    async uploadTracks(playlistID, trackURIs, accessToken) {
        let clientID = await this.getClientID(accessToken)
        return fetch(`https://api.spotify.com/v1/users/${clientID}/playlists/${playlistID}/tracks`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uris: trackURIs
        })
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse;
        })
    },

    //Searches spotify, returns array of track info
    search(term, accessToken) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&market=CA&limit=20`, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log("Mapping array:")
            console.log(jsonResponse)
            return (jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    URI: track.uri
                }
            }));
        })
      }
}

export default Spotify
