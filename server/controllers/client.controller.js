//client.controller.js


import Models from '../models/CollectionModels.js';

import { groupCount } from '../functions/groupCount.js';

import getCountryISO3 from 'country-iso-2-to-3';

// import getCountryIso3 from "country-iso-2-to-3";

/******PRODUCTS*****/
//1 dataProduct
//2 dataProductStat

export const getProducts = async (req, res) => {
  try {
    const ProductModel = Models[1].collectionModel;
    const ProductStatModel = Models[2].collectionModel;

    const products = await ProductModel.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStatModel.find({ productId: product._id });

        console.log('mongodb gives you _doc when using promise.all:', {
          ...product._doc,
          stat,
        });

        return {
          ...product._doc,
          stat,
          //mongodb gives you _doc when using promise.all
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    console.error({ error });
    res.status(404).json({ message: error.message, status: error.status });
  }
};

/******CUSTOMERS*****/
//0 dataUser

export const getCustomers = async (req, res) => {
  try {
    const CustomersModel = Models[0].collectionModel;
    const customers = await CustomersModel.find({ role: 'user' });
    
    const totalCustomers = customers.length;
    const totalUsers = await CustomersModel.countDocuments();

    console.log(`...found ${totalCustomers} customers of ${totalUsers} users`);

    res.status(200).json(customers);
  } catch (error) {
    console.error({ error });
    res.status(404).json({ message: error.message });
  }
};

/******TRANSACTIONS*****/
//4 dataTransactions

const TransactionsModel = Models[4].collectionModel;

// console.log('🚀 ~ getTransactions ~ TransactionsModel:', TransactionsModel);

export const getTransactions = async (req, res) => {
  try {
    //Search and Server Side Pagination
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 0, pageSize = 20, sort = null, search = '' } = req.query;

    // formatted sort should look like { userId: -1 }

    const formatSortQuery = () => {
      const sortParsed = JSON.parse(sort);
      const formattedSort = {
        [sortParsed.field]: (sortParsed.sort = 'asc' ? 1 : -1),
      };

      return formattedSort;
    };

    const formattedSort = Boolean(sort) ? formatSortQuery() : {};

    const transactions = await TransactionsModel.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(formattedSort)
      .skip(page * pageSize)
      .limit(pageSize);

    const totalTransactions = await TransactionsModel.countDocuments({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    });

    // const totalTransactions = await TransactionsModel.countDocuments({
    //   name:{ $regex: search, $options: 'i' },
    // }); //verificar esto!!!!

    console.log('🚀getTransactions:', 'of', totalTransactions);

    //**************************/
    res.status(200).json({ transactions, totalTransactions });
  } catch (error) {
    console.error({ error });
    res.status(404).json({ error: error.message });
  }
};

/******GEOGRAPHY*****/
//0 dataUser

export const getGeography = async (req, res) => {
  try {
    const UsersModel = Models[0].collectionModel;

    //get all the users
    const criterium = {};
    // const criterium = { role: 'superadmin' };

    const allUsers = await UsersModel.find(criterium).select('-password');
    //--count the users and group them by country
    const mappedLocations = groupCount(allUsers, 'country');

    console.log('🚀 ~ getGeography ~ mappedLocations:', mappedLocations);

    //to match the data format required by Nivo choropleth, the object obtained must be converted into an array of objects: [{"id":country-iso-3, "value":value}]

    const arrayOfObjects = Object.entries(mappedLocations).map(
      ([key, value]) => {
        //convert country iso 2 to iso 3
        return { id: getCountryISO3(key), value };
      }
    );

    console.log('🚀 ~ arrayOfObjects ~ arrayOfObjects:', arrayOfObjects);

    res.status(200).json(arrayOfObjects);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
