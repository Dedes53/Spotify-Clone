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
) => {
    tagAudioElement.src = arrayOfSongs[i];
    tagImgForPlayer.src = Img;
    tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
                        ${arrayOfTitles[i]}
                    </p>
                    <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i]}</p>`;

    if (autoplay) {
        tagAudioElement.play();
    }

    if (ordered) {
        tagAudioElement.addEventListener("ended", (e) => {
            e.preventDefault();
            if (i === arrayOfSongs.length - 1) {
                i = -1;
            }
            tagAudioElement.src = arrayOfSongs[i + 1];
            tagImgForPlayer.src = Img;
            tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
                        ${arrayOfTitles[i + 1]}
                    </p>
                    <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i + 1]}</p>`;
            tagAudioElement.play();
            i = i + 1;
        });
    } else {
        tagAudioElement.addEventListener("ended", (e) => {
            e.preventDefault();

            i = Math.floor(Math.random() * arrayOfSongs.length);

            tagAudioElement.src = arrayOfSongs[i + 1];
            tagImgForPlayer.src = Img;
            tagTitleForPlayer.innerHTML = `<p class="text-white text-nowrap m-0 text-truncate">
                        ${arrayOfTitles[i + 1]}
                    </p>
                    <p class="text-white text-nowrap m-0 text-truncate">${arrayOfArtists[i + 1]}</p>`;
            tagAudioElement.play();
            i = i + 1;
        });
    }
};
