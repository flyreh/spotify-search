

class AlbumService {
    constructor() {
    }

    async getTracks(id: string, token: string) {

        console.log("Obteniendo canciones")

        try {

            const response = await fetch(`https://api.spotify.com/v1/albums/${encodeURIComponent(id)}/tracks`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Error searching for musics for album');

            const data = await response.json();

            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default AlbumService;