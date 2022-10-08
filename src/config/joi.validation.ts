import * as Joi from 'joi';

export const JoinValidationSchema = Joi.object({
  MONGODB_URL: Joi.required(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT_PAGINATION: Joi.number().default(20),
  DEFAULT_OFFSET_PAGINATION: Joi.number().default(0),
});
