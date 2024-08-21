import Joi from "joi";

const CreateUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "É necessário enviar o email.",
    "string.email": "Email inválido.",
  }),
  password: Joi.string().required().messages({
    "any.required": "É necessário enviar a senha.",
  }),
});

const UpdateUserSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    "any.required": "É necessário enviar o email.",
    "string.email": "Email inválido.",
  }),
  password: Joi.string().optional().messages({
    "any.required": "É necessário enviar a senha.",
  }),
});

export { CreateUserSchema, UpdateUserSchema };
