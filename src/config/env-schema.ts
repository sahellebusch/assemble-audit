import * as Joi from 'joi';
import { AppEnvs } from './constants';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(AppEnvs))
    .default(AppEnvs.Development),
  PORT: Joi.number().default(3000),
  DATABASE_HOST: Joi.string(),
  DATABASE_PORT: Joi.number(),
  DATABASE_USER: Joi.string(),
  DATABASE_PASSWORD: Joi.string(),
  DATABASE_NAME: Joi.string(),
});
