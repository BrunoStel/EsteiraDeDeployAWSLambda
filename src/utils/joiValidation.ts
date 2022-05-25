import Joi from 'joi';

export const schemaCreatePortador = Joi.object({
    cpf: Joi.string().required(),
    name: Joi.string().required(),
    lastName: Joi.string().required()
})
