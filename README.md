# HNG-STAGE-0-TASK-
Build a Dynamic Profile Endpoint
This is the first task of the HNG Internship. I am required to build a simple RESTful API endpoint that returns profile information with a dynamic cat fact included in the response fetched from an external API.
Deployed on https://hng-stage-0-task-production-d19f.up.railway.app/me

## Live API URL

### **Base URL:**  
https://hng-stage-0-task-production-d19f.up.railway.app  

Try:  
`GET https://hng-stage-0-task-production-d19f.up.railway.app/me`

## Endpoints

### GET /me
Returns JSON in this structure

```json
{
  "status": "success",
  "user": {
    "email": "<your email>",
    "name": "<your full name>",
    "stack": "<your backend stack>"
  },
  "timestamp": "<current UTC time in ISO 8601 format>",
  "fact": "<random cat fact from Cat Facts API>",
}
```
The timestamp is updated and a new fact fetched upon every request

### GET /anything-else

Returns 404 error.

```json
{
  error: "404: Route not found"
}
```

## Error Handling
If something goes wrong (e.g., no internet, fetch fails), the API returns:

```json
{
  error: "[error.name]: [error.message]"
}
```
The error object is built from a custom class extended from Error class in this structure:

```js
{
  message,
  name
}
```

## Instructions (for running locally)
### Clone this repo

```bash
git clone git@github.com:Lufi-SAN/HNG-STAGE-0-TASK-.git
cd HNG-STAGE-0-TASK-
```
### Install the dependencies
Dependencies required
```text
"devDependencies": {
    "@types/express": "^5.0.3",
    "@types/node": "^24.8.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.9.3"
  },
  "dependencies": {
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "express-async-handler": "^1.2.0"
  },
```
Installation
```bash
npm install
```
### Transpile the ts file
```bash
npm run build
```
or 
```bash
npm run watch
```

### Start the server
```bash
npm run start
```





