import express, { type NextFunction, type Request, type Response } from 'express';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}
import CustomError from './errors/CustomError.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/me', 
    asyncHandler( async ( req : Request, res : Response ) => {
    
    const catCall = await fetch("https://catfact.ninja/fact")
    if (!catCall.ok) {
        throw new CustomError("Failed to fetch cat fact", "ServerResponseError")
    }

    const catFact = await catCall.json()
    
    const timestamp = new Date(Date.now()).toISOString()
    
    res.json(
        {   
            status: "success",
            user: {
                email: process.env.EMAIL,
                name: process.env.NAME,
                stack: process.env.STACK
            },
            timestamp,
            fact: catFact.fact
        }
    )
}))

app.use((req, res) => {
    res.status(404).json({ error: "404: Route not found"})
})

app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(500).json({ error: `${err.name}: ${err.message}`})
    }
    const networkError = new CustomError(err.message, "NetworkError")
    res.status(500).json({ error: `${networkError.name}: ${networkError.message}` });
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})