<template>
    <div class='articleDetail-wrapper'>
        <div class='main-container'>
            <!-- 文章简介（封面图 + 标题 + 创建者信息）-->
            <div class='article-info'>
                <img class='info-coverPic' v-if='artcileData.coverPic' :src='global.articleCoverPath + artcileData.coverPic'>
                <div class='info-container'>
                    <!-- 文章标题 + 分类 + 心情 -->
                    <div class='info-article'>
                        <span class='info-article-title'>{{artcileData.title}}<span class='info-article-classification'>{{getClassificationDes(artcileData.classification)}}</span></span>
                        <span class='info-article-date'><i :class="'icon-' + getMoodIcon(artcileData.mood)" style='margin-right:15px;color:#303952;'></i>{{artcileData.date | timeFormat}}</span>
                    </div>
                    <!-- 用户信息 -->
                    <div class='info-user'>
                        <img class='info-userAvatar' v-if='artcileData.createUserAvatar' :src='artcileData.createUserAvatar ? global.avatarPath + artcileData.createUserAvatar : default_headPic' @click='goPersonDetail(artcileData.createUserId)'>
                        <!-- 用户姓名 公司 职业 -->
                        <div class='info-user-container'>
                            <span class='info-user-name'>{{artcileData.createUserName}}</span>
                            <span class='info-user-backdrop'><i class='icon-profession' style='margin-right:5px;'></i>{{artcileData.createUserProfession}}<i class='icon-company' style='margin:0px 5px;'></i>{{artcileData.createUserCompany}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 文章内容 -->
            <div class='article-content' v-html='artcileData.content'></div>

            <!-- 评论 -->
            <div class='article-comment'>
                <div class='comment-input-container'>
                    <div class='top'>
                        <img class='comment-user-avatar' :src='currentLoginUser.avatar ? global.avatarPath + currentLoginUser.avatar : default_headPic'>
                        <textarea class='comment-input' v-model='commentText' placeholder='输入评论...' maxlength="100" @focus='textAreaFocus' @blur='textAreaBlur'></textarea>
                    </div>
                    <div class='bottom' v-if='showCommentBtn'>
                        <button class='comment-btn' @mousedown='postMainComment'>comment</button>
                    </div>
                </div>
                <div class='comment-list-container'>
                    <div class='comment-list-item' v-for='(item, index) in commentList' :key='index'>
                        <div style='display:flex;'>
                            <img class='comment-user-avatar' v-if='item.avatar' :src='item.avatar ? global.avatarPath + item.avatar : default_headPic'>
                            <div class='comment-main'>
                                <span style='display:flex;align-items:center;font-size:13px;cursor:pointer' @click='goPersonDetail(item.user)'>{{item.name}}<span style='font-size:10px;margin-left:10px;color:#A4AEA8;'>{{item.date | timeFormat}}</span></span>
                                <div class='comment-content'>{{item.text}}</div>
                            </div>
                            <div class='btn-group'>
                                <button class='comment-btn' @click='openCommentDialog(item)'>回复</button>
                            </div>
                        </div>
                        <div class='comment-son-list' v-if='item.comments.length != 0'>
                            <div class='comment-son-list-item' v-for='(sonItem, index) in item.comments' :key='index'>
                                <img class='comment-user-avatar' v-if='sonItem.avatar' :src='sonItem.avatar ? global.avatarPath + sonItem.avatar : default_headPic'>
                                <div class='comment-main'>
                                    <span style='display:flex;align-items:center;font-size:13px;cursor:pointer' @click='goPersonDetail(sonItem.user)'>{{sonItem.name}}<span style='font-size:10px;margin-left:10px;color:#A4AEA8;'>{{sonItem.date | timeFormat}}</span></span>
                                    <div class='comment-content'><span style='margin-right:5px;color:#A4AEA8;'>@{{sonItem.replyerName}}</span>{{sonItem.text}}</div>
                                </div>
                                <div class='btn-group'>
                                    <button class='comment-btn' @click='openCommentDialog(item,sonItem)'>回复</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 评论弹窗 -->
        <el-dialog
            title="Reply"
            :visible.sync="showCommentDialog"
            width="30%"
            :before-close="handleCommentDialogClose">
            <textarea class='dialog-input' v-model='sonCommentText' placeholder='输入评论...' maxlength="100"></textarea>
            <button class='comment-btn' @click='postSonComment'>回复</button>
        </el-dialog>
    </div>
</template>

<script>
import { getArticleDetail, getCommentList, sendMainComment, sendSonComment } from '../../../Api/api.js'
import marked from 'marked'
export default {
    name:'Detail',
    data(){
        return{
            default_headPic:require('../../../assets/images/default_headPic.jpg'),
            currentLoginUser:sessionStorage.getItem('currentUserInfo') ? JSON.parse(sessionStorage.getItem('currentUserInfo')) : '',
            artcileData:'',

            // 评论配置
            commentText:'', // 主评论
            showCommentBtn:false,
            commentList:'',
            showCommentDialog: false,
            sonCommentText:'', // 子评论
            currentMainCommentItem:'', // 当前主评论信息
            currentSonCommentItem:'', // 当前自评论信息
        }
    },
    mounted(){
        this.getDetailData()
        this.getComment()
    },
    methods:{
        // 获取详情
        getDetailData:function(){
            var id = this.$route.query.id
            getArticleDetail(id).then(res => {
                console.log('getArticleDetail:',res)
                if(res.data.code == 0){
                    this.artcileData = res.data.data
                    this.artcileData.content = marked(res.data.data.content)
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                }
            })
        },
        // 根据classification获取对应分类名  1-随笔   2-新闻   3-知识   4-沸点
        getClassificationDes:function(classification){
            switch(classification){
                case '1':
                    return '随笔'
                    break
                case '2':
                    return '新闻'
                    break
                case '3':
                    return '知识'
                    break
                case '4':
                    return '沸点'
                    break
                default:
                    return ''
            }
        },
        // 根据mood获取对应心情icon  1-smile  2-normal  3-cry
        getMoodIcon:function(classification){
            switch(classification){
                case '1':
                    return 'smile'
                    break
                case '2':
                    return 'normal'
                    break
                case '3':
                    return 'cry'
                    break
                default:
                    return ''
            }
        },
        goPersonDetail:function(id){
            this.$router.push({
                path:'/personDetail',
                query:{
                    id: id
                }
            })
        },
        // 获取评论
        getComment:function(){
            return getCommentList(this.$route.query.id).then(res => {
                console.log('getCommentList:',res)
                if(res.data.code == 0){
                    this.commentList = res.data.data
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                }
            })
        },
        textAreaFocus:function(){
            this.showCommentBtn = true
        },
        textAreaBlur:function($event){
            console.log($event)
            this.showCommentBtn = false
        },
        // 发布评论
        postMainComment:function(){
            if(!sessionStorage.getItem('currentUserInfo')){
                this.$notify({
                    title: 'Tips',
                    message: '评论请先登录！',
                    type: 'error',
                    duration:3000
                })
                return
            }
            var data = {
                id: this.$route.query.id,
                text: this.commentText
            }
            sendMainComment(data).then(res => {
                console.log('sendMainComment:', res)
                if(res.data.code == 0){
                    this.getComment()
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                }
                this.commentText = ''
            })
        },
        openCommentDialog:function(item,sonItem){
            if(!sessionStorage.getItem('currentUserInfo')){
                this.$notify({
                    title: 'Tips',
                    message: '评论请先登录！',
                    type: 'error',
                    duration:3000
                })
                return
            }
            
            this.currentMainCommentItem = item
            if(sonItem){
                this.currentSonCommentItem = sonItem
            }
            this.showCommentDialog = true
            console.log(this.currentMainCommentItem, this.currentSonCommentItem)
        },
        handleCommentDialogClose:function(){
            this.sonCommentText = ''
            this.currentMainCommentItem = ''
            this.currentSonCommentItem = ''
            this.showCommentDialog = false
        },
        postSonComment:function(){
            var id = this.currentMainCommentItem._id
            var data = {
                text: this.sonCommentText,
            }
            if(this.currentSonCommentItem != ''){
                data.replyerId = this.currentSonCommentItem.user
            }else{
                data.replyerId = this.currentMainCommentItem.user
            }

            sendSonComment(id,data).then(res => {
                console.log('sendSonComment:', res)
                if(res.data.code == 0){
                    this.getComment().then( () => {
                        this.handleCommentDialogClose()
                    })
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
// iconfont
@import '@/iconfont.scss';
@import './markdown.css';
.icon-smile:before{
    content: '\e63f';
    font-size:14px;
}
.icon-normal:before{
    content: '\e8da';
    font-size:14px;
}
.icon-cry:before{
    content: '\e758';
    font-size:14px;
}
.icon-profession:before {
    content: '\e78e';
    font-size:14px;
}
.icon-company:before {
    content: '\e72a';
    font-size:14px;
}


.articleDetail-wrapper{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    background:#fff;
    overflow:auto;
    .main-container{
        flex:1;
        overflow-Y:auto;
        position: relative;
        .article-info{
            margin:30px;
            .info-coverPic{
                width:100%;
                border-radius:5px 5px 0px 0px;
            }
            .info-container{
                padding:10px 10px;
                border-bottom:2px solid rgba(178,186,194,.15);
                display:flex;
                justify-content:space-between;
                align-item:center;
                .info-article{
                    display:flex;
                    flex-direction:column;
                    justify-content:space-between;
                    .info-article-title{
                        display:flex;
                        align-items:center;
                        flex-wrap:wrap;
                        font-size:18px;
                        font-weight:700;
                        color:#000;
                    }
                    .info-article-date{
                        display:flex;
                        align-items:center;
                        margin-top:5px;
                        font-size:12px;
                        color:#A4AEA8;
                    }
                    .info-article-classification{
                        margin-left:10px;
                        padding:0px 10px;
                        border-left:2px solid rgba(178,186,194,.15);
                        color:#303952;
                        font-size:10px;
                        font-weight:100;
                    }
                }
                .info-user{
                    display:flex;
                    padding:0px 15px;
                    border-left:2px solid rgba(178,186,194,.15);
                    .info-userAvatar{
                        width:50px;
                        height:50px;
                        border-radius:5px;
                        cursor:pointer;
                    }
                    .info-user-container{
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                        margin-left:10px;
                        .info-user-name{
                            font-size:14px;
                            font-weight:700;
                            color:#000;
                        }
                        .info-user-backdrop{
                            display:flex;
                            align-items:center;
                            font-size:12px;
                            color:#A4AEA8;
                        }
                    }
                }
            }
        }
        .article-content{
            margin:30px;
            font-size:14px;
        }
        .article-comment{
            margin:0 30px;
            .comment-user-avatar{
                height:30px;
                width:30px;
                border-radius:50%;
            }
            .comment-input-container{
                display:flex;
                flex-direction:column;
                padding:10px;
                background:rgb(250, 251, 252);
                .top{
                    display:flex;
                    align-items:center;
                    .comment-input{
                        margin:0 10px;
                        flex:1;
                        height:20px;
                        line-height:20px;
                        padding:10px;
                        border:1px solid rgba(178,186,194,.15);
                        border-radius:2px;
                        color: #303952;
                        outline:none;
                        resize: none;
                        transition:all .2s linear;
                        &:focus{
                            border-color:#f0932b;
                        }
                    }
                }
                .bottom{
                    margin:10px 10px 0 10px;
                    display:flex;
                    justify-content:flex-end;
                    align-items:center;
                    .comment-btn{
                        background:rgba(243, 156, 18,.6);
                        padding:5px 10px;
                        border:0px;
                        border-radius:2px;
                        color:#fff;
                        cursor:pointer;
                        transition:all .2s linear;
                        &:hover{
                            background:rgba(243, 156, 18,1.0);
                        }
                    }
                }
            }
            .comment-list-container{
                display:flex;
                flex-direction:column;
                margin:5px 0;
                .comment-list-item{
                    padding:10px;
                    border-bottom:1px solid rgba(178,186,194,.15);
                    margin:5px 30px;
                    display:flex;
                    flex-direction:column;
                    .comment-main{
                        display:flex;
                        flex-direction:column;
                        margin-left:10px;
                        flex:1;
                        margin-bottom:10px;
                        .comment-content{
                            display:flex;
                            flex-wrap:wrap;
                            margin-top:5px;
                            font-size:11px;
                        }
                    }
                    .btn-group{
                        display:flex;
                        flex-direction:column;
                        justify-content:flex-end;
                        margin-bottom:10px;
                        .comment-btn{
                            background:rgba(243, 156, 18,.6);
                            padding:3px 8px;
                            border:0px;
                            border-radius:2px;
                            color:#fff;
                            font-size:11px;
                            cursor:pointer;
                            transition:all .2s linear;
                            &:hover{
                                background:rgba(243, 156, 18,1.0);
                            }
                        }
                    }
                    .comment-son-list{
                        display:flex;
                        flex-direction:column;
                        margin-left:30px;
                        background:rgb(250, 251, 252);
                        padding:10px;
                        .comment-son-list-item{
                            display:flex;
                            padding:10px 0;
                            border-bottom:1px solid rgba(178,186,194,.15);
                            .comment-main{
                                display:flex;
                                flex-direction:column;
                                margin-left:10px;
                                flex:1;
                                .comment-content{
                                    display:flex;
                                    flex-wrap:wrap;
                                    margin-top:5px;
                                    font-size:11px;
                                }
                            }
                            .btn-group{
                                display:flex;
                                flex-direction:column;
                                justify-content:flex-end;
                                .comment-btn{
                                    background:rgba(243, 156, 18,.6);
                                    padding:3px 8px;
                                    border:0px;
                                    border-radius:2px;
                                    color:#fff;
                                    font-size:11px;
                                    cursor:pointer;
                                    transition:all .2s linear;
                                    &:hover{
                                        background:rgba(243, 156, 18,1.0);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    // 弹窗样式
    /deep/ .el-dialog{
        .el-dialog__header{
            padding:15px 15px 10px 15px;
        }
        .el-dialog__title{
            font-size:16px;
            font-weight:700;
            font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
            color:rgb(114, 119, 123);
        }
        .el-dialog__body{
            padding:10px 15px;
            display:flex;
            flex-direction:column;
        }
        .dialog-input{
            height:70px;
            padding:10px;
            border:1px solid rgba(178,186,194,.15);
            border-radius:2px;
            color: #303952;
            outline:none;
            resize: none;
            transition:all .2s linear;
            &:focus{
                border-color:#f0932b;
            }
        }
        .comment-btn{
            background:rgba(243, 156, 18,.6);
            margin-top:10px;
            padding:5px 8px;
            border:0px;
            border-radius:2px;
            color:#fff;
            font-size:11px;
            cursor:pointer;
            transition:all .2s linear;
            &:hover{
                background:rgba(243, 156, 18,1.0);
            }
        }
    }
}


// 滚动条样式覆盖
.main-container::-webkit-scrollbar {
    width: 3px;
    margin:2px;
    height: 5px;
}
.main-container::-webkit-scrollbar-button {
    display: none;
}
.main-container::-webkit-scrollbar-track {
    background-color: transparent;
}
.main-container::-webkit-scrollbar-thumb {
    width: 1px;
    background: linear-gradient(to right top, #ffbe76, #f0932b);
    -webkit-border-radius: 10em;
    -moz-border-radius: 10em;
    border-radius: 10em;
}
</style>