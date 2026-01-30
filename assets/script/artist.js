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


// variabili globali html 
const artistBg = document.getElementById("artistBg"); // immagine sfondo dell'artista 
const artistNameElement = document.getElementById("artistName"); // nome dell'artista 
const fanNumber = document.getElementById("artistFan"); // numero dei fan
const popularList = document.getElementById("popularList"); // lista per le canzoni più popolari 
const albumsContainer = document.getElementById("albumsContainer"); // contenitore per gli album

// variabili fetch
const params = new URLSearchParams(location.search);
const artistID = params.get("artist"); // recupero l'id dell'artista dall'ulr della pagina 

// url per prima chiamata API
const urlAPI = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;

let fullData = null;

// prima fetch: dettagli artista
fetch(urlAPI)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Errore nel recupero dei dettagli dell'artista");
        }
    })
    .then((artistData) => {
        console.log("ARTIST DATA:", artistData);

        // estraggo nome, immagine e numero fan dell'artista e modifico il dom
        const artistName = artistData.name;
        const artistPicture_xl = artistData.picture_xl;
        const nFan = artistData.nb_fan;

        artistBg.src = artistPicture_xl;
        artistNameElement.innerText = artistName;
        fanNumber.innerText = `${nFan.toLocaleString('it-IT')} fan`;
        getStrongImageColor(artistPicture_xl, "#heroImg", "main");

        return fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}/top?limit=50`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Errore nel recupero delle top tracks");
                }
            })
            .then(topTracksData => {
                console.log("TOP TRACKS DATA:", topTracksData.data);

                //albums dell'artista
                return fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}/albums`)
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw new Error("Errore nel recupero degli album");
                        }
                    })
                    .then(albumsData => {
                        console.log("ALBUMS DATA:", albumsData.data); // array degli album

                        return {
                            artist: artistData, // dati dell'artista 
                            tracks: topTracksData.data, // canzoni più popolari
                            albums: albumsData.data // lista di tutti gli album
                        };
                    });
            });
    })
    .then((data) => {
        fullData = data;

        console.log("Artista:", fullData.artist);
        console.log("Canzoni:", fullData.tracks);
        console.log("Album:", fullData.albums);

        // popolo la lista delle canzoni più popolari
        if (fullData.tracks && fullData.tracks.length > 0) {

            // per ora messo solo 5 canzoni nella lista, modificare se vogliamo che si possa espandere e mostrare anche altre 
            showPopularTracks(5);
        } else {
            popularList.innerHTML = '<li class="text-white-50">Nessuna canzone disponibile</li>';
        }

        // popolo la griglia degli album
        if (fullData.albums && fullData.albums.length > 0) {
            displayAlbums(fullData.albums);
        } else {
            albumsContainer.innerHTML = '<p class="text-white">Nessun album disponibile</p>';
        }



    })
    .catch((error) => {
        console.error("Si è verificato un errore:", error);

        if (popularList) {
            popularList.innerHTML = `<li class="text-danger">Errore: ${error.message}</li>`;
        }
    });



function displayAlbums(albums) {
    if (!albumsContainer) {
        console.warn("Contenitore album non trovato nel DOM");
        return;
    }

    albumsContainer.innerHTML = ''; // "resetto" il contenitore per ricaricarlo 
    albumsContainer.classList.add("d.flex", "flex-no-wrap", "overflow-auto", "scrollbarStyle"); // aggiungo classi per lo scorrimento orizzontale
    albums.forEach(album => {
        const albumCol = document.createElement("div");
        albumCol.className = "col";

        const year = album.release_date ? album.release_date.slice(0, 4) : ""; // formatta la data restituendo solo l'anno 

        const recordType = album.record_type
            ? album.record_type.charAt(0).toUpperCase() + album.record_type.slice(1) // rende maiuscola la prima lettera 
            : "Album";

        albumCol.innerHTML = `
            <div class="card bg-transparent border-0 h-100">
                <a href="album.html?album=${album.id}" class="text-decoration-none">
                    <div class="card-body p-3 rounded transition-all hover-bg-secondary">
                        <img src="${album.cover_medium}" 
                             alt="${album.title}" 
                             class="card-img-top rounded mb-3 shadow">
                        <h5 class="card-title text-white fw-semibold mb-2" 
                            style="
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                line-height: 1.5;
                                max-height: 3em;">
                            ${album.title}
                        </h5>
                        <p class="card-text text-white-50 mb-0 small text-truncate">
                            ${year} • ${recordType}
                        </p>
                    </div>
                </a>
            </div>
        `;

        albumsContainer.appendChild(albumCol);
    });

    console.log(`Visualizzati ${albums.length} album`);
}

// =================FINE POPOLAZIONE PAGINA DA API===========================================

// funzionae per le popular tracks 
function showPopularTracks(n) {
    for (let i = 0; i < Math.min(n, fullData.tracks.length); i++) {
        const track = fullData.tracks[i];
        const trackItem = document.createElement("li");

        trackItem.className = "d-flex align-items-center py-2 px-3 mb-2 rounded hover-bg-light";

        trackItem.innerHTML = `
                    <span class="me-3 text-white-50 fw-bold" style="min-width: 20px;">${i + 1}</span>
                    <img src="${track.album ? track.album.cover_small : ''}" 
                         alt="${track.title} cover" 
                         class="rounded me-3" 
                         style="width: 40px; height: 40px;">
                    <span class="text-white flex-grow-1">${track.title}</span>
                    <span class="text-white-50 ms-3">${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}</span> 
                `;

        popularList.appendChild(trackItem);
    }
};

const showMoreBtn = document.getElementById("togglePopular"); //button per ampliare la lista

// funzione per gestire la lista delle popular tracks
showMoreBtn.addEventListener("click", () => {
    let shown;
    if (popularList.children.length > 5) { shown = true; }
    else { shown = false; }

    if (shown === false) {
        popularList.innerHTML = ""; // resetto la lista prima di aggiungere gli elementi

        showPopularTracks(10);
        showMoreBtn.innerText = "Mostra meno";
        shown = true;
    }
    else {
        popularList.innerHTML = ""; // resetto la lista prima di aggiungere gli elementi

        showPopularTracks(5);
        showMoreBtn.innerText = "Mostra altro";
        shown = false;
    }
});



