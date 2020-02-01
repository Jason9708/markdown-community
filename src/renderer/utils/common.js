const avatarPath = 'http://localhost:5000/hdgc/upload/images/avatar/' // 头像地址前缀
const articleCoverPath = 'http://localhost:5000/hdgc/article/images/articleCover/' // 头像地址前缀
const markdownPicPath = 'http://localhost:5000/hdgc/article/images/markdownPic/' // 头像地址前缀


/**
 * 暴露模块，在main.js中引入并挂载到全局中
 */
export default {
    avatarPath: avatarPath,
    articleCoverPath: articleCoverPath,
    markdownPicPath: markdownPicPath
}