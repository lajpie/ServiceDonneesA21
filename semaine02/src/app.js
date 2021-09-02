import express from 'express';
import dayjs from 'dayjs';

const app = express();


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

//maths/somme
//maths/difference
//maths/produits
//maths/quotient
//maths/reste



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

export default app;