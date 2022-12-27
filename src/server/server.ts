import http from 'http';
import { databaseUsers } from '../database/database.js';
import { IUsers } from '../database/interfaceDB.js';

const PORT = 3000;

export const server = http.createServer((req, res) => {
  const userId = '';
  switch (req.method) {
    case 'GET':
      res.setHeader('content-type', 'text/plain');
      switch(req.url) {
        case '/users':
        case '/':
          res.statusCode = 200;
          res.end(databaseUsers);
          break;
        case `/users/${userId}`:
          const responseUser = userId ? databaseUsers[userId] : console.error(`Error: ${userId} default`)
          break;
        default:
          res.statusCode = 404;
          console.error('Error: path default');
      };
  
      res.write('Hello world');
      res.end();
      break;
    case 'POST':
      req.on('data', data => {
        // databaseUsers.push(Buffer.from(data).toString );
      })
      break;
    case 'PUT':
     
      break;
    case 'DELETE':
     
      break;
    }
  });

server.listen(PORT, (error?: Error) => {
  error ? console.error(error) : console.log(`listening port ${PORT}`);
});

