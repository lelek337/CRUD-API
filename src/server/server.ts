import http from 'http';
import { databaseUsers } from '../database/database.js';
import { IUser } from '../database/interfaceDB.js';


const PORT = 3000;
let userId = 0;

export const server = http.createServer((req, res) => {
  
  switch (req.method) {
    case 'GET':
      res.setHeader('content-type', 'application/json');
      const users = JSON.stringify(databaseUsers);
      switch(req.url) {
        case '/users':
          // res.statusCode = 200;
          // res.setHeader('Location', '/');
          // res.end();
          // break;
        case '/':
          res.statusCode = 200;
          res.end(users);
          break;
        case `/users/${userId}`:
          res.statusCode = 200;
          const responseUser = userId ? databaseUsers[userId] : console.error(`Error: ${userId} default`);
          res.end(responseUser);
          break;
        default:
          res.statusCode = 404;

          console.error('Error: path default');
      };
      break;

    case 'POST':
      req.on('data', data => {
        const  dataBuffer = JSON.parse((Buffer.from(data)).toString());
        const dataUser =(dataPost: IUser) => {
          dataPost.id = userId;
          return dataPost
        }
        databaseUsers.push(dataUser(dataBuffer));
        userId++;
      });
      res.statusCode = 201;
      res.end('sent a new user to the database');
      break;

    case 'PUT':
      console.log('hello from PUT!')
      break;
    case 'DELETE':
      console.log('Hello from DELETE!')
      break;
    } 
    // default:
    // res.statusCode = 404;
    // console.error('Error: path default');
  });





server.listen(PORT, (error?: Error) => {
  error ? console.error(error) : console.log(`listening port ${PORT}`);
});

