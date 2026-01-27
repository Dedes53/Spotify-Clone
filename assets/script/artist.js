// variabili globali html 
const artistBg = document.getElementById("artistBg");
const artistNameElement = document.getElementById("artistName");
const fanNumber = document.getElementById("artistFan");
const popularList = document.getElementById("popularList");
const albumsContainer = document.getElementById("albumsContainer");

// variabili fetch
const params = new URLSearchParams(location.search);
const artistID = params.get("artist");

// url per prima chiamata API
const urlAPI = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;

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

        const artistName = artistData.name;
        const artistPicture_xl = artistData.picture_xl;
        const nFan = artistData.nb_fan;

        artistBg.src = artistPicture_xl;
        artistNameElement.innerText = artistName;
        fanNumber.innerText = `${nFan.toLocaleString('it-IT')} fan`;

        //albums dell'artista N.B. Top non funziona  
        return fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}/albums`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Errore nel recupero degli album");
                }
            })
            .then(albumsData => {
                console.log("ALBUMS DATA:", albumsData.data);

                // se ci sono album, prendo le tracce dal primo album
                if (albumsData.data && albumsData.data.length > 0) {
                    const firstAlbumId = albumsData.data[0].id;

                    return fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${firstAlbumId}`)
                        .then(res => {
                            if (res.ok) {
                                return res.json();
                            } else {
                                throw new Error("Errore nel recupero delle tracce");
                            }
                        })
                        .then(albumDetails => {
                            console.log("ALBUM DETAILS:", albumDetails);

                            return {
                                artist: artistData,
                                tracks: albumDetails.tracks.data,
                                albums: albumsData.data
                            };
                        });
                } else {
                    return {
                        artist: artistData,
                        tracks: [],
                        albums: []
                    };
                }
            });
    })
    .then((fullData) => {
        console.log("Artista:", fullData.artist);
        console.log("Canzoni:", fullData.tracks);
        console.log("Album:", fullData.albums);

        // popolo la lista delle canzoni più popolari
        if (fullData.tracks && fullData.tracks.length > 0) {
            // per ora messo solo 5 canzoni nella lista, modificare se vogliamo che si possa espandere e mostrare anche altre 
            for (let i = 0; i < Math.min(5, fullData.tracks.length); i++) {
                const track = fullData.tracks[i];
                const trackItem = document.createElement("li");

                trackItem.className = "d-flex align-items-center py-2 px-3 mb-2 rounded hover-bg-light";

                trackItem.innerHTML = `
                    <span class="me-3 text-white-50 fw-bold" style="min-width: 20px;">${i + 1}</span>
                    <img src="${track.album ? track.album.cover_small : fullData.albums[0].cover_small}" 
                         alt="${track.title} cover" 
                         class="rounded me-3" 
                         style="width: 40px; height: 40px;">
                    <span class="text-white flex-grow-1">${track.title}</span>
                    <span class="text-white-50 ms-3">${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}</span>
                `;

                popularList.appendChild(trackItem);
            }
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

    albumsContainer.innerHTML = '';

    albums.forEach(album => {
        const albumCol = document.createElement("div");
        albumCol.className = "col";

        const year = album.release_date ? album.release_date.slice(0, 4) : "";

        const recordType = album.record_type
            ? album.record_type.charAt(0).toUpperCase() + album.record_type.slice(1)
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