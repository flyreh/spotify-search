import express from 'express';
import { Request, Response } from "express";
import AuthService from '../services/auth.service';
import querystring from 'querystring';

const service = new AuthService();

const login = async (req: Request, res: Response) => {

    try {
        const authUrl = await service.getAuthUrl();

        res.redirect(authUrl);

    } catch (error) {

        res.status(400).send({ message: "Error initiating authentication" });
    }
}

const callback = async (req: Request, res: Response) => {

    console.log('Callback');

    try {
        const code = req.query.code as string;
        const state = req.query.state as string;

        console.log('Code', code);
        console.log('State', state);

        if (!state) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {

            const tokenData = await service.getTokenData(code);

            const queryParams = querystring.stringify({
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token,
                expires_in: tokenData.expires_in
            });

            res.redirect(`http://localhost:5173/auth/callback?${queryParams}`);
        }
        //guardar el token en la sesión o DB

    } catch (error) {
        res.status(400).send({ message: "Error during authentication callback" });
    }
}

const refreshToken = async (req: Request, res: Response) => {

    try {
        const refreshToken = req.body.refreshToken as string;

        const newTokenData = await service.refreshToken(refreshToken);

        console.log('NewTokenData', newTokenData);

        const queryParams = querystring.stringify({
            access_token: newTokenData.access_token,
            refresh_token: newTokenData.refresh_token,
            expires_in: newTokenData.expires_in
        });

        res.redirect(`http://localhost:5173/auth/callback?${queryParams}`);

    } catch (error) {

        res.status(400).send({ message: "Error refreshing token" });
    }

}

export default { login, callback, refreshToken };