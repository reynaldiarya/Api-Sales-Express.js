import express from 'express';

import { AdminRoute, VendorRoute, ShoppingRoute, CustomerRoute } from './routes';

import bodyParser from 'body-parser';
import { MONGO_URI } from './config';
import mongoose from 'mongoose';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/admin', AdminRoute)
app.use('/vendor', VendorRoute)
app.use('/customer', CustomerRoute);
app.use(ShoppingRoute)

mongoose.connect(MONGO_URI).then(result => {
    console.log('DB terkoneksi');
}).catch(err => console.log('error '+ err))

app.listen(8000, () => {
    console.log('aplikasi aktif pada port 8000')
})