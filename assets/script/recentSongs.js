const recentSongs = {
    list: [],
    maxSize: 6,

    add(index) {
        const existingIndex = this.list.indexOf(index);
        if (existingIndex !== -1) {
            this.list.splice(existingIndex, 1);
        }
        this.list.unshift(index);
        if (this.list.length > this.maxSize) {
            this.list.pop();
        }
        this.render();
        this.save();
    },

    render() {
        const container = document.getElementById('recentSongsContainer');
        if (!container) return;

        container.innerHTML = '';

        if (this.list.length === 0) {
            container.innerHTML = '<p class="text-secondary text-center m-3">Nessuna canzone riprodotta</p>';
            return;
        }

        if (!window.playerData) return;

        this.list.forEach((songIndex) => {
            const songElement = document.createElement('div');
            songElement.className = 'recent-song-item';
            songElement.innerHTML = `
                <div class="d-flex align-items-center p-2 border-bottom">
                    <img src="${window.playerData.images[songIndex]}" 
                         alt="Cover" 
                         class="me-3 rounded" 
                         style="width: 50px; height: 50px; object-fit: cover;"
                         onerror="this.src='https://via.placeholder.com/50'">
                    <div class="flex-grow-1">
                        <p class="m-0 text-white text-truncate fw-bold">
                            ${window.playerData.titles[songIndex]}
                        </p>
                        <p class="m-0 text-secondary small text-truncate">
                            ${window.playerData.artists[songIndex]}
                        </p>
                    </div>
                    <button class="btn btn-sm btn-outline-light" 
                            onclick="playSongFromRecent(${songIndex})"
                            title="Riproduci">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.697l6.363 3.692a.802.802 0 0 1 0 1.394"/>
                        </svg>
                    </button>
                </div>
            `;
            container.appendChild(songElement);
        });
    },

    save() {
        try {
            localStorage.setItem('recentSongs', JSON.stringify(this.list));
            console.log('Storico salvato:', this.list);
        } catch (error) {
            console.error('Errore salvataggio:', error);
        }
    },

    load() {
        try {
            const saved = localStorage.getItem('recentSongs');
            if (saved) {
                this.list = JSON.parse(saved);
                console.log('Storico caricato:', this.list);
                this.render();
            }
        } catch (error) {
            console.error('Errore caricamento:', error);
            this.list = [];
        }
    },

    clear() {
        this.list = [];
        this.render();
        localStorage.removeItem('recentSongs');
        console.log('Storico pulito');
    }
};

function playSongFromRecent(index) {
    if (!window.playerData) {
        console.error('Player non inizializzato');
        return;
    }

    console.log('Riproduzione da storico - Indice:', index);
    player(
        window.playerData.audioElement,
        window.playerData.songs,
        window.playerData.imgElement,
        window.playerData.images,
        window.playerData.titleElement,
        window.playerData.titles,
        window.playerData.artists,
        index,
        true,
        true,
        true
    );
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Inizializzazione storico...');
    recentSongs.load();
    console.log('Storico inizializzato');
});