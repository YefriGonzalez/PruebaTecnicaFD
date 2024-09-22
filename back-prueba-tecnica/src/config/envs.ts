import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  SECRET_KEY: string;
  JWT_SECRET:string;
  IV:string
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    SECRET_KEY: joi.string().required(),
    IV: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown();

const { error, value } = envVarsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  secretKey: envVars.SECRET_KEY,
  jwtSecret:envVars.JWT_SECRET,
  ivKey:envVars.IV
};
