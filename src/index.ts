import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { initApp } from './app';

dotenv.config();

const port = process.env.PORT;

const app = initApp();

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});

app.get('/abc', (req, res) => {
    res.write('abc');
});