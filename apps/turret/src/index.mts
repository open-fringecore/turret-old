import * as http from 'http';

// Define the port for the server to listen on
const PORT = 8000;

// Create a request handler function
const requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
    // Set the response HTTP status code and headers
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Send the response body
    response.end('Hello, World!\n');
    // Extract the path from the request URL
    const path = request.url;
    // Log the path
    console.log(`Request path: ${path}`);
};

// Create an HTTP server instance
const server = http.createServer(requestHandler);

// Start the server and listen for incoming connections
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
