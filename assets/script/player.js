// const player = (
//     tagAudioElement,
//     arrayOfSongs,
//     tagImgForPlayer,
//     Img,
//     tagTitleForPlayer,
//     arrayOfTitles,
//     arrayOfArtists,
//     i = 0,
//     ordered,
//     autoplay,
//     repeat = true,
// ) => {
//     tagAudioElement.src = arrayOfSongs[i];
//     tagImgForPlayer.src = Img;

//     if (ordered) {
//         document.querySelector("#random svg").classList.add("text-secondary");
//         document.querySelector("#random svg").classList.remove("text-light");
//     } else {
//         document
//             .querySelector("#random svg")
//             .classList.remove("text-secondary");
//         document.querySelector("#random svg").classList.add("text-light");
//     }

//     if (repeat) {
//         document
//             .querySelector("#repeat svg")
//             .classList.remove("text-secondary");
//         document.querySelector("#repeat svg").classList.add("text-light");
//     } else {
//         document.querySelector("#repeat svg").classList.add("text-secondary");
//         document.querySelector("#repeat svg").classList.remove("text-light");
//     }

//     const btnNext = document.getElementById("next");
//     const btnPrev = document.getElementById("prev");
//     const btnRepeat = document.getElementById("repeat");
//     const btnRandom = document.getElementById("random");
//     const volRange = document.getElementById("vol");
//     const muteBtn = document.getElementById("mute");

//     volRange.oninput = () => {
//         tagAudioElement.volume = Number(volRange.value);
//         tagAudioElement.muted = false;
//     };

//     tagAudioElement.onvolumechange = () => {
//         volRange.value = tagAudioElement.volume;
//         if (tagAudioElement.volume === 0) {
//             tagAudioElement.muted = true;
//         } else {
//             tagAudioElement.muted = false;
//         }
//         if (tagAudioElement.muted) {
//             muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-volume-mute text-secondary" viewBox="0 0 16 16">
//   <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06M6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
// </svg>`;
//         } else {
//             muteBtn.innerHTML = `<svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="32"
//                             height="32"
//                             fill="currentColor"
//                             class="bi bi-volume-down text-secondary"
//                             viewBox="0 0 16 16">
//                             <path
//                                 d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zM6.312 6.39 8 5.04v5.92L6.312 9.61A.5.5 0 0 0 6 9.5H4v-3h2a.5.5 0 0 0 .312-.11M12.025 8a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8" />
//                         </svg>`;
//         }
//     };

//     muteBtn.onclick = () => {
//         if (!tagAudioElement.muted) {
//             tagAudioElement.muted = true;
//             muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-volume-mute text-secondary" viewBox="0 0 16 16">
//   <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06M6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
// </svg>`;
//         } else {
//             tagAudioElement.muted = false;
//             muteBtn.innerHTML = `<svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="32"
//                             height="32"
//                             fill="currentColor"
//                             class="bi bi-volume-down text-secondary"
//                             viewBox="0 0 16 16">
//                             <path
//                                 d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zM6.312 6.39 8 5.04v5.92L6.312 9.61A.5.5 0 0 0 6 9.5H4v-3h2a.5.5 0 0 0 .312-.11M12.025 8a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8" />
//                         </svg>`;
//         }
//     };

//     tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
//                         ${arrayOfTitles[i]}
//                     </p>
//                     <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i]}</p>`;

//     if (autoplay) {
//         tagAudioElement.play().catch((err) => {});
//     }

//     btnNext.onclick = (e) => {
//         e.preventDefault();
//         if (ordered) {
//             i = i + 1;
//             if (i >= arrayOfSongs.length) {
//                 i = 0;
//             }

//             player(
//                 tagAudioElement,
//                 arrayOfSongs,
//                 tagImgForPlayer,
//                 Img,
//                 tagTitleForPlayer,
//                 arrayOfTitles,
//                 arrayOfArtists,
//                 i,
//                 true,
//                 true,
//             );
//         } else {
//             let t = Math.floor(Math.random() * arrayOfSongs.length);
//             if (t !== i) {
//                 i = t;
//             } else if (i < arrayOfSongs.length - 3) {
//                 i = i + 2;
//             } else if (i - 1 >= 0) {
//                 i = i - 1;
//             } else {
//                 i = 0;
//             }

//             player(
//                 tagAudioElement,
//                 arrayOfSongs,
//                 tagImgForPlayer,
//                 Img,
//                 tagTitleForPlayer,
//                 arrayOfTitles,
//                 arrayOfArtists,
//                 i,
//                 false,
//                 true,
//             );
//         }
//     };

//     btnPrev.onclick = (e) => {
//         e.preventDefault();
//         if (ordered) {
//             i = i - 1;
//             if (i < 0) {
//                 i = arrayOfSongs.length - 1;
//             }

//             player(
//                 tagAudioElement,
//                 arrayOfSongs,
//                 tagImgForPlayer,
//                 Img,
//                 tagTitleForPlayer,
//                 arrayOfTitles,
//                 arrayOfArtists,
//                 i,
//                 true,
//                 true,
//             );
//         } else {
//             let t = Math.floor(Math.random() * arrayOfSongs.length);
//             if (t !== i) {
//                 i = t;
//             } else if (i < arrayOfSongs.length - 3) {
//                 i = i + 2;
//             } else if (i - 1 >= 0) {
//                 i = i - 1;
//             } else {
//                 i = 0;
//             }
//             player(
//                 tagAudioElement,
//                 arrayOfSongs,
//                 tagImgForPlayer,
//                 Img,
//                 tagTitleForPlayer,
//                 arrayOfTitles,
//                 arrayOfArtists,
//                 i,
//                 false,
//                 true,
//             );
//         }
//     };

//     btnRandom.onclick = (e) => {
//         e.preventDefault();
//         if (ordered) {
//             ordered = false;
//             document.querySelector("#random svg").classList.add("text-light");
//             document
//                 .querySelector("#random svg")
//                 .classList.remove("text-secondary");
//             player(
//                 tagAudioElement,
//                 arrayOfSongs,
//                 tagImgForPlayer,
//                 Img,
//                 tagTitleForPlayer,
//                 arrayOfTitles,
//                 arrayOfArtists,
//                 Math.floor(Math.random() * arrayOfSongs.length),
//                 false,
//                 true,
//             );
//         } else {
//             ordered = true;
//             document
//                 .querySelector("#random svg")
//                 .classList.add("text-secondary");
//             document
//                 .querySelector("#random svg")
//                 .classList.remove("text-light");
//             player(
//                 tagAudioElement,
//                 arrayOfSongs,
//                 tagImgForPlayer,
//                 Img,
//                 tagTitleForPlayer,
//                 arrayOfTitles,
//                 arrayOfArtists,
//                 i,
//                 true,
//                 true,
//             );
//         }
//     };

//     btnRepeat.onclick = (e) => {
//         e.preventDefault();
//         if (repeat) {
//             tagAudioElement.dataset.repeatData = "false";

//             player(
//                 tagAudioElement,
//                 arrayOfSongs,
//                 tagImgForPlayer,
//                 Img,
//                 tagTitleForPlayer,
//                 arrayOfTitles,
//                 arrayOfArtists,
//                 i,
//                 ordered,
//                 true,
//                 false,
//             );
//         } else {
//             tagAudioElement.dataset.repeatData = "true";

//             player(
//                 tagAudioElement,
//                 arrayOfSongs,
//                 tagImgForPlayer,
//                 Img,
//                 tagTitleForPlayer,
//                 arrayOfTitles,
//                 arrayOfArtists,
//                 i,
//                 ordered,
//                 true,
//                 true,
//             );
//         }
//     };

//     if (ordered) {
//         tagAudioElement.onended = (e) => {
//             e.preventDefault();
//             if (i === arrayOfSongs.length - 1) {
//                 if (repeat) {
//                     i = -1;
//                 } else {
//                     i = 0;
//                     tagAudioElement.src = arrayOfSongs[i];
//                     tagImgForPlayer.src = Img;
//                     tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
//                         ${arrayOfTitles[i]}
//                     </p>
//                     <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i]}</p>`;
//                     return;
//                 }
//             }
//             tagAudioElement.src = arrayOfSongs[i + 1];
//             tagImgForPlayer.src = Img;
//             tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
//                         ${arrayOfTitles[i + 1]}
//                     </p>
//                     <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i + 1]}</p>`;
//             tagAudioElement.play().catch((err) => {});
//             i = i + 1;
//         };
//     } else {
//         tagAudioElement.onended = (e) => {
//             e.preventDefault();

//             i = Math.floor(Math.random() * arrayOfSongs.length);

//             tagAudioElement.src = arrayOfSongs[i];
//             tagImgForPlayer.src = Img;
//             tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
//                         ${arrayOfTitles[i]}
//                     </p>
//                     <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i]}</p>`;
//             tagAudioElement.play().catch((err) => {});
//             i = i + 1;
//         };
//     }
// };




const playTrack = (
    audioElement,
    index,
    songs,
    images,
    titleElement,
    titles,
    artists,
    imgElement,
) => {
    audioElement.src = songs[index];
    imgElement.src = images[index];

    titleElement.innerHTML = `
        <p class="text-white text-nowrap m-0 text-truncate">
            ${titles[index]}
        </p>
        <p class="text-white text-nowrap m-0 text-truncate">
            ${artists[index]}
        </p>
    `;

    if (typeof recentSongs !== "undefined") {
        recentSongs.add(index);

        console.log("Canzone riprodotta:", {
            indice: index,
            titolo: titles[index],
            artista: artists[index],
            immagine: images[index],
        });
        console.log("Storico corrente (indici):", recentSongs.list);
        console.log("Numero canzoni nello storico:", recentSongs.list.length);
    } else {
        console.warn("recentSongs non è definito - storico non disponibile");
    }

    return audioElement.play().catch((err) => {
        console.error("Errore nella riproduzione:", err);
    });
};




const player = (
    tagAudioElement,
    arrayOfSongs,
    tagImgForPlayer,
    image,
    tagTitleForPlayer,
    arrayOfTitles,
    arrayOfArtists,
    i = 0,
    ordered,
    autoplay,
    repeat = true,
) => {
    window.playerData = {
        audioElement: tagAudioElement,
        songs: arrayOfSongs,
        imgElement: tagImgForPlayer,
        images: image,
        titleElement: tagTitleForPlayer,
        titles: arrayOfTitles,
        artists: arrayOfArtists,
    };

    tagAudioElement.src = arrayOfSongs[i];
    tagImgForPlayer.src = image;

    if (ordered) {
        document.querySelector("#random svg").classList.add("text-secondary");
        document.querySelector("#random svg").classList.remove("text-light");
    } else {
        document
            .querySelector("#random svg")
            .classList.remove("text-secondary");
        document.querySelector("#random svg").classList.add("text-light");
    }

    if (repeat) {
        document
            .querySelector("#repeat svg")
            .classList.remove("text-secondary");
        document.querySelector("#repeat svg").classList.add("text-light");
    } else {
        document.querySelector("#repeat svg").classList.add("text-secondary");
        document.querySelector("#repeat svg").classList.remove("text-light");
    }

    const btnNext = document.getElementById("next");
    const btnPrev = document.getElementById("prev");
    const btnRepeat = document.getElementById("repeat");
    const btnRandom = document.getElementById("random");
    const volRange = document.getElementById("vol");
    const muteBtn = document.getElementById("mute");

    volRange.oninput = () => {
        tagAudioElement.volume = Number(volRange.value);
        tagAudioElement.muted = false;
    };

    tagAudioElement.onvolumechange = () => {
        volRange.value = tagAudioElement.volume;
        if (tagAudioElement.volume === 0) {
            tagAudioElement.muted = true;
        } else {
            // tagAudioElement.muted = false;
        }
        if (tagAudioElement.muted) {
            muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-volume-mute text-secondary" viewBox="0 0 16 16">
            <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06M6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
            </svg>`;
        } else {
            muteBtn.innerHTML = `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            class="bi bi-volume-down text-secondary"
                            viewBox="0 0 16 16">
                            <path
                                d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zM6.312 6.39 8 5.04v5.92L6.312 9.61A.5.5 0 0 0 6 9.5H4v-3h2a.5.5 0 0 0 .312-.11M12.025 8a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8" />
                            </svg>`;
        }
    };

    muteBtn.onclick = () => {
        if (!tagAudioElement.muted) {
            tagAudioElement.muted = true;
            muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-volume-mute text-secondary" viewBox="0 0 16 16">
            <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06M6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
            </svg>`;
        } else {
            tagAudioElement.muted = false;
            muteBtn.innerHTML = `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            class="bi bi-volume-down text-secondary"
                            viewBox="0 0 16 16">
                            <path
                                d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12zM6.312 6.39 8 5.04v5.92L6.312 9.61A.5.5 0 0 0 6 9.5H4v-3h2a.5.5 0 0 0 .312-.11M12.025 8a4.5 4.5 0 0 1-1.318 3.182L10 10.475A3.5 3.5 0 0 0 11.025 8 3.5 3.5 0 0 0 10 5.525l.707-.707A4.5 4.5 0 0 1 12.025 8" />
                            </svg>`;
        }
    };

    tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
                        ${arrayOfTitles[i]}
                    </p>
                    <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i]}</p>`;

    if (autoplay) {
        playTrack(
            tagAudioElement,
            i,
            arrayOfSongs,
            image,
            tagTitleForPlayer,
            arrayOfTitles,
            arrayOfArtists,
            tagImgForPlayer,
        );
    }

    btnNext.onclick = (e) => {
        e.preventDefault();
        if (ordered) {
            i = i + 1;
            if (i >= arrayOfSongs.length) {
                i = 0;
            }

            player(
                tagAudioElement,
                arrayOfSongs,
                tagImgForPlayer,
                image,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                true,
                true,
            );
        } else {
            let t = Math.floor(Math.random() * arrayOfSongs.length);
            if (t !== i) {
                i = t;
            } else if (i < arrayOfSongs.length - 3) {
                i = i + 2;
            } else if (i - 1 >= 0) {
                i = i - 1;
            } else {
                i = 0;
            }

            player(
                tagAudioElement,
                arrayOfSongs,
                tagImgForPlayer,
                image,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                false,
                true,
            );
        }
    };

    btnPrev.onclick = (e) => {
        e.preventDefault();
        if (ordered) {
            i = i - 1;
            if (i < 0) {
                i = arrayOfSongs.length - 1;
            }

            player(
                tagAudioElement,
                arrayOfSongs,
                tagImgForPlayer,
                image,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                true,
                true,
            );
        } else {
            let t = Math.floor(Math.random() * arrayOfSongs.length);
            if (t !== i) {
                i = t;
            } else if (i < arrayOfSongs.length - 3) {
                i = i + 2;
            } else if (i - 1 >= 0) {
                i = i - 1;
            } else {
                i = 0;
            }
            player(
                tagAudioElement,
                arrayOfSongs,
                tagImgForPlayer,
                image,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                false,
                true,
            );
        }
    };

    btnRandom.onclick = (e) => {
        e.preventDefault();
        if (ordered) {
            ordered = false;
            document.querySelector("#random svg").classList.add("text-light");
            document
                .querySelector("#random svg")
                .classList.remove("text-secondary");
            player(
                tagAudioElement,
                arrayOfSongs,
                tagImgForPlayer,
                image,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                Math.floor(Math.random() * arrayOfSongs.length),
                false,
                true,
            );
        } else {
            ordered = true;
            document
                .querySelector("#random svg")
                .classList.add("text-secondary");
            document
                .querySelector("#random svg")
                .classList.remove("text-light");
            player(
                tagAudioElement,
                arrayOfSongs,
                tagImgForPlayer,
                image,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                true,
                true,
            );
        }
    };

    btnRepeat.onclick = (e) => {
        e.preventDefault();
        if (repeat) {
            tagAudioElement.dataset.repeatData = "false";

            player(
                tagAudioElement,
                arrayOfSongs,
                tagImgForPlayer,
                image,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                ordered,
                true,
                false,
            );
        } else {
            tagAudioElement.dataset.repeatData = "true";

            player(
                tagAudioElement,
                arrayOfSongs,
                tagImgForPlayer,
                image,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                ordered,
                true,
                true,
            );
        }
    };

    if (ordered) {
        tagAudioElement.onended = (e) => {
            e.preventDefault();
            if (i === arrayOfSongs.length - 1) {
                if (repeat) {
                    i = -1;
                } else {
                    i = 0;
                    tagAudioElement.src = arrayOfSongs[i];
                    tagImgForPlayer.src = image;
                    tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
                        ${arrayOfTitles[i]}
                    </p>
                    <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i]}</p>`;
                    return;
                }
            }

            i = i + 1;
            playTrack(
                tagAudioElement,
                i,
                arrayOfSongs,
                image,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                tagImgForPlayer,
            );
        };
    } else {
        tagAudioElement.onended = (e) => {
            e.preventDefault();

            i = Math.floor(Math.random() * arrayOfSongs.length);

            playTrack(
                tagAudioElement,
                i,
                arrayOfSongs,
                image,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                tagImgForPlayer,
            );
        };
    }
};
