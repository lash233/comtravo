# (super) Simple flights API

This API obtains information about available flights from two sources, merges the response from both providers and makes sure that there is no duplicate information.

## Available endpoints
`GET /api/flights` : provides an array of available flights, each flight is an unique pair of round trip flights.

## Documentation
You could find the API documentation starting the project and looking at  `http://localhost:3000/api-docs/`

## Quick start

You can easily start the project running in a command line console the docker command: `docker-compose -f "docker-compose.yaml" up --build` (Docker required). Then `* the project will run in port 3000*`

## Running project for development
### Environment variables
Please first create a `.env` file, you could user the `.env.example` file in the root folder as reference. The .env file must have file required variables:

`PROVIDER_USERNAME` which should be your basic authentication username for the discovery-stub API

`PROVIDER_PASSWORD` which should be your basic authentication password for the discovery-stub API

`PROVIDER_SOURCE_1` first discovery-stub API source.

`PROVIDER_SOURCE_2` second discovery-stub API source.

`API_TIMEOUT` the max response time that you application must have (suggested 1000 milliseconds)

### Dependencies
please run `npm install` command to count with the required dependencies.

### Tests
You would found some code tests in the test folder, you could run this tests runing in the root folder the `npm test` command.

### Start the project
To start the project just run `npm start` in your command line `*the project will run in port 3000*`

## About design pattern
You would found three main folders into the `src` folder: `Services` `Controllers` and `Routes`, this folders decouple the logic necessities in order to keep them maintainable and scalable.

### Service Folder
This will be our `data layer`, the only responsibility of this layer is to obtain the data that our API needs. In this implementation case the data is obtained from other service provider.

### Controllers folder
This will be our `mapping layer` (maybe gateway layer or business logic layer sounds fancier), the responsibility of this layer is to build an standardized API response to pass it to the routing layer. For this, controller layer will take the data provided from our data layer, process it implementing our business logic to build the response.

### Routing folder
This will be our `routing layer`, this layer is the entry and exit point of our application, so in-out stuff happens here. Should take pertinent information from  our user request, pass it to the controller, expect for an standardized response and then provide the response to the user.