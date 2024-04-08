//CollectionModels.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//specs must be aligned in the same order with data

import {
  dataUser,
  dataAffiliateStat,
  dataOverallStat,
  dataProduct,
  dataProductStat,
  dataTransaction,
} from '../data/index.js';

//dataArr in the same order according to objects order in schemaSpecsObj

const dataArr = [
  dataUser,
  dataProduct,
  dataProductStat,
  dataOverallStat,
  dataTransaction,
  dataAffiliateStat,
];

import { schemaSpecsObj as schemaSpecs } from './schemaSpecsObj.js';

//Method 00
export function capitalize(str) {
  const firstLetter = str.trim().substring(0, 1).toUpperCase();
  const restOfWord = str.trim().substring(1).toLowerCase();

  return (firstLetter + restOfWord).toUpperCase(); //doesn't matter wether capitalize or uppercase
}

const schemaOptions = { timestamps: true, versionKey: false };

//new Schema, model,
let Models = [{}];

const schemaKeyArr = Object.keys(schemaSpecs);
const schemaObjArr = Object.values(schemaSpecs);

for (let i = 0; i < schemaKeyArr.length; i++) {
  const CollectionSchema = new Schema(schemaObjArr[i], schemaOptions);
  const collectionName = capitalize(schemaKeyArr[i].split('Specs')[0]);

  // console.log(collectionName)

  Models[i] = {
    collectionModel: model(collectionName, CollectionSchema),
    collectionData: dataArr[i],
  };
}

export default Models;

/*
0 dataUser

1 dataProduct

2 dataProductStat

3 dataOverallStat

4 dataTransaction

5 dataAffiliateStat

*/
