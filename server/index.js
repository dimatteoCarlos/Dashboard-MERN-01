//index.js
import express from 'express';
//verify  bodyParser is no longer needed?
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import generalRoutes from './routes/routeGeneral.js';
import clientRoutes from './routes/routeClient.js';
import salesRoutes from './routes/routeSales.js';
// import managementRoutes from './routes/routeManagement.js';

//collection model imports Models[{collectionNameIndex}]

import Models from './models/CollectionModels.js';

/*CONFIGURATIONS*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
//allow cross origin sharing request
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//make api call from another server
app.use(cors());
app.use(morgan('common'));

/*ROUTES */
//app.use('route',router)
app.use('/general', generalRoutes);
app.use('/client', clientRoutes);
app.use('/sales', salesRoutes);

// app.use('/management', managementRoutes);

/*MONGOOSE SETUP */
const PORT = process.env.PORT || 5001;
// console.log(
//   '🚀 server/index.js (process.env.DB_CONNECTION_STRING:',
//   process.env.DB_CONNECTION_STRING
// );

//parece que ya las options no hacen falta actualmente.

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DB_CONNECTION_STRING, options)

  // .connect('mongodb://localhost:27017', options)

  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /*ONLY ADD DATA ONCE, JUST ONE TIME*/
    //all collections
    // Models.map((obj)=>obj.collectionModel.insertMany(obj.collectionData));

    //just one collection
    // Models[3].collectionModel.insertMany(Models[3].collectionData)

    // UserModel.insertMany(dataUser);

    // ProductModel.insertMany(dataProduct);

    // ProductStatModel.insertMany(dataProductStat);
  })
  .catch((err) => console.log(`Connection Error: ${err}, did not connect`));

//npm run dev from server folder
