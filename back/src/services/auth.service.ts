const querystring = require('querystring');

class AuthService {

    constructor() { }

    private generateRandomString(length: number): string {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    async getAuthUrl() {

        const ClientID = process.env.CLIENT_ID;
        const RedirectURI = process.env.NODE_ENV === 'production'
            ? process.env.REDIRECT_URI_PROD
            : process.env.REDIRECT_URI_DEV;

        const scope = 'user-read-private user-read-email';
        const state = this.generateRandomString(16);

        const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
            response_type: 'code',
            client_id: ClientID,
            scope: scope,
            redirect_uri: RedirectURI,
            state: state
        })}`;
        return authUrl;
    }

    async getTokenData(code: string) {

        const Client_secret = process.env.CLIENT_SECRET;
        const ClientID = process.env.CLIENT_ID;
        const RedirectURI = process.env.NODE_ENV === 'production'
            ? process.env.REDIRECT_URI_PROD
            : process.env.REDIRECT_URI_DEV;

        const tokenUrl = 'https://accounts.spotify.com/api/token';

        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(ClientID + ':' + Client_secret).toString('base64'))
            },
            body: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: RedirectURI
            }),
        });

        if (!response.ok) {
            throw new Error(`Error fetching token: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    }

    async refreshToken(refreshToken: string) {

        const ClientID = process.env.CLIENT_ID;
        const Client_secret = process.env.CLIENT_SECRET;


        const urlrefresh = "https://accounts.spotify.com/api/token";

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(ClientID + ':' + Client_secret).toString('base64'))
            },
            body: querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            })
        }

        const responde = await fetch(urlrefresh, payload);

        const data = await responde.json();

        return data;

    }
}

export default AuthService;