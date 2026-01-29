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
        const min = (
            "00" + Math.floor((secTime - hours * 60 * 60) / 60).toString()
        ).slice(-2);
        const sec = (
            "00" + (secTime - hours * 60 * 60 - min * 60).toString()
        ).slice(-2);
        trackLengthString = `${hours}:${min}:${sec}`;
    } else if (secTime >= 60) {
        const min = Math.floor(secTime / 60);
        const sec = ("00" + (secTime - min * 60).toString()).slice(-2);
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

const getImageColor = (
    imageUrl,
    stringForQuerySelector = "body",
    stringForQuerySelectorGradient = "main",
) => {
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
        const avgColorRgba = `rgba(${avgR}, ${avgG}, ${avgB}, 1)`;
        // assegniamo il colore all'elemento del DOM target
        const x = document.querySelector(stringForQuerySelector);
        x.style.backgroundColor = avgColor;
        // assegniamo gradiente all'elemento del DOM indicato nel secondo parametro
        const y = document.querySelector(stringForQuerySelectorGradient);
        y.style.backgroundColor = "avgColor";
        y.style.backgroundImage = `linear-gradient(180deg, ${avgColorRgba} 0%, rgba(18, 18, 18, 1) 65%)`;
    });
};

// fine funzione getImageColor

// getStrongImageColor - apparentemente l'immagine di confronto ha un colore più acceso di quello della media. Proverò a ricalcolarlo
// escludendo i pixel bianchi e, per completezza, escluderò anche quelli trasparenti.

const getStrongImageColor = (
    imageUrl,
    stringForQuerySelector = "body",
    stringForQuerySelectorGradient = "main",
) => {
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
        const avgColorRgba = `rgba(${avgR}, ${avgG}, ${avgB}, 1)`;
        // assegniamo il colore all'elemento del DOM target
        const x = document.querySelector(stringForQuerySelector);
        x.style.backgroundColor = avgColor;
        // adeguiamo il color del testo al nuovo colore
        const luma = (avgR * 299 + avgG * 587 + avgB * 114) / 1000;
        if (luma >= 128) {
            x.style.color = "#121212";
        } else {
            x.style.color = "#FFFFFF";
        }

        // assegniamo gradiente all'elemento del DOM indicato nel secondo parametro
        const y = document.querySelector(stringForQuerySelectorGradient);
        y.style.backgroundColor = avgColor;
        y.style.backgroundImage = `linear-gradient(180deg, ${avgColorRgba} 0%, rgba(18, 18, 18, 1) 65%)`;
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
            const albumArtistId = albumAllData.artist.id;
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
            let firstSongPlaying = 0;
            let songOrdered = true;
            let autoP = false;
            let repeatSong = true;
            const imgPlayer = document.getElementById("img-player");
            const songPlaying = document.getElementById("song-playing");
            const audio = document.getElementById("player");
            const mainAlbum = document.getElementById("main-album");
            const olTrack = document.getElementById("ol-track");
            const btnPlayAlbum = document.getElementById("play-album");

            getStrongImageColor(albumeImageUrlMedium, "#main-album", "main");

            btnPlayAlbum.onclick = (e) => {
                e.preventDefault();
                if (audio.dataset.repeatData === "true") {
                    repeatSong = true;
                } else if (audio.dataset.repeatData === "false") {
                    repeatSong = false;
                }

                firstSongPlaying = 0;
                if (!autoP) {
                    autoP = true;
                    player(
                        audio,
                        arrayOfTracksMusic,
                        imgPlayer,
                        albumeImageUrlMedium,
                        songPlaying,
                        arrayOfTracksTitles,
                        arrayOfTracksArtists,
                        firstSongPlaying,
                        songOrdered,
                        autoP,
                        repeatSong,
                    );
                    btnPlayAlbum.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-stop-circle-fill spotify-green ms-2 me-2" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5z"/>
</svg>`;
                } else {
                    autoP = false;
                    player(
                        audio,
                        arrayOfTracksMusic,
                        imgPlayer,
                        albumeImageUrlMedium,
                        songPlaying,
                        arrayOfTracksTitles,
                        arrayOfTracksArtists,
                        firstSongPlaying,
                        songOrdered,
                        autoP,
                        repeatSong,
                    );
                    btnPlayAlbum.innerHTML = `<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                fill="currentColor"
                                class="bi bi-play-circle-fill spotify-green ms-2 me-2"
                                viewBox="0 0 16 16">
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                            </svg>`;
                }
            };

            mainAlbum.innerHTML = `<div class="col-lg-3">
                        <img
                            class="img-fluid"
                            src="${albumeImageUrlMedium}"
                            alt="" />
                    </div>
                    <div class="col-lg-9">
                        <div class="col-lg-12">
                            <p>ALBUM</p>
                            <h1>${albumTitle}</h1>
                            <p>
                                <a href="./artist.html?artist=${albumArtistId}" class="text-decoration-none" style="color:inherit"
                                    >${albumArtist}</a
                                >
                                ${albumYear} ${albumTracksNumber} brani
                            </p>
                        </div>
                    </div>`;

            for (i = 0; i < arrayOfTracks.length; i++) {
                olTrack.innerHTML += `<li
                                class="d-flex align-items-center mb-3 col-8 pe-0" >
                                <button type="button" class="btn-zero d-flex align-items-center" data-number="${i}">
                                <div class="me-3">${i + 1}</div>

                                <div>
                                    <div class="">${arrayOfTracksTitles[i]}</div>
                                    <div class="">${arrayOfTracksArtists[i]}</div>
                                </div></button>
                            </li>
                            <p class="col-1 p-0 text-end fs-7">${arrayOfTracksRank[i]}</p>
                            <p class="col-3 text-end pe-4 alignment fs-7">${arrayOfTracksLength[i]}</p>`;
            }

            olTrack.onclick = (e) => {
                e.preventDefault();
                const btn = e.target.closest("button");
                if (!btn) return;
                const num = Number(btn.dataset.number);
                firstSongPlaying = num;
                autoP = true;

                if (audio.dataset.repeatData === "true") {
                    repeatSong = true;
                } else if (audio.dataset.repeatData === "false") {
                    repeatSong = false;
                }

                player(
                    audio,
                    arrayOfTracksMusic,
                    imgPlayer,
                    albumeImageUrlMedium,
                    songPlaying,
                    arrayOfTracksTitles,
                    arrayOfTracksArtists,
                    firstSongPlaying,
                    songOrdered,
                    autoP,
                    repeatSong,
                );
                btnPlayAlbum.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-stop-circle-fill spotify-green ms-2 me-2" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5z"/>
</svg>`;
            };

            if (audio.dataset.repeatData === "true") {
                repeatSong = true;
            } else if (audio.dataset.repeatData === "false") {
                repeatSong = false;
            }

            player(
                audio,
                arrayOfTracksMusic,
                imgPlayer,
                albumeImageUrlMedium,
                songPlaying,
                arrayOfTracksTitles,
                arrayOfTracksArtists,
                firstSongPlaying,
                songOrdered,
                autoP,
                repeatSong,
            );

            // sistema like memorizzata in locale

            //  l'array likesAlbumArray conterrà l'id degli album che piacciono all'utente

            const likeBtn = document.getElementById("like-button");
            let likesAlbumArray = [];
            let doesItLike = false;
            likesAlbumArray = JSON.parse(
                localStorage.getItem("likesAlbumArray"),
            );
            if (!likesAlbumArray) {
                likesAlbumArray = [];
            }

            for (let i = 0; i < likesAlbumArray.length; i++) {
                if (likesAlbumArray[i] === albumID) {
                    doesItLike = true;
                }
            }

            if (doesItLike) {
                likeBtn.innerHTML = `<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                class="bi bi-heart-fill spotify-green"
                                viewBox="0 0 16 16">
                                <path
                                    fill-rule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                            </svg>`;
            } else {
                likeBtn.innerHTML = `<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor "
                                class="bi bi-heart text-light ms-2 me-2"
                                viewBox="0 0 16 16">
                                <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>`;
            }

            likeBtn.onclick = (e) => {
                e.preventDefault();

                likesAlbumArray = JSON.parse(
                    localStorage.getItem("likesAlbumArray"),
                );
                if (!likesAlbumArray) {
                    likesAlbumArray = [];
                    doesItLike = false;
                }

                for (let i = 0; i < likesAlbumArray.length; i++) {
                    if (likesAlbumArray[i] === albumID) {
                        doesItLike = true;
                    }
                }

                if (!doesItLike) {
                    likesAlbumArray.push(albumID);
                    localStorage.setItem(
                        "likesAlbumArray",
                        JSON.stringify(likesAlbumArray),
                    );
                    likeBtn.innerHTML = `<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                class="bi bi-heart-fill spotify-green"
                                viewBox="0 0 16 16">
                                <path
                                    fill-rule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                            </svg>`;
                    doesItLike = true;
                } else {
                    likesAlbumArray = likesAlbumArray.filter(
                        (item) => item !== albumID,
                    );
                    localStorage.setItem(
                        "likesAlbumArray",
                        JSON.stringify(likesAlbumArray),
                    );
                    likeBtn.innerHTML = `<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor "
                                class="bi bi-heart text-light ms-2 me-2"
                                viewBox="0 0 16 16">
                                <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>`;
                    doesItLike = false;
                }
            };
        })
        .catch((err) => {
            console.log("error: ", err);
        });
}
