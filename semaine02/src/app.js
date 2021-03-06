import express from 'express';
import dayjs from 'dayjs';

import methodMiddlewares from './middlewares/method.js';
import errorsMiddlewares from './middlewares/errors.js';

import planetsRoutes from './routes/planets-routes.js';
import elementsRoutes from './routes/elements.routes.js';

const app = express();

app.use(express.json());

app.use(methodMiddlewares);
app.use('/planets',planetsRoutes);
app.use('/elements',elementsRoutes);

app.get('/premiere',(req,res) => {
res.status(200);

res.set('Content-Type','text/plain');
res.send('Notre première route avec express');
});

app.get('/date', (req,res)=>{
    res.status(200);
    res.set('Content-Type','text/html');
    res.send(`<strong>${dayjs()}</strong>`);
    

});


app.get('/maths/:operation',(req,res) => {

    //console.log(req.query)

    const operation = req.params.operation;
    console.log(operation);

    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);

    let result = 0;

    switch(operation) {
        case 'somme':

            result=a+b;

            break;

        case 'difference':
        
            result=a-b; 

            break;

        case 'produits':
            
            result=a*b;

            break;

        case 'quotient':

            result=a/b;

            break;

        case 'reste':

            result=a%b;
            
            break;

        default:
            res.status(400); //return res.status(400).end();
            return res.send("Erreur, operation non reconnue");
            // return res.end();
            
            break;

    }

    res.status(200);
    res.set('Content-Type','text/html');
    res.send(`<strong>${result}</strong>`);
    

});

app.use(errorsMiddlewares);

export default app;