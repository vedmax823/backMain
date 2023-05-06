import { ApolloServer } from '@apollo/server';
import express, {Request, Response} from 'express'
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {json} from 'body-parser';
import {typeDefs, resolvers} from './schema/schema'
import { sequelize } from './db';
import dotenv from 'dotenv'
import uploadPicture from './controllers/pictureConroller';
import fileUpload = require('express-fileupload');
import path = require('path');
dotenv.config()

export interface MyContext {
    req : Request,
    res : Response
}


const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)
    // console.log(process.env.ACCESS_TOKEN_SECRET)

    const server = new ApolloServer<MyContext>({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

    });
    await server.start();
    app.use('/', express.static(path.resolve(__dirname, 'static')))
    app.get("/", (_req, res) => res.send('Hello world'))
    app.get('/hello', (_req, res) => res.send('hello max'))
    app.post('/pictures', cors<cors.CorsRequest>(), json(), cookieParser(), fileUpload() ,uploadPicture)
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        json(),
        cookieParser(),
        expressMiddleware(server, {
          context: async ({ req, res }) => ({req, res}),
        }),
      );
    const PORT = process.env.PORT || 4000

    try{
        await sequelize.authenticate()
        // await sequelize.sync({alter : true})
        console.log('connection with db ok')
    }
    catch(e){
        console.log('Unable to connect to the database:', e)
    }

    await new Promise<void>((resolve) => httpServer.listen({ port : PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

start().catch(error => console.log(error))