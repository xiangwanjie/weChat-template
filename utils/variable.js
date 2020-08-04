const regPhone = /^((\+86)|(86))?1[3456789]\d{9}$/; //手机号码
const regCardId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证号码
const regEamil = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ // 邮箱
const regChinese = /^[\u4e00-\u9fa5]+$/ // 中文汉字
const regLetter = /^[a-zA-Z | \.|,|?|@]+$/ // 字母
const regTrim = /(^\s*)|(\s*)$/g  // 替换前后空格

module.exports = {
  regPhone: regPhone,
  regCardId: regCardId,
  regEamil: regEamil,
  regChinese: regChinese,
  regLetter: regLetter,
  regTrim: regTrim
}