import 'module-alias/register';
import express, { NextFunction, Request } from 'express';
import { greeterRouter } from '@controllers/';
import Joi from 'joi';

const app = express();
const port = process.env.PORT || 3120; // default port to listen

app.use('/api', greeterRouter);

/* app.use((req, res, next) => {
    console.log(req);
    next();
});
   */

const requireJsonContent = (req: any, res: any, next: any) => {
        if (req.headers['content-type'] !== 'application/json') {
            res.status(400).send('Server requires application/json');
        } else {
            next();
        }
    };

//app.use(requireJsonContent);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});



app.get('/', (_req, res:any) => {
    res.send("Server is up!<br/>Try: /api/greeter?name=Tester");
});
    

const personDataSchema = Joi.object().keys({
    firstname: Joi.string().required(),
});

const wrapper = (outputText:string) =>
    (req:any, res:any, next:any) => {
        console.log(outputText);
        next();
    };
     
const wrapper2 = (funct: any) =>
    (req: Request, res: Response, next: NextFunction) => {
        funct();
        next();
    };
const wrapper3 = () => (req:any, res:any, next:any) => {
    console.log('Middleware3');
    next();
};

const finalWrapper = () => (req: any, res: any) => {
    res.send('OK');
};

app.get('/test',
    (_req: Request, _res: Request, next:NextFunction) => {
        console.log('Middleware1');
        next();
    },
    wrapper('Middleware2'),
    wrapper2(
        () => console.log('Validation')
    ),
    wrapper3(),
    finalWrapper(),

);