import Joi from "joi";

export default {
  create: Joi.object({
    postId: Joi.number().integer().required(),
    commentMessage: Joi.string().min(1).max(500).required(),
  }),
};
