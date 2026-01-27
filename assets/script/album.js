// getProperStringTime e getProperStringTimeForTrack - funzioni per avere
// una stringa di durata formattata correttamente

const getProperStringTime = (secTime) => {
    let albumLengthString;
    if (secTime >= 3600) {
        const hours = Math.floor(secTime / (60 * 60));
        const min = Math.floor((secTime - hours * 60 * 60) / 60);
        const sec = secTime - hours * 60 * 60 - min * 60;

        if (hours === 1) {
            albumLengthString = `${hours} ora ${min} min ${sec} sec.`;
        } else {
            albumLengthString = `${hours} ore ${min} min ${sec} sec.`;
        }
    } else if (secTime >= 60) {
        const min = Math.floor(secTime / 60);
        const sec = secTime - min * 60;
        albumLengthString = `${min} min ${sec} sec.`;
    } else {
        albumLengthString = `${secTime} sec.`;
    }
    return albumLengthString;
};

const getProperStringTimeForTrack = (secTime) => {
    let trackLengthString;
    if (secTime >= 3600) {
        const hours = Math.floor(secTime / (60 * 60));
        const min = Math.floor((secTime - hours * 60 * 60) / 60);
        const sec = secTime - hours * 60 * 60 - min * 60;
        trackLengthString = `${hours}:${min}:${sec}`;
    } else if (secTime >= 60) {
        const min = Math.floor(secTime / 60);
        const sec = secTime - min * 60;
        trackLengthString = `${min}:${sec}`;
    } else {
        trackLengthString = `0:${secTime}`;
    }
    return trackLengthString;
};

// fine funzioni getProperStringTime e getProperStringTimeForTrack

// getImageColor - funzione per approssimare il colore medio di un'immagine e attribuirlo ad un elemento
// del DOM una volta che l'immagine è caricata. Prende due parametri: l'url dell'immagine e la stringa che si
// utilizzerebbe nel css per individuare l'elemento da modificare. NB: 'load' è un evento asincrono.

const getImageColor = (imageUrl, stringForQuerySelector = "body") => {
    // creo un'immagine senza appenderla al DOM
    const utilityImage = new Image();
    utilityImage.crossOrigin = "Anonymous";
    utilityImage.src = imageUrl;

    // Al caricamento importo l'immagine in js grazie ad un canvas e poi la ridimensiono
    // a 1x1 così l'algoritmo di ridimensionamento farà una media approssimata dei colori

    utilityImage.addEventListener("load", () => {
        const imageCanvas = document.createElement("canvas");
        const drawnContext = imageCanvas.getContext("2d");
        imageCanvas.width = 1;
        imageCanvas.height = 1;
        // ora comprimo l'immagine
        drawnContext.drawImage(utilityImage, 0, 0, 1, 1); //coordinate (0,0), larghezza e altezza nel canvas di destinazione
        // estraiamo i dati del pixel
        const imageData = drawnContext.getImageData(0, 0, 1, 1).data;
        const r = imageData[0];
        const g = imageData[1];
        const b = imageData[2];
        const avgColor = `rgb(${r}, ${g}, ${b})`;
        // assegniamo il colore all'elemento del DOM target
        const x = document.querySelector(stringForQuerySelector);
        x.style.backgroundColor = avgColor;
    });
};

// fine funzione getImageColor

// getStrongImageColor - apparentemente l'immagine di confronto ha un colore più acceso di quello della media. Proverò a ricalcolarlo
// escludendo i pixel bianchi e, per completezza, escluderò anche quelli trasparenti.

const getStrongImageColor = (imageUrl, stringForQuerySelector = "body") => {
    // creo un'immagine senza appenderla al DOM
    const utilityImage = new Image();
    utilityImage.crossOrigin = "Anonymous";
    utilityImage.src = imageUrl;

    // Al caricamento importo l'immagine in js grazie ad un canvas e poi la ridimensiono

    utilityImage.addEventListener("load", () => {
        const imageCanvas = document.createElement("canvas");
        const drawnContext = imageCanvas.getContext("2d");
        // aumento il numero di pixel rispetto alla funzione precedente
        const width = 80;
        const height = 80;
        imageCanvas.width = width;
        imageCanvas.height = height;
        // ora comprimo l'immagine
        drawnContext.drawImage(utilityImage, 0, 0, width, height); //coordinate (0,0), larghezza e altezza nel canvas di destinazione
        // estraiamo i dati del pixel
        const imageData = drawnContext.getImageData(0, 0, width, height).data;

        // eliminiamo pixel tendenti al bianco e al trasparenti
        const noWhite = 200;
        const noAlpha = 55;

        // facciamo una media degli altri
        let tR = 0;
        let tG = 0;
        let tB = 0;
        let counter = 0;

        for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const a = imageData[i + 3];

            if (a <= noAlpha) continue;
            if (r >= noWhite && g >= noWhite && b >= noWhite) continue;

            tR += r;
            tG += g;
            tB += b;
            counter += 1;
        }

        let avgR = 0;
        let avgG = 0;
        let avgB = 0;

        if (counter !== 0) {
            avgR = tR / counter;
            avgG = tG / counter;
            avgB = tB / counter;
        }

        const avgColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
        // assegniamo il colore all'elemento del DOM target
        const x = document.querySelector(stringForQuerySelector);
        x.style.backgroundColor = avgColor;
    });
};

// fine funzione getStrongImageColor

// recupero l'id dell'album dall'URL

const albumUrl = location.search;
const allParam = new URLSearchParams(albumUrl);
const albumID = allParam.get("album");

console.log("album id: " + albumID);

// id dell'album recuperato

// recupero i dati dell'album dall'API

const urlAPIAlbum = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`;

if (albumID) {
    fetch(urlAPIAlbum)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Errore nel recupero dettagli album");
            }
        })
        .then((res) => {
            console.log(res);

            const albumAllData = res;
            const albumTitle = albumAllData.title;
            const albumeImageUrlMedium = albumAllData.cover_medium;
            const albumeImageUrlSmall = albumAllData.cover_small;
            const albumeImageUrlBig = albumAllData.cover_big;
            const albumArtist = albumAllData.artist.name;
            const albumArtistSmallPicture = albumAllData.artist.picture_small;
            const albumYear = albumAllData.release_date.slice(0, 4);
            const albumTracksNumber = albumAllData.tracks.data.length;
            const albumLengthString = getProperStringTime(
                Number(albumAllData.duration),
            );
            const arrayOfTracks = albumAllData.tracks.data;

            const arrayOfTracksTitles = [];
            const arrayOfTracksArtists = [];
            const arrayOfTracksRank = [];
            const arrayOfTracksLength = [];
            const arrayOfTracksMusic = [];

            for (let i = 0; i < arrayOfTracks.length; i++) {
                arrayOfTracksTitles.push(arrayOfTracks[i].title);
                arrayOfTracksArtists.push(arrayOfTracks[i].artist.name);
                arrayOfTracksRank.push(
                    arrayOfTracks[i].rank.toLocaleString("it-IT"),
                );
                arrayOfTracksLength.push(
                    getProperStringTimeForTrack(arrayOfTracks[i].duration),
                );
                arrayOfTracksMusic.push(arrayOfTracks[i].preview);
            }
            // inserire qui codice che utilizza i dati estratti

            // fine codice che utilizza i dati estratti
        });
}
