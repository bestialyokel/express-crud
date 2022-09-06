import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { makeOrdersRouter } from './api/orders.router';
import { createDbConnection } from './db/db';
import { OrderDaoImpl } from './orders/order.dao';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';


export const initApp = () => {
    
    const app: Express = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json({}));

    const db = createDbConnection();
    const dao = new OrderDaoImpl(db);
    const service = new OrdersService(dao);
    const controller = new OrdersController(service);
    
    app.use('/orders', makeOrdersRouter(controller));

    return app;
}