import * as userCardModel from '../models/user.model.js';

export const getUserCards = async (req, res) => {
  try {
    const cards = await userCardModel.getAllUserCards();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUserCard = async (req, res) => {
  try {
    const card = await userCardModel.createUserCard(req.body);
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUserCard = async (req, res) => {
  try {
    await userCardModel.deleteUserCard(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};