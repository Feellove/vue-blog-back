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
  getClasses: LOCALURL + 'classes/getClasses',
  login: LOCALURL + 'user/login'
}
module.exports = URL
