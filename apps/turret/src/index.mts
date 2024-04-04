import * as http from 'http';
import {manageDockerCompose} from './controller.mjs';

const PORT = 8000;

// Create a request handler function
const requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Send the response body
    response.end('Hello, World!\n');

    manageDockerCompose('Apple', '../apple');
    
    // Extract the path from the request URL
    const path = request.url;
    console.log(`Request path: ${path}`);
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});



