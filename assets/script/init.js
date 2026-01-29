document.addEventListener('DOMContentLoaded', async () => {
    const audioElement = document.getElementById('audio-player');

    if (!audioElement) {
        console.log('⏭️ Player non presente in questa pagina');
        return;
    }

    console.log('🔄 Caricamento canzoni da API...');

    try {
        // SOSTITUISCI CON IL TUO ENDPOINT
        const response = await fetch('https://tua-api.com/songs');
        const data = await response.json();

        // Mappa i dati dall'API
        const songs = data.map(song => song.audioUrl);      // ← Adatta al tuo JSON
        const titles = data.map(song => song.title);
        const artists = data.map(song => song.artist);
        const images = data.map(song => song.coverUrl);

        const imgElement = document.getElementById('player-img');
        const titleElement = document.getElementById('player-title');

        if (!imgElement || !titleElement) {
            console.error('Elementi player mancanti!');
            return;
        }

        audioElement.volume = 0.5;

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

        console.log('Player inizializzato con', songs.length, 'canzoni');

    } catch (error) {
        console.error('Errore caricamento canzoni:', error);
    }
});