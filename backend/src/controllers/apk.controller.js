import * as settingModel from '../models/apk.model.js';

export const getSetting = async (req, res) => {
  try {
    const setting = await settingModel.getSetting(req.params.key);
    if (!setting) return res.status(404).json({ error: 'Setting not found' });
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrCreateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    const setting = await settingModel.upsertSetting(key, value);
    res.json(setting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllSettings = async (req, res) => {
  try {
    const settings = await settingModel.getAllSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};