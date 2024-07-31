import mongoose, { Model, Types } from 'mongoose';
import { ModelsEnum } from '../utils/constants';

export interface ISettings {
  maxGuestsPerBooking: number;
  breakfastPrice: number;
  tenantId: Types.ObjectId;
  createdAt: Date;
}

type SettingsModelType = Model<ISettings>;

const schema = new mongoose.Schema<ISettings, SettingsModelType>({
  maxGuestsPerBooking: { type: Number, default: 10 },
  breakfastPrice: { type: Number, default: 40 },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    immutable: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const Settings = mongoose.model<ISettings, SettingsModelType>(
  ModelsEnum.Settings,
  schema,
);
export default Settings;
