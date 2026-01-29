document.addEventListener('DOMContentLoaded', () => {
    const songs = [
        'assets/audio/canzone1.mp3',
        'assets/audio/canzone2.mp3',
        'assets/audio/canzone3.mp3',
    ];

    const titles = [
        'Titolo Canzone 1',
        'Titolo Canzone 2',
        'Titolo Canzone 3',
    ];

    const artists = [
        'Artista 1',
        'Artista 2',
        'Artista 3',
    ];

    const images = [
        'assets/imgs/cover1.jpg',
        'assets/imgs/cover2.jpg',
        'assets/imgs/cover3.jpg',
    ];

    const audioElement = document.getElementById('audio-player');
    const imgElement = document.getElementById('player-img');
    const titleElement = document.getElementById('player-title');

    if (audioElement) {
        audioElement.volume = 0.5;
    }

    player(
        audioElement,
        songs,
        imgElement,
        images,
        titleElement,
        titles,
        artists,
        0,
        true,
        false,
        true
    );

    console.log('✅ Player inizializzato con successo!');
});