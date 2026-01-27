const params = new URLSearchParams(location.search);
const artistID = params.get("artist");

const urlAPI = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;

fetch(urlAPI)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Errore nel recupero dei dettagli dell'artista");
        }
    })
    .then((artistData) => {
        console.log(artistData);
        // funzioni per gestire l'artista 
        const artistName = artistData.name;
        const artistPicture = artistData.picture;
        const artistPicture_sm = artistData.picture_small;
        const artistPicture_md = artistData.picture_medium;
        const artistPicture_lg = artistData.picture_big;
        const artistPicture_xl = artistData.picture_xl;
        const artistTracklist = artistData.tracklist; //url da fetchare per le canzoni 
        const numberOfFans = artistData.nb_fan.toLocaleString("it-IT");

    })
    .catch((error) => {
        console.error("Si è verificato un errore:", error);
    });



