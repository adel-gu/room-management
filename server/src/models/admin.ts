import crypto from 'crypto';
import mongoose, { Model, Query, Types } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { ModelsEnum, Roles } from '../utils/constants';

interface IAdmin {
  active: boolean;
  name: string;
  email: string;
  password: string;
  role: Roles;
  tenantId: Types.ObjectId;
  createdAt: Date;
  isVerified: boolean;
  salt?: string;
  image?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordToken?: string;
  passwordTokenExpires?: Date;
  verificationCode?: string;
  verificationCodeExpires?: Date;
}

interface IAdminMethods {
  checkIsPasswordCorrect(
    password: string,
    hashPassword: string,
  ): Promise<boolean>;
  generateToken(): string;
  generateVerificationToken(): string;
  checkIsTokenIssuedAfterPwdChanged(JWTTimestamp: number): boolean;
}

type AdminModelType = Model<IAdmin, {}, IAdminMethods>;

const schema = new mongoose.Schema<IAdmin, AdminModelType, IAdminMethods>({
  active: { type: Boolean, default: true, select: false },
  name: { type: String, required: [true, 'Name field is required'] },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Name field is required'],
    validate: [validator.isEmail, 'Please provide a correct email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: Roles,
    default: Roles.admin,
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    immutable: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isVerified: {
    type: Boolean,
    default: false,
    select: false,
  },
  image: String,
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm Password field is required'],
    validate: {
      validator: function (this: IAdmin, val: string): boolean {
        return this.password === val;
      },
    },
  },
  salt: { type: String, select: false },
  passwordChangedAt: Date,
  passwordToken: String,
  passwordTokenExpires: Date,
  verificationCode: String,
  verificationCodeExpires: Date,
});

schema.pre('save', async function (next) {
  if (this.isModified('password') && this.isNew) {
    this.salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password + this.salt, this.salt);
    this.passwordConfirm = undefined;
    next();
  }

  if (this.isModified('password') && !this.isNew) {
    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
  }

  next();
});

schema.pre<Query<IAdmin | IAdmin[], AdminModelType>>(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

schema.method(
  'checkIsPasswordCorrect',
  async function checkIsPasswordCorrect(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password + this.salt, hashPassword);
  },
);

schema.method('generateToken', function generateToken(): string {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
});

schema.method(
  'generateVerificationToken',
  function generateVerificationToken(): string {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    this.verificationCode = verificationCode;
    this.verificationCodeExpires = new Date(Date.now() + 5 * 60 * 1000);
    return verificationCode;
  },
);

schema.method(
  'checkIsTokenIssuedAfterPwdChanged',
  function checkIsTokenIssuedAfterPwdChanged(JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
      const passwordChanged = Math.floor(
        this.passwordChangedAt.getTime() / 1000,
      );

      return passwordChanged > JWTTimestamp;
    }
    return false;
  },
);

const Admin = mongoose.model<IAdmin, AdminModelType>(ModelsEnum.Admin, schema);
export default Admin;
