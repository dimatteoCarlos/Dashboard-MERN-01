//controllers/general.controller.js

import Models from '../models/CollectionModels.js';

const UserModel = Models[0].collectionModel;

export const getUser = async (req, res) => {
  try {
    const { params, body } = req;
    const { id } = req.params;

    const user = await UserModel.findById(id);

    res.status(200).json(user);
    
  } catch (error) {
    console.error({ error });
    res.status(404).json({ message: error.message, status: error.status });
  }
};
