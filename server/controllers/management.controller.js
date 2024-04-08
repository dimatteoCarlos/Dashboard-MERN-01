//management.controller.js
import mongoose from 'mongoose';
import Models from '../models/CollectionModels.js';

export const getAdmin = async (req, res) => {
  try {
    const UserModel = Models[0].collectionModel;
    const usersAdmin = await UserModel.find({
      $or: [{ role: 'admin' }, { role: 'superadmin' }],
    }).select('-password');

    //which one is more convenient length or count...?
    const totalAdmin = usersAdmin.length;
    const totalAdminDb = await UserModel.countDocuments({
      $or: [{ role: 'admin' }, { role: 'superadmin' }],
    });

    console.log('🚀 ~ getAdmin ~ totalAdmin:', totalAdmin);

    res.status(200).json(usersAdmin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//affiliatestat data is associated to route:  management/performance
export const getAffiliateStat = async (req, res) => {
  try {
    const AffiliateStatModel = Models[5].collectionModel;

    const affiliatestat = await AffiliateStatModel.find();
    // console.log('🚀 ~ getAffiliateStat ~ affiliatestat:', affiliatestat);

    res.status(200).json(affiliatestat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//-----------------------------------------------------
export const getUserPerformance = async (req, res) => {
  try {
    const UserModel = Models[0].collectionModel;
    const TransactionsModel = Models[4].collectionModel;
    const { id } = req.params;

console.log('id:',id)
    /*en el manual de mongoose: Mongoose does not cast pipeline stages. The below will not work unless _id is a string in the database

new Aggregate([{ $match: { _id: '00000000000000000000000a' } }]); // Do this instead to cast to an ObjectId new Aggregate([{ $match: { _id: new mongoose.Types.ObjectId('00000000000000000000000a') } }]);
*/
    const idObjId = new mongoose.Types.ObjectId(`${id}`);

    const userWithStats = await UserModel.aggregate([
      { $match: { _id: idObjId } },
      {
        // {
        $lookup: {
          from: 'affiliatestats',
          localField: '_id',
          foreignField: 'userId',
          as: 'affiliateStats',
        },
      },
      //The following aggregation uses the $unwind stage to output a document for each element in the affiliateStats array:
      { $unwind: '$affiliateStats' },
    ]);

    //hacerlo con aggregation
    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return TransactionsModel.findById(id);
      })
    );

    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
