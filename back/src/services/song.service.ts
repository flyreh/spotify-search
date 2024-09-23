

class SongService {

    constructor() {

    }

    async getSong(name: string, token: string) {

        console.log("Obteniendo canciones")

        try {

            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=track&limit=1&include_external=audio`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Error searching for musics for album');

            const data = await response.json();

            console.log(data);

            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getRecommendations(id: string, token: string) {

        console.log("Obteniendo recomendaciones")

        try {

            const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${id}&limit=20`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Error searching for recommendations');

            const data = await response.json();

            console.log(data);

            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }

    }


}


export default SongService;