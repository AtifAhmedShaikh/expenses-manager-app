import Joi from "joi";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const usernamePattern = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,30}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Define the user schema for validation using Joi
const userRegistrationSchema = Joi.object({
  username: Joi.string()
    .min(10)
    .max(30)
    .regex(usernamePattern)
    .messages({
      "string.min": "username must have at least 10 characters",
      "string.max": "username must less then 30 characters",
      "string.pattern.base": "username must be lowercase, avoid spaces or dots",
    })
    .required(),
  email: Joi.string()
    .email()
    .regex(emailPattern)
    .messages({
      "string.email": "Invalid email address",
      "string.pattern.base": "Invalid email address",
    })
    .required(),
  password: Joi.string()
    .min(10)
    .max(30)
    .regex(passwordPattern)
    .messages({
      "string.min": "password must have at least 10 characters",
      "string.max": "password must less then 30 characters",
      "string.pattern.base": "password must have one lowercase, uppercase and digit ",
    })
    .required(),
  // organization name
  orgName: Joi.string()
    .min(5)
    .max(30)
    .messages({
      "string.min": "org name must have at least 10 characters",
      "string.max": "org name must less then 30 characters",
    })
    .required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().regex(emailPattern).required(),
  password: Joi.string().regex(passwordPattern).required(),
});

export { userRegistrationSchema, userLoginSchema };
