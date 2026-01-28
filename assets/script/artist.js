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
                        <h5 class="card-title text-white fw-semibold mb-2 text-truncate" style="font-size: 1rem;">
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

const showMoreBtn = document.getElementById("showMoreBtn"); //button per ampliare la lista

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