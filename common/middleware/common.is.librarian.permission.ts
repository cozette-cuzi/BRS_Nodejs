import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:common-is-librarian-permission');

class CommonIsLibrarianPermission {
   

    async onlyLibrarian(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const isLibrarian = res.locals.jwt.isLibrarian;
        if(isLibrarian) {
            return next();
        }
        else {
            return res.status(403).send();
        }
        
    }
}

export default new CommonIsLibrarianPermission();
