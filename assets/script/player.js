const player = (
    tagAudioElement,
    arrayOfSongs,
    tagImgForPlayer,
    Img,
    tagTitleForPlayer,
    arrayOfTitles,
    arrayOfArtists,
    i = 0,
    ordered,
    autoplay,
    repeat = true,
) => {
    tagAudioElement.src = arrayOfSongs[i];
    tagImgForPlayer.src = Img;

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

    tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
                        ${arrayOfTitles[i]}
                    </p>
                    <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i]}</p>`;

    if (autoplay) {
        tagAudioElement.play().catch((err) => {});
    }

    btnNext.addEventListener("click", (e) => {
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
                Img,
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
                Img,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                false,
                true,
            );
        }
    });

    btnPrev.addEventListener("click", (e) => {
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
                Img,
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
                Img,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                false,
                true,
            );
        }
    });

    btnRandom.addEventListener("click", (e) => {
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
                Img,
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
                Img,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                true,
                true,
            );
        }
    });

    btnRepeat.addEventListener("click", (e) => {
        e.preventDefault();
        if (repeat) {
            player(
                tagAudioElement,
                arrayOfSongs,
                tagImgForPlayer,
                Img,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                ordered,
                true,
                false,
            );
        } else
            player(
                tagAudioElement,
                arrayOfSongs,
                tagImgForPlayer,
                Img,
                tagTitleForPlayer,
                arrayOfTitles,
                arrayOfArtists,
                i,
                ordered,
                true,
                true,
            );
    });

    if (ordered) {
        tagAudioElement.addEventListener("ended", (e) => {
            e.preventDefault();
            if (i === arrayOfSongs.length - 1) {
                if (repeat) {
                    i = -1;
                } else {
                    i = 0;
                    tagAudioElement.src = arrayOfSongs[i];
                    tagImgForPlayer.src = Img;
                    tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
                        ${arrayOfTitles[i]}
                    </p>
                    <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i]}</p>`;
                    return;
                }
            }
            tagAudioElement.src = arrayOfSongs[i + 1];
            tagImgForPlayer.src = Img;
            tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
                        ${arrayOfTitles[i + 1]}
                    </p>
                    <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i + 1]}</p>`;
            tagAudioElement.play().catch((err) => {});
            i = i + 1;
        });
    } else {
        tagAudioElement.addEventListener("ended", (e) => {
            e.preventDefault();

            i = Math.floor(Math.random() * arrayOfSongs.length);

            tagAudioElement.src = arrayOfSongs[i];
            tagImgForPlayer.src = Img;
            tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
                        ${arrayOfTitles[i]}
                    </p>
                    <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i]}</p>`;
            tagAudioElement.play().catch((err) => {});
            i = i + 1;
        });
    }
};
