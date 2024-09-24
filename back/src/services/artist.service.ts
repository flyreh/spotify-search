

class artistService {

    constructor() { };

    async getInfoByName(name: string, token: string) {

        console.log(token);
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Error in response ::: searching for artist');

            const data = await response.json();

            if (data.artists.items.length === 0) {
                throw new Error('Artist not found');
            }

            return data

        } catch (error) {

            console.log(error);

            throw error;
        }
    }

    async getTopTracks(id: string, token: string) {
        console.log(token);

        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${encodeURIComponent(id)}/top-tracks`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) throw new Error('Error fetching top tracks');

            const data = await response.json();

            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async getArtistAlbums(id: string, token: string) {
        console.log(token);

        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${encodeURIComponent(id)}/albums`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) throw new Error('Error fetching artist albums');

            const data = await response.json();

            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }

    }

}
export default artistService;