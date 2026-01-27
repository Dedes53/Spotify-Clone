// variabili globali html 
const artistBg = document.getElementById("artistBg");
const artistName = document.getElementById("artistName");
const fanNumber = document.getElementById("artistFan");
const popularList = document.getElementById("popularList");


// variabili fetch
const params = new URLSearchParams(location.search);
const artistID = params.get("artist");

// url per prima chiamata API
const urlAPI = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;

// prima fetch: dettagli artista
fetch(urlAPI)
    .then((res) => {
        if (res.ok) {
        } else {
            throw new Error("Errore nel recupero dei dettagli dell'artista");
        }
    })
    .then((artistData) => {
        // artistData contiene tutte le info dell'artista
        console.log(artistData);

        const artistName = artistData.name;
        const artistPicture = artistData.picture;
        const artistPicture_sm = artistData.picture_small;
        const artistPicture_md = artistData.picture_medium;
        const artistPicture_lg = artistData.picture_big;
        const artistPicture_xl = artistData.picture_xl;
        const nAlbum = artistData.nb_album;
        const nFan = artistData.nb_fan;
        const radio = artistData.radio;


        artistBg.style.backgroundImage = `url(${artistPicture_xl})`;
        artistName.innerText = artistName;

        // seconda fetch: canzoni dell'artista
        // bisogna fare RETURN di questa fetch per passare i dati al .then() successivo
        return fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}/top`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Errore nel recupero delle canzoni");
                }
            })
            .then(tracksData => {
                console.log(tracksData.data); // array delle canzoni

                // CREO UN OGGETTO CHE CONTIENE SIA I DATI ARTISTA CHE LE CANZONI
                // come prima devo ritornarlo per averlo disponibile nel .then() successivo
                return {
                    artist: artistData,    // Tutti i dati dell'artista
                    tracks: tracksData.data // Array di canzoni
                };
            });
    })
    .then((fullData) => {
        // fullData = {
        //   artist: { name: "...", picture_xl: "...", nb_album: 15, ... },
        //   tracks: [ {canzone1}, {canzone2}, ... ]
        // }

        // popolo la lista popularList delle canzoni popolari

        for (let i = 0; i < 5; i++) {
            const track = fullData.tracks[i];
            const trackItem = document.createElement("li");
            trackItem.innerHTML = `
                <span class="track-index">${i + 1}</span>
                <img src="${track.album.cover_small}" alt="${track.title} cover">
                <span>${track.title}</span>
                <span>${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}</span>
            `;

            popularList.appendChild(trackItem);
        }



        console.log("Artista:", fullData.artist);
        console.log("Canzoni:", fullData.tracks);



    })
    .catch((error) => {
        console.error("Si è verificato un errore:", error);
    });