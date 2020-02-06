<!-- 用户详情 -->
<template>
    <div class='personDetail-wrapper' v-loading='Loading'>
        <div class='btn-return' @click='goBack'><i class='icon-return'></i></div>
        <div class='personDetail-header'>
            <!-- 左侧个人信息 -->
            <div class='personDetail-header-left'>
                <img class='avatar' :src="personInfo.avatar ? global.avatarPath + personInfo.avatar : default_headPic">
                <div class='info'>
                    <span style='margin:0 0 20px 15px;font-size:22px;font-weight:700;'>{{personInfo.nickname ? personInfo.nickname : personInfo.username}}</span>
                    <span style='margin:0 0 10px 15px;color:rgb(114, 119, 123);font-size:12px;display:flex;align-items:center'><i class='icon-profession' style='margin-right:5px;'></i>{{personInfo.profession}}</span>
                    <span style='margin:0 0 10px 15px;color:rgb(114, 119, 123);font-size:12px;display:flex;align-items:center'><i class='icon-company' style='margin-right:5px;'></i>{{personInfo.company}}</span>
                </div>
            </div>
            <div class='personDetail-header-right'>
                <span class='btn-update' v-if='showUpdateBtn' @click='goUpdate'>Update</span>
                <span class='btn-follow' v-if='showFollowBtn' @click='follow'>Follow</span>
                <span class='btn-unflollow' v-if='showUnfollowBtn' @click='unfollow'>Unfollow</span>
            </div>
        </div>
        <div class='personDetail-main'>
            <div class='personDetail-main-left'>
                <div class='personDetail-main-left-tabs'>
                    <ul>
                        <li class='tabs-item' :class="currentType === 0 ? 'tabs-item-selected' : '' " @click='changeCurrentType(0)'>全部</li>
                        <li class='tabs-item' :class="currentType === 1 ? 'tabs-item-selected' : '' " @click='changeCurrentType(1)'>随笔</li>
                        <li class='tabs-item' :class="currentType === 2 ? 'tabs-item-selected' : '' " @click='changeCurrentType(2)'>新闻</li>
                        <li class='tabs-item' :class="currentType === 3 ? 'tabs-item-selected' : '' " @click='changeCurrentType(3)'>知识</li>
                        <li class='tabs-item' :class="currentType === 4 ? 'tabs-item-selected' : '' " @click='changeCurrentType(4)'>沸点</li>
                    </ul>
                </div>
                <div class='personDetail-main-left-articleList'>
                    <div class='article-item' v-for='(item,index) in articleList' :key='index' @click='goArticleDetail(item)'> 
                        <!-- 标题 -->
                        <div class='title'>
                            {{item.title}}
                            <span class='classification'>
                            {{getClassificationDes(item.classification)}}
                            </span>
                        </div>
                        <!-- 作者 & 发布时间 -->
                        <div class='info'>
                            <span class='name'>{{item.createUserName}}</span>
                            <span class='time'>{{item.date | timeFormat}}</span>
                        </div>
                        <!-- 概要内容 -->
                        <div class='article'>
                            <img class='coverPic' v-if='item.coverPic' :src='global.articleCoverPath + item.coverPic'>
                            <span class='content'>
                                {{item.intro}}
                            </span>
                        </div>
                        <!-- 操作 -->
                        <div class='operation'>
                            <div class='operation-list'>
                                <i class='icon-like' style='margin-right:10px;cursor:pointer;'></i>
                                <i class='icon-comment' style='margin-right:10px;cursor:pointer;'></i>
                                <i class='icon-delete' style='cursor:pointer;' v-if="item.createUserId === currentLoginUserId " @click.stop='deleteArticle(item)'></i>
                            </div>
                            <div class='more' style='cursor:pointer;' @click.stop='tiggerOperationAnime(index)'>
                                <i class='icon-more'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='personDetail-main-right'>
                <div class='personDetail-main-right-top'>
                    <span style='margin:0 0 10px 0;color:rgb(114, 119, 123);font-size:12px;display:flex;align-items:center'><i class='icon-email'></i>{{personInfo.email}}</span>
                    <span style='margin:0 0 0px 0;color:rgb(114, 119, 123);font-size:12px;display:flex;align-items:center;'><i class='icon-wechat'></i>{{personInfo.wechat}}</span>
                    <!-- 用户关注 & 被关注信息 -->
                    <div class='personDetail-main-right-bottom'>
                        <div class='follow-info' @click='showFollowList'>
                            <span>Follow</span>
                            <span style='font-size:14px;font-weight:700;'>{{followList.follow ? followList.follow.length : '0'}}</span>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div class='follow-info' @click='showNoticerList'>
                            <span>Noticer</span>
                            <span style='font-size:14px;font-weight:700;'>{{followList.noticer ? followList.noticer.length : '0'}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- 弹窗 -->
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="beforeDialogClose">
                <div class='follow-list'>
                    <template v-if="dialogTitle === 'Follow'">
                        <div class='follow-item' v-for='(item, index) in followArray' :key='index' @click='goPersonDetail(item)'>
                            <img class='avatar' :src="item.avatar ? global.avatarPath + item.avatar : default_headPic">
                            <div class='info'>
                                <span style='margin:0 0 5px 15px;font-size:14px;font-weight:700;'>{{item.nickname ? item.nickname : item.username}}</span>
                                <span style='margin:0 0 2px 15px;color:rgb(114, 119, 123);font-size:11px;display:flex;align-items:center'><i class='icon-profession' style='margin-right:5px;'></i>{{item.profession}}</span>
                                <span style='margin:0 0 2px 15px;color:rgb(114, 119, 123);font-size:11px;display:flex;align-items:center'><i class='icon-company' style='margin-right:5px;'></i>{{item.company}}</span>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class='follow-item' v-for='(item, index) in noticerArray' :key='index' @click='goPersonDetail(item)'>
                            <img class='avatar' :src="item.avatar ? global.avatarPath + item.avatar : default_headPic">
                            <div class='info'>
                                <span style='margin:0 0 5px 15px;font-size:14px;font-weight:700;'>{{item.nickname ? item.nickname : item.username}}</span>
                                <span style='margin:0 0 2px 15px;color:rgb(114, 119, 123);font-size:11px;display:flex;align-items:center'><i class='icon-profession' style='margin-right:5px;'></i>{{item.profession}}</span>
                                <span style='margin:0 0 2px 15px;color:rgb(114, 119, 123);font-size:11px;display:flex;align-items:center'><i class='icon-company' style='margin-right:5px;'></i>{{item.company}}</span>
                            </div>
                        </div>
                    </template>
                </div>
        </el-dialog>
    </div>
</template>

<script>
import { getPersonInfo, getArticleListByIdAndType, getUserFollowInfo, followPerson, unfollowPerson, getFollow, getNoticer } from '../../Api/api.js'
export default {
    name:'personDetail',
    data(){
        return{
            currentLoginUserId:JSON.parse(sessionStorage.getItem('currentUserInfo'))._id,
            default_headPic:require('../../assets/images/default_headPic.jpg'),
            personInfo:'',  // 用户信息对象
            articleList:'', // 用户文章列表对象
            followList:'', // 用户关注总对象
            currentType:0,  // 当前文章列表显示类型 （默认 0）
            
            // 按钮配置
            showUpdateBtn:false,
            showFollowBtn:false,
            showUnfollowBtn:false,
            showOperation:false, // 控制更多按钮是收回 / 展开  当false时点击则展开，当true时点击则为收缩

            Loading:false,

            // 弹窗配置
            dialogVisible:false,
            followArray:[], // 关注列表
            noticerArray:[], // 被关注列表
            dialogTitle:'', // 标题

        }
    },
    mounted(){
        if(this.currentLoginUserId === this.$route.query.id){
            this.showUpdateBtn = true
        }
        this.getPersonData().then( () => {
            this.getArticleList()
            this.getUserFollow()
        })
    },
    methods:{
        goBack:function(){
            this.$router.go(-1)
        },
        goUpdate:function(){
            this.$router.push({
                path:'/profile'
            })
        },
        // 跳转详情页
        goArticleDetail:function(item){
            this.$router.push({
                path:'/detail',
                query:{
                    id:item._id
                }
            })
        },
        goPersonDetail:function(item){
            var id = item._id
            console.log('hhh')
            this.$router.push({
                path:'/personDetail',
                query:{
                    id: id
                }
            })
        },
        // 获取用户信息
        getPersonData:function(){
            return getPersonInfo(this.$route.query.id).then(res => {
                console.log('getPersonInfo:',res)
                if(res.data.code == 0){
                    this.personInfo = res.data.data
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
        // 获取用户文章列表
        getArticleList:function(){
            getArticleListByIdAndType(this.$route.query.id,this.currentType).then(res => {
                console.log('getArticleListById:',res)
                if(res.data.code == 0){
                    this.articleList = res.data.data
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
        // 获取用户关注信息
        getUserFollow:function(){
            return getUserFollowInfo(this.$route.query.id).then(res => {
                console.log('getUserFollowInfo:',res)
                if(res.data.code == 0){
                    this.followList = res.data.data
                    // 所查看的人物详情不是登录人账号时判断是否关注，若是时显示update
                    if(!this.showUpdateBtn){
                        // 已关注时显示unfollow，未关注时显示follow
                        if(this.followList.noticer.length == 0){
                            this.showFollowBtn = true
                            this.showUnfollowBtn = false
                        }else{
                            let Flag = false
                            for(let i = 0; i < this.followList.noticer.length; i++){
                                if(this.followList.noticer[i]._id === this.currentLoginUserId){
                                    Flag = true
                                }
                            }
                            if(Flag === true){
                                this.showFollowBtn = false
                                this.showUnfollowBtn = true
                            }else{
                                this.showFollowBtn = true
                                this.showUnfollowBtn = false
                            }
                        }
                    }
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
        // type  1-随笔   2-新闻   3-知识   4-沸点
        changeCurrentType(type){
            this.currentType = type
            this.getArticleList()
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
        /**
         * 文章操作逻辑
         * @tiggerOperationAnime 触发动画
         * @restoreOperationAnime 复原动画
         * @optionChange 更多图标点击事件  
         */
        tiggerOperationAnime:function(index){
            var el = document.getElementsByClassName('operation-list')[index]
            var flag
            for(let i = 0; i < el.classList.length; i++){
                if(el.classList[i] === 'show-Operationlist'){
                    flag = true
                }else{
                    flag = false
                }
            }
            if(flag){
                el.classList.remove('show-Operationlist')
            }else{
                el.classList.add('show-Operationlist')
            }
        },
        // 删除文章
        deleteArticle(item){
            deletArticleById(item._id).then(res => {
                if(res.data.code == 0){
                    this.page = 1
                    this.getArticleList()
                    var el = document.getElementsByClassName('operation-list')
                    for(let i = 0; i < el.length; i++){
                        el[i].classList.remove('show-Operationlist')
                    }
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
        // 关注：noticerId-关注人的Id | followId-被关注人的Id
        follow:function(){
            var data = {
                noticerId: this.currentLoginUserId,
                followId: this.$route.query.id
            }
            this.Loading = true
            followPerson(data).then(res => {
                this.getUserFollow().then(() => {
                    this.Loading = false
                })
            })
        },
        // 取消关注：id-操作人id | followId-被取消关注人的Id 
        unfollow:function(){
            var data = {
                id:this.currentLoginUserId,
                unfollowId:this.$route.query.id
            }
            this.Loading = true
            unfollowPerson(data).then(res => {
                this.getUserFollow().then(() => {
                    this.Loading = false
                })
            })
        },
        showFollowList:function(){
            this.dialogTitle = 'Follow'
            getFollow(this.$route.query.id).then( res => {
                console.log('getFollow:',res)
                if(res.data.code == 0){
                    this.followArray = res.data.data
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                }
                this.dialogVisible = true
            })
        },
        showNoticerList:function(){
            this.dialogTitle = 'Noticer'
            getFollow(this.$route.query.id).then( res => {
                console.log('getNoticer:',res)
                if(res.data.code == 0){
                    this.noticerArray = res.data.data
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                }
                this.dialogVisible = true
            })
        },
        // 弹窗关闭回调
        beforeDialogClose:function(){
            this.dialogTitle = ''
            this.followArray = []
            this.noticerArray = []
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
// iconfont
@import '@/iconfont.scss';
.icon-return:before {
    content: '\e63b';
    font-size:16px;
}
.icon-profession:before {
    content: '\e78e';
    font-size:16px;
}
.icon-company:before {
    content: '\e72a';
    font-size:16px;
}
.icon-email:before {
    content: '\e77e';
    margin-right:5px;
}
.icon-wechat:before {
    content: '\e6cb';
    margin-right:5px;
}
.icon-more:before{
    content: '\eb30';
    font-size:20px;
}
.icon-more{
    transition:all .5s ease;
}
.icon-more:hover {
    color:#5FA8D3;
}
.icon-like:before{
    content: '\e663';
    font-size:15px;
}
.icon-like{
    margin-left:10px;
    transition:all .2s ease;
}
.icon-like:hover {
    color:#fc5c65;
}
.icon-comment:before{
    content: '\e60c';
    font-size:15px;
}
.icon-comment{
    transition:all .2s ease;
}
.icon-comment:hover {
    color:#20bf6b;
}
.icon-delete:before{
    content: '\e645';
    font-size:15px;
}
.icon-delete{
    transition:all .2s ease;
}
.icon-delete:hover {
    color:#C9D2CA;
}

.personDetail-wrapper {
    position:relative;
    height:100%;
    background:#f4f5f5;
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:auto;
    font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    .btn-return{
        position:absolute;
        top:20px;
        left:20px;
        cursor:pointer;        
        .icon-return{
            transition:all .2s linear;
            &:hover{
                color:rgba(230, 126, 34,1.0);
            }
        }
    }
    .personDetail-header{
        width:70%;
        display:flex;
        justify-content:space-between;
        margin:30px 30px 0px 30px;
        padding:15px;
        background:#fff;
        box-shadow:0 1px 2px 0 rgba(0,0,0,.05);
        .personDetail-header-left{
            display:flex;
            align-items:center;
            .avatar{
                width:100px;
                height:100px;
            }
            .info{
                display:flex;
                flex-direction:column;
            }
        }
        .personDetail-header-right{
            display:flex;
            flex-direction:column;
            justify-content:flex-end;
            span{
                text-align:center;
                padding:5px 10px;
                margin-bottom:5px;
                border-radius:2px;
                font-size:12px;
                cursor:pointer;
                transition:all .3s linear;
            }
            .btn-update{
                border:1px solid rgba(230, 126, 34,.7);
                color:rgba(230, 126, 34,.7);
                &:hover{
                    border:1px solid rgba(230, 126, 34,1.0);
                    color:rgba(230, 126, 34,1.0);
                    background:rgba(230, 126, 34,.1);
                }
            }
            .btn-follow{
                border:1px solid rgba(39, 174, 96,.7);
                color:rgba(39, 174, 96,.7);
                &:hover{
                    border:1px solid rgba(39, 174, 96,1.0);
                    color:rgba(39, 174, 96,1.0);
                    background:rgba(39, 174, 96,.1);
                }
            }
            .btn-unflollow{
                border:1px solid rgba(192, 57, 43,.7);
                color:rgba(192, 57, 43,.7);
                &:hover{
                    border:1px solid rgba(192, 57, 43,1.0);
                    color:rgba(192, 57, 43,1.0);
                    background:rgba(192, 57, 43,.1);
                }
            }
        }
    }
    .personDetail-main{
        padding:10px 0px;
        width:73%;
        display:flex;
        justify-content:space-between;
        margin:5px;
        .personDetail-main-left{
            width:70%;
            background:#fff;
            box-shadow:0 1px 2px 0 rgba(0,0,0,.05);
            .personDetail-main-left-tabs{
                display:flex;
                padding:0 10px;
                margin-bottom:10px;
                ul{
                    margin:0;
                    padding:0;
                    display:flex;
                }
                .tabs-item{
                    color:rgb(114, 119, 123);
                    font-size:12px;
                    list-style:none;
                    padding:10px;
                    border-bottom:1px solid rgba(230, 126, 34,0);
                    cursor:pointer;
                    transition:all .1s linear;
                }
                .tabs-item-selected{
                    color:rgba(230, 126, 34,.9);
                    border-bottom:2px solid rgba(230, 126, 34,.9);
                }
            }
            .personDetail-main-left-articleList{
                flex:1;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-family:'Microsoft JhengHei';
                .article-item{
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    margin:10px 20px;
                    border-bottom:1px solid rgba(178,186,194,.15);
                    cursor:pointer;
                    width:90%;
                    transition:all .2s linear;
                    &:hover{
                        border-bottom:1px solid rgba(178,186,194,.7);
                    }
                    .title{
                        font-size:14px;
                        font-weight:700;
                        color:#303952;
                        width:400px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        display:flex;
                        align-items:center;
                        .classification{
                            margin-left:10px;
                            padding:0px 10px;
                            border-left:2px solid rgba(178,186,194,.15);
                            color:#303952;
                            font-size:10px;
                            font-weight:100;
                        }
                    }
                    .info{
                        margin-top:5px;
                        display: flex;
                        align-items:center;
                        font-size:10px;
                        font-family: 'Microsoft JhengHei',"Open Sans", Helvetica, Arial, sans-serif;
                        .name{
                            color:#303952;
                            margin-right:10px;
                        }
                        .time{
                            color:#A4AEA8;
                        }
                    }
                    .article{
                        display:flex;
                        margin-top:10px;
                        padding-bottom:15px;
                        .coverPic{
                            margin:0px 20px 0px 0px;
                            width: 100px;
                            height:60px;
                            border-radius:5px;
                        }
                        .content{
                            flex:1;
                            height:60px;
                            font-size:13px;
                            line-height: 25px;
                            color:#303231;
                            overflow: hidden;
                            text-overflow:ellipsis;
                        }
                    }
                    .operation{
                        position:absolute;
                        top:0px;
                        right:5px;
                        display: flex;
                        align-items: center;
                        .operation-list{
                            display: flex;
                            align-items:center;
                            width:0px;
                            overflow: hidden;
                            opacity:0;
                            transform:scale(0,0);
                            transition:all .3s linear;
                        }
                        .show-Operationlist{
                            opacity:1;
                            width:90px;
                            transform:scale(1,1);
                        }
                    }
                }
            }
        }
        .personDetail-main-right{
            display:flex;
            flex-direction:column;
            flex:1;
            padding:10px;
            margin-left:10px;
            height:100px;
            background:#fff;
            box-shadow:0 1px 2px 0 rgba(0,0,0,.05);
            .personDetail-main-right-top{
                display:flex;
                flex-direction:column;
            }
            .personDetail-main-right-bottom{
                display:flex;
                justify-content:space-around;
                align-items:center;
                padding-top:10px;
                margin-top:10px;
                border-top:1px solid rgba(178,186,194,.15);
                .follow-info{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    color:rgb(114, 119, 123);
                    font-size:12px;
                    cursor:pointer;
                    transition:all .2s linear;
                    &:hover{
                        color:rgba(114, 119, 123,.8);
                    }
                }
            }
        }
    }

    .follow-list{
        display:flex;
        flex-direction:column;
        .follow-item{
            display:flex;
            padding-bottom:10px;
            border-bottom:1px solid rgba(178, 186, 194, 0.15);
            cursor:pointer;
            transition:all .2s linear;
            &:hover{
                border-bottom:1px solid rgba(178, 186, 194, .7);
            }
            .avatar{
                height:60px;
                width:60px;
                border-radius:5px;
            }
            .info{
                display:flex;
                flex-direction:column;
                justify-content:space-between;
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
        }
    }
}

// 滚动条样式覆盖
.personDetail-wrapper::-webkit-scrollbar {
    width: 3px;
    margin:2px;
    height: 5px;
}
.personDetail-wrapper::-webkit-scrollbar-button {
    display: none;
}
.personDetail-wrapper::-webkit-scrollbar-track {
    background-color: transparent;
}
.personDetail-wrapper::-webkit-scrollbar-thumb {
    width: 1px;
    background: linear-gradient(to right top, #ffbe76, #f0932b);
    -webkit-border-radius: 10em;
    -moz-border-radius: 10em;
    border-radius: 10em;
}
</style>
