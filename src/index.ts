import express, { type NextFunction, type Request, type Response } from 'express';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}
import CustomError from './errors/CustomError.js';

const app = express();
const port = process.env.PORT || 3000;
console.log(`[INFO] Environment: ${process.env.NODE_ENV || "development"}`);

app.get('/me', 
    asyncHandler( async ( req : Request, res : Response ) => {
    
    const catCall = await fetch("https://catfact.ninja/fact")
    console.log(`[INFO] GET /me called at ${new Date().toISOString()}`)
    if (!catCall.ok) {
        console.log(`[ERROR] Failed to fetch cat fact: ${catCall.status} ${catCall.statusText}`)
        throw new CustomError("Failed to fetch cat fact", "ServerResponseError")
    }

    const catFact = await catCall.json()
    console.log(`[INFO] Cat fact fetched successfully: ${catFact.fact}`)
    
    const timestamp = new Date(Date.now()).toISOString()
    console.log(`[INFO] Response sent at ${timestamp}`)
    
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
    console.log(`[WARN] 404 Not Found: ${req.method} ${req.originalUrl} at ${new Date().toISOString()}`)
    res.status(404).json({ error: "404: Route not found"})
})

app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
    if (err instanceof CustomError) {
        console.log(`[ERROR] ${err.name}: ${err.message} at ${new Date().toISOString()}`)
        return res.status(500).json({ error: `${err.name}: ${err.message}`})
    }
    const networkError = new CustomError(err.message, "NetworkError")
    console.log(`[ERROR] ${err.name}: ${err.message} at ${new Date().toISOString()}`)
    res.status(500).json({ error: `${networkError.name}: ${networkError.message}` });
})


app.listen(port, () => {
    console.log(`[INFO] Server running at http://localhost:${port}/`);
})