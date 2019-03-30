const BASEURL = ''
const LOCALURL = 'http://localhost:3333/'
const URL = {
  upload: LOCALURL + 'article/upload',
  getOneArticle: LOCALURL + 'article/getOneArticle',
  getArticleList: LOCALURL + 'article/getArticleList',
  addArticle: LOCALURL + 'article/addArticle',
  deleteArticle: LOCALURL + 'article/deleteArticle',
  updateArticle: LOCALURL + 'article/updateArticle',
  addClasses: LOCALURL + 'classes/addClasses',
  updateClasses: LOCALURL + 'classes/updateClasses',
  delClasses: LOCALURL + 'classes/delClasses',
  getClasses: LOCALURL + 'classes/getClasses',
  getOneClasses: LOCALURL + 'classes/getOneClasses',
  login: LOCALURL + 'user/login',
  getMessage: LOCALURL + 'message/getMessage',
  updateMessage: LOCALURL + 'message/updateMessage',
  delMessage: LOCALURL + 'message/delMessage'
}
module.exports = URL
