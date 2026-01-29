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

// -------
// pezzo di codice da attivare in caso di parametro nell'url

// // recupero l'id dell'album dall'URL

// const searchUrl = location.search;
// const searchAllParam = new URLSearchParams(albumUrl);
// const searchQuery = searchAllParam.get("q");

// console.log("query: " + searchQuery);

// // query recuperata
// -------

// Per avviare la ricerca il form dovrà avere id="search"
// il tasto "X" dovrà avere una classe bootstrap d-none e
// un id="erase-search"

const search = document.getElementById("search");
const eraseSearch = document.getElementById("erase-search");
const searchResult = document.getElementById("search-result");
const searchBlock = document.getElementById("search-block");

// recuperiamo i valori inseriti nella casella di ricerca

search.addEventListener("input", (e) => {
    searchResult.innerHTML = "";
    e.preventDefault;
    const query = e.target.value;
    if (query) {
        eraseSearch.classList.remove("d-none");
        // codice da inserire per effettuare la ricerca
        const searchApiLink =
            "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
            query;

        fetch(searchApiLink)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("error in first then");
                }
            })
            .then((res) => {
                const result = res.data;
                console.log(result);
                const srcArrayOfTitle = [];
                const srcArrayOfArtists = [];
                const srcArrayOfAlbum = [];
                const srcArrayOfAlbumImgs = [];
                const srcArrayOfRank = [];
                const srcArrayOfLength = [];
                const srcArrayOfMusic = [];
                searchResult.innerHTML = "";

                for (let i = 0; i < result.length; i++) {
                    srcArrayOfTitle.push(result[i].title);
                    srcArrayOfArtists.push(result[i].artist.name);
                    srcArrayOfAlbum.push(result[i].album.title);
                    srcArrayOfAlbumImgs.push(result[i].album.cover_small);
                    srcArrayOfRank.push(result[i].rank.toLocaleString("it-IT"));
                    srcArrayOfLength.push(
                        getProperStringTimeForTrack(result[i].duration),
                    );
                    srcArrayOfMusic.push(result[i].preview);
                }
                console.log("result: " + result.length);

                if (result.length > 10) {
                    searchResult.classList.remove("d-none");
                } else {
                    searchResult.classList.add("d-none");
                }

                if (result.length > 10) {
                    for (let i = 0; i < 10; i++) {
                        searchResult.innerHTML += `<div class="row py-2 flex-nowrap rounded rounded-2">
                                    <div class="col ms-2 col-auto">
                                        <img
                                            style="
                                                height: 56px;
                                                aspect-ratio: 1/1;
                                            "
                                            src="${srcArrayOfAlbumImgs[i]}"
                                            alt="${srcArrayOfTitle[i]}" />
                                    </div>
                                    <div class="col flex-grow-1">${srcArrayOfTitle[i]}</div>
                                    <div class="col col-auto me-3 text-end">
                                        ${srcArrayOfArtists[i]} <br />
                                        ${srcArrayOfAlbum[i]}
                                    </div>
                                </div>`;
                    }
                } else {
                    for (let i = 0; i < result.length; i++) {
                        searchResult.innerHTML += `<div class="py-2 flex-nowrap rounded rounded-2">
                                    <div class="col ms-2 col-auto">
                                        <img
                                            style="
                                                height: 56px;
                                                aspect-ratio: 1/1;
                                            "
                                            src="${srcArrayOfAlbumImgs[i]}"
                                            alt="${srcArrayOfTitle[i]}" />
                                    </div>
                                    <div class="col flex-grow-1">${srcArrayOfTitle[i]}</div>
                                    <div class="col col-auto me-3 text-end">
                                        ${srcArrayOfArtists[i]} <br />
                                        ${srcArrayOfAlbum[i]}
                                    </div>
                                </div>`;
                    }
                }
            })
            .catch((error) => {
                console.log("error", error);
            });

        // fine codice da inserire per effettuare la ricerca
    } else {
        eraseSearch.classList.add("d-none");
    }

    // attiviamo il pulsante "X" per svuotare la casella di ricerca

    eraseSearch.addEventListener("click", (er) => {
        er.preventDefault();
        e.target.value = "";
        searchResult.innerHTML = "";
        searchResult.classList.add("d-none");
        eraseSearch.classList.add("d-none");
    });

    document.addEventListener("click", (e) => {
        if (!searchBlock.contains(e.target)) {
            console.log("click nel search");
            searchResult.innerHTML = "";
            searchResult.classList.add("d-none");
            eraseSearch.classList.add("d-none");
            search.value = "";
        }
    });
});
