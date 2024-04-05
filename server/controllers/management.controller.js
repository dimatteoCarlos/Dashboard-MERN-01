//management.controller.js

import Models from '../models/CollectionModels.js';

export  const getAdmin = async (req, res) => {
  try {
    const UserModel = Models[0].collectionModel;
    const usersAdmin = await UserModel.find({
      $or: [{ role: "admin" }, { role: "superadmin" }]
    }).select("-password");

    //which one is more convenient length or count...?
    const totalAdmin = usersAdmin.length;
    const totalAdminDb = await UserModel.countDocuments({
      $or: [{ role: 'admin' }, { role: 'superadmin' }],
    });

    console.log('🚀 ~ getAdmin ~ totalAdmin:', totalAdmin);

    res.status(200).json( usersAdmin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//affiliatestat data is associated to route:  management/performance
export const getAffiliateStat=async(req, res)=>{
try {
  const AffiliateStatModel= Models[5].collectionModel;

  const affiliatestat=await AffiliateStatModel.find()
  console.log("🚀 ~ getAffiliateStat ~ affiliatestat:", affiliatestat)

  res.status(200).json(affiliatestat)


} catch (error) {
  res.status(404).json({message:error.message})
}




}