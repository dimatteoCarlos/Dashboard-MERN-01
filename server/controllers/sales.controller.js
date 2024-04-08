
//sales.controller.js

import Models from '../models/CollectionModels.js'

export const getSales = async (req, res)=>{
try {
  const OverallStatsModel=Models[3].collectionModel;

console.log('OverallStatsModel', OverallStatsModel)

const overallstats = await Models[3].collectionModel.find();

    res.status(200).json(overallstats[0])

  } catch (error) {
    res.status(404).json({message:error.message})
  }

};
