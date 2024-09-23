import express from 'express';
import ApiRouter from './api.router';
import AuthRouter from './auth.router';

function setupRoutes(app: any) {

    const router = express.Router();

    app.use('/api', router);
    router.use('/auth', AuthRouter);
    router.use('/', ApiRouter);

}

export default setupRoutes;