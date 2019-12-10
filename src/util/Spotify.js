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
            'playlist-modify-public'
        ];

        // If there is no token, redirect to Spotify authorization
        if (!_token) {
            window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
        }

        return _token;
    },

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
      },

    uploadPlaylist(playlistName, trackURIs, accessToken) {
        if (playlistName && trackURIs.length) {
            const headers = {
              Authorization: `Bearer ${accessToken}`
            };
            let userID;
            let playlistID;
            return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => { //Fetch users ID
              if (response.ok) { //Check if response is OK
                return response.json(); //Converts to JSON
              }
              throw new Error('Request failed!');
            }, networkError => {
              console.log(networkError.message);
            }).then(jsonResponse => { //Creates playlist
              userID = jsonResponse.id;
              console.log("creating playlist....") 
              return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({name: playlistName})
              }).then(response => {
                if (response.ok) { //Checks if response is OK
                  return response.json();
                }
                throw new Error('Request failed!');
              }, networkError => {
                console.log(networkError.message);
              }).then(jsonResponse => { //Uploads tracks to created playlist
                console.log("Uploading Track")
                playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                  method: 'POST',
                  headers: headers,
                  body: {uris: trackURIs}
                }).then(response => {
                    return response.json();
                }, networkError => {
                  console.log(networkError.message);
                }).then(jsonResponse => jsonResponse);
              });
            });
      
          } else {
            return;
          }
        }
}

export default Spotify
