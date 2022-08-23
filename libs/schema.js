const Joi = require("joi");

const form_schema = Joi.object().keys({
  姓名: Joi.string().max(10).required(),
  性别: Joi.string().valid("男", "女").required(),
  手机: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  QQ: Joi.string()
    .pattern(/^[0-9]+$/)
    .max(11)
    .required(),
  邮箱: Joi.string().max(30).required(),
  学号: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(12)
    .required(),
  学院: Joi.string().max(30).required(),
  专业: Joi.string().max(30).required(),
  第一志愿: Joi.valid("组织策划部", "技术开发部", "科普活动部", "新闻宣传部", "对外联络部", "双创联合服务部"),
  第二志愿: Joi.valid("组织策划部", "技术开发部", "科普活动部", "新闻宣传部", "对外联络部", "双创联合服务部"),
  调剂: Joi.valid("是", "否").required(),
  自我介绍: Joi.string().min(4).max(500).required(),
});

module.exports = { form_schema };
