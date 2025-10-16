# HNG-STAGE-0-TASK-
Build a Dynamic Profile Endpoint
This is the first task of the HNG Internship. I am required to build a simple RESTful API endpoint that returns profile information with a dynamic cat fact included in the response fetched from an external API.
Deployed on *****

## Live API URL
**Base URL:**  
https:*****.com  

Try:  
`GET https:*****/me`

## Endpoints

### GET /me
Returns JSON in this structure

```JSON
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

```JSON
{
  ****
}
```

## Error Handling



## Instructions (for running locally)
Clone this repo

```bash
git clone https://github.com/your-username/catfacts-api.git
cd catfacts-api
```
Install the dependencies
```bash
npm install
```
Start the server
```bash
npm run dev
```





