import Joi, { LanguageMessages, string } from 'joi';

export class Validator {
    // Validate score object
    static addScore = Joi.object({
        score: Joi.number().required(),
        name: Joi.string().required()
    }).options({ abortEarly: false });
}