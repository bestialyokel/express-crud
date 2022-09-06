import { Router } from "express";
import { OrdersController } from "../orders/orders.controller";

type ResponseWrapper<V> = {
    data?: V;
    error?: string;
}

const MakeResponse = <V,E>(data: V, error: string | null) => {
    return {data, error} as ResponseWrapper<V>;
}

export const makeOrdersRouter = (orders: OrdersController) => {
    const router = Router();

    router.get('/', async (req, res) => {
        try {
            const response = MakeResponse(await orders.getAll(), null);
            res.write( JSON.stringify(response) );
        } catch(error) {
            const errMsg = error instanceof Error ? error.message : JSON.stringify(error)
            const response = MakeResponse(null, errMsg);
            res.write( JSON.stringify(response) );
        } finally {
            res.end();
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const dto = {
                id: req.params.id
            };

            const response = MakeResponse(await orders.deleteOne(dto), null);
            res.write( JSON.stringify(response) );
        } catch(error) {
            const errMsg = error instanceof Error ? error.message : JSON.stringify(error)
            const response = MakeResponse(null, errMsg);
            res.write( JSON.stringify(response) );
        } finally {
            res.end();
        }
    });

    router.post('/', async (req, res) => {
        try {
            const response = MakeResponse(await orders.addOne({...req.body}), null);
            res.write( JSON.stringify(response) );
        } catch(error) {
            const errMsg = error instanceof Error ? error.message : JSON.stringify(error)
            const response = MakeResponse(null, errMsg);
            res.write( JSON.stringify(response) );
        } finally {
            res.end();
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const response = MakeResponse(await orders.updateOne(Number(req.params.id), req.body), null);
            res.write( JSON.stringify(response) );
        } catch(error) {
            const errMsg = error instanceof Error ? error.message : JSON.stringify(error)
            const response = MakeResponse(null, errMsg);
            res.write( JSON.stringify(response) );
        } finally {
            res.end();
        }
    });

    return router;
}