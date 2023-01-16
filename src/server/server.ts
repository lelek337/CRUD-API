import http from 'http';
import crypto from 'crypto';
import { databaseUsers } from '../database/database.js';
import { IUser } from '../database/interfaceDB.js';
import { idValid } from '../snipets/snipets.js';
import { resText } from '../enums/enums.js';
import * as dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT;
export const server = http.createServer((req, res) => {
  const getUserId = req.url?.split('/').pop();

  switch (req.method) {
    case 'GET':
      res.setHeader('content-type', 'application/json');
      const users = JSON.stringify(databaseUsers);
      switch(req.url) {
        case '/users':
        case '/':
          res.statusCode = 200;
          res.end(users);
          break;
        case `/users/${getUserId}`:
          res.statusCode = 200;
          let indexText = -2;
          let textPut = '';
          const resId = databaseUsers.filter((elem, index) => {
            if (!idValid(elem.id!)) {
              res.statusCode = 400;
              indexText = -1;
              textPut = resText.notId;
            } else if (getUserId == elem.id) {
              indexText = index;
              return elem;
            };
          })
          const responseUser = resId ? JSON.stringify(resId) : `Error: ${getUserId} default`;         
            if (indexText == -2) {              
              res.statusCode = 404;
              return textPut = resText.notUser as string;
            }
          res.write(textPut)
          res.end(responseUser);
          break;
        default:
          res.statusCode = 404;
          res.end('Error: path default');
      };
      break;

    case 'POST':
      req.on('data', data => {
        const  dataBuffer = JSON.parse((Buffer.from(data)).toString());
        const dataUser =(dataPost: IUser) => {
          dataPost.id = crypto.randomUUID();
          return dataPost
        }
        databaseUsers.push(dataUser(dataBuffer));
      });
      res.statusCode = 201;
      res.end('Sent a new user to the database');
      break;

    case 'PUT':
      let textPut = '';
      let indexPut = -2;
      const resId = databaseUsers.forEach((elem, index) => {
        if (!idValid(elem.id!)) {
          res.statusCode = 400;
          indexPut = -1;
          textPut = resText.notId;
        }else if (getUserId == elem.id) {
          res.statusCode = 200;
          indexPut = index;
          req.on('data', data => {
            const  dataBuffer = JSON.parse(Buffer.from(data).toString());
            const dataUser =(dataPost: IUser) => {
              dataPost.id = elem.id;
              return dataPost
            }
            databaseUsers.push(dataUser(dataBuffer));
          })
        }
      })
      delete databaseUsers[indexPut];
      indexPut === -2 ? res.statusCode = 404 : indexPut;
      indexPut >= -1 ? textPut = resText.dataChanget : textPut
      res.end(textPut)
      break;
    case 'DELETE':
      let indexDelete = -2;
      let textDelete = '';
      databaseUsers.forEach((elem, index) => {
        if (!idValid(elem.id!)) {
          res.statusCode = 400;
          indexDelete = -1;
          textDelete = resText.notId;
        } else if (getUserId == elem.id) {
          res.statusCode = 204;
          indexDelete = index;
          delete databaseUsers[index];
        };
      })
      indexDelete === -2 ? res.statusCode = 404 : indexDelete;
      indexDelete >= 0 ? textDelete = resText.deletUser : textDelete;
      res.end(textDelete)
      break;
    default:
      res.statusCode = 404;
  } 
});

server.listen(PORT, (error?: Error) => {
  error ? console.error(error) : console.log(`listening port ${PORT}`);
});

