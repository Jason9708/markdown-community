<template>
    <div class='dynamic-wrapper'>
        <div class='dynamic-main'>
            <div class='dynamic-release' v-if="currentLoginUserId != ''">
                <el-input
                    type="textarea"
                    autosize
                    placeholder="发布动态，分享你的想法吧~~"
                    maxlength='1000'
                    show-word-limit
                    v-model="content">
                </el-input>
                <div class='release-footer'>
                    <el-upload
                        :action="uploadUrl"
                        list-type="picture-card"
                        :auto-upload='autoUpload'
                        :limit='limit'
                        :file-list="imgList"
                        :accept='acceptType'
                        :on-remove="handleRemove"
                        :on-change='handleChanged'
                        :on-exceed='handleExceed'>
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <button class='release-submit' :disabled="content != '' ? false : true" @click='publicDynamic'>发布</button>
                </div>
            </div>
            <!-- 动态列表 -->
            <div class='dynamic-box'>
                <div class='dynamic-list'>
                    <div class='dynamic-item' v-for='(item,index) in dynamicList' :key='index'>
                        <div style='display:flex;'>
                            <div class='left'>
                                <img class='info-userAvatar' v-if='item.createUserAvatar' :src='item.createUserAvatar ? global.avatarPath + item.createUserAvatar : default_headPic' @click='goPersonDetail(item.createUserId)'>
                                <!-- 用户姓名 公司 职业 -->
                                <div class='info-user-container'>
                                    <span class='info-user-name'>{{item.createUserName}}</span>
                                    <!-- <span class='info-user-backdrop'>
                                        <span style='width:60px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;'><i class='icon-profession' style='margin-right:5px;'></i>{{item.createUserProfession}}</span>
                                        <span style='width:60px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;'><i class='icon-company' style='margin-right:5px;'></i>{{item.createUserCompany}}</span>
                                    </span> -->
                                </div>
                            </div>
                            <div class='right'>
                                <div class='dynamic-content'>
                                    {{item.content}}
                                </div>
                                <div class='dynamic-img' v-if='item.images.length != 0'>
                                    <img class='info-img' v-for='(img,index) in item.images' :key='index' :src='global.dynamicPicPath + img'>
                                </div>
                            </div>
                        </div>
                        <div class='bottom'>
                            <div class='bottom-btn' style='border-right:2px solid rgba(61, 61, 61,.5);'><i class='icon-like' style='margin-right:5px;'></i></div>
                            <div class='bottom-btn'><i class='icon-comment' style='margin-right:5px;' @click='handleComment(index,item)'></i></div>
                            <div class='bottom-btn' v-if='item.createUserId == currentLoginUserId' style='border-left:2px solid rgba(61, 61, 61,.5);'><i class='icon-delete' style='margin-right:5px;' @click='deleteDynamicById(item)'></i></div>
                        </div>
                        <!-- 评论 -->
                        <div class='comment-box' v-if='item.showComment'>
                            <div class='mainComment-input'>
                                <img class='comment-user-avatar' :src='currentLoginUser.avatar ? global.avatarPath + currentLoginUser.avatar : default_headPic'>
                                <input class='comment-input' v-model='commentText' placeholder='输入评论...' maxlength="50"></input>
                                <button class='comment-btn'  :disabled="commentText != '' ? false : true" @click='postMainComment(item)'>
                                    send
                                </button>
                            </div>
                            <!-- 评论列表 -->
                            <div class='mainComment-list'>
                                <div class='mainComment-item' v-for='(item, index) in commentList' :key='index'>
                                    <div class='top'>
                                        <img class='comment-user-avatar' :src='item.avatar ? global.avatarPath + item.avatar : default_headPic'>
                                        <div class='comment-content'>
                                            <span style='display:flex;align-items:center;font-size:11px;cursor:pointer' @click='goPersonDetail(item.user)'>{{item.name}}<span style='font-size:10px;margin-left:10px;color:#A4AEA8;'>{{item.date | timeFormat}}</span></span>
                                            <div style='margin-top:5px;font-size:12px;'>
                                                {{item.text}}
                                            </div>
                                        </div>
                                        <div class='reply-btn' @click='openCommentDialog(item)'>
                                            回复
                                        </div>
                                    </div>
                                    <div class='sonComment-list' v-if='item.comments.length != 0'>
                                        <div class='sonComment-item' v-for='(sonItem, index) in item.comments' :key='index'>
                                            <img class='comment-user-avatar' :src='sonItem.avatar ? global.avatarPath + sonItem.avatar : default_headPic'>
                                            <div class='comment-content'>
                                                <span style='display:flex;align-items:center;font-size:11px;cursor:pointer' @click='goPersonDetail(sonItem.user)'>{{sonItem.name}}<span style='font-size:10px;margin-left:10px;color:#A4AEA8;'>{{sonItem.date | timeFormat}}</span></span>
                                                <div style='margin-top:5px;font-size:12px;'>
                                                    <span style='margin-right:5px;color:#A4AEA8;'>@{{sonItem.replyerName}}</span>{{sonItem.text}}
                                                </div>
                                            </div>
                                            <div class='reply-btn' @click='openCommentDialog(item, sonItem)'>
                                                回复
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name='toTop-fade'>
            <div class='dynamic-toTop' v-show='showToTop' @click='goToTop'>
                <i class='icon-top'></i>
            </div>
        </transition> 

        <!-- 评论弹窗 -->
        <el-dialog
            title="Reply"
            :visible.sync="showCommentDialog"
            width="30%"
            :before-close="handleCommentDialogClose">
            <textarea class='dialog-input' v-model='sonCommentText' placeholder='输入评论...' maxlength="50"></textarea>
            <button class='comment-btn' @click='postSonComment'>回复</button>
        </el-dialog>  
    </div>
</template>

<script>
import uploadImg from '../../../components/Uploadimg'
import { postDynamic, getDynamic, deleteDynamic, getDynamicComment, sendDynamicMainComment, sendDynamicSonComment } from '../../../Api/api.js'
export default {
    name:'Dynamic',
    data(){
        return{
            default_headPic:require('../../../assets/images/default_headPic.jpg'),
            currentLoginUserId:sessionStorage.getItem('currentUserInfo') ? JSON.parse(sessionStorage.getItem('currentUserInfo'))._id : '',
            currentLoginUser:sessionStorage.getItem('currentUserInfo') ? JSON.parse(sessionStorage.getItem('currentUserInfo')) : '',
            // 头像上传配置
            uploadUrl:'', // 上传地址
            acceptType:'.jpg,.jpeg,.png',
            limit:5,
            autoUpload:false,
            showFileList:false,
            imgList:[],

            dynamicList:[],
            content:'',

            // 显示回顶按钮
            showToTop:false,

            // 评论配置
            commentText:'', // 主评论内容
            sonCommentText:'', // 子评论内容
            commentList:[], // 评论列表
            currentMainCommentItem:'', // 当前主评论信息
            currentSonCommentItem:'', // 当前自评论信息
            showCommentDialog:false,
        }
    },
    components:{
        uploadImg
    },
    mounted(){
        this.getDynamicList()
        var ele = document.getElementsByClassName('dynamic-wrapper')[0]
        var self = this
        ele.addEventListener("scroll", function (e) {
            if(e.target.scrollTop > 0){
                self.showToTop = true
            }else{
                self.showToTop = false
            }
        })
    },
    methods:{
        // 上传回调
        handleChanged(file, fileList){
            this.imgList = fileList
        },
        handleRemove(fileList){
            console.log(this.imgList)
        },
        handleExceed(file){
            this.$notify({
                title: 'Tips',
                message: 'sorry，最多上传5张图片！',
                type: 'error',
                duration:3000
            })
        },
        // 回到顶部
        goToTop(){
            var ele = document.getElementsByClassName('dynamic-wrapper')[0]
            ele.scrollTop = 0
        },
        // 获取动态
        getDynamicList(){
            getDynamic().then(res => {
                console.log('获取动态列表：', res)
                if(res.data.code == 0){
                    this.dynamicList = res.data.data
                    this.dynamicList.forEach(item => {
                        this.$set(item, 'showComment', false)
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
        },
        // 跳转人物详情
        goPersonDetail(id){
            this.$router.push({
                path:'/personDetail',
                query:{
                    id: id
                }
            })
        },
        // 发布动态
        publicDynamic(){
            let data = new FormData();

            data.append('content',this.content)

            console.log(this.imgList)

            for(let i = 0; i < this.imgList.length; i++){
                data.append('files',this.imgList[i].raw)
            }

            postDynamic(data).then(res => {
                console.log('发布动态：', res)
                if(res.data.code == 0){
                    this.getDynamicList()
                    this.imgList = []
                    this.content = ''
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
        // 删除动态
        deleteDynamicById(item){
            deleteDynamic(item._id).then(res => {
                console.log('删除动态：',res)
                if(res.data.code == 0){
                    this.getDynamicList()
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
        // 控制评论显示
        handleComment(index, item){
            this.dynamicList.forEach((item, i) => {
                if(i != index){
                    item.showComment = false
                }
            })
            this.commentText = ''
            this.commentList = []
            this.dynamicList[index].showComment = !this.dynamicList[index].showComment
            if(this.dynamicList[index].showComment){
                console.log(item)
                this.getCommentList(item)
            }
        },
        // 获取评论列表
        getCommentList(item){
            return getDynamicComment(item._id).then(res => {
                console.log('获取评论列表：', res)
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
        postMainComment(item){
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
                id: item._id,
                text: this.commentText
            }

            sendDynamicMainComment(data).then( res => {
                console.log('发布动态主评论:', res)
                if(res.data.code == 0){
                    this.commentText = ''
                    this.getCommentList(item)
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
        // 控制回复按钮
        openCommentDialog(item,sonItem){
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
        handleCommentDialogClose(){
            this.sonCommentText = ''
            this.currentDynamic = ''
            this.currentMainCommentItem = ''
            this.currentSonCommentItem = ''
            this.showCommentDialog = false
        },
        postSonComment(){
            var id = this.currentMainCommentItem._id
            var data = {
                text: this.sonCommentText,
            }
            if(this.currentSonCommentItem != ''){
                data.replyerId = this.currentSonCommentItem.user
            }else{
                data.replyerId = this.currentMainCommentItem.user
            }

            sendDynamicSonComment(id,data).then(res => {
                console.log('发送动态子评论:', res)
                if(res.data.code == 0){
                    var item = {
                        _id:this.currentMainCommentItem.dynamic
                    }
                    this.getCommentList(item).then( () => {
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

<style lang="scss" scoped>
// iconfont
@import '@/iconfont.scss';
.icon-profession:before {
    content: '\e78e';
    font-size:14px;
}
.icon-company:before {
    content: '\e72a';
    font-size:14px;
}
.icon-comment:before {
    content: '\e600';
    font-size:14px;
}
.icon-like:before {
    content: '\e61e';
    font-size:14px;
}
.icon-delete:before{
    content: '\e645';
    font-size:14px;
}
.icon-top:before{
    content: '\e63c';
    font-size:14px;
}

.dynamic-wrapper {
    width:100%;
    height:100%;
    overflow:auto;
    background:#fff;
    position:relative;
    .dynamic-main{
        flex:1;
        display:flex;
        flex-direction:column;
        align-items:center;
        overflow-Y:auto;
        position: relative;
        .dynamic-release{
            display:flex;
            flex-direction:column;
            width:450px;
            padding:20px;
            margin-top:30px;
            background:rgba(61, 61, 61,.9);
            border-radius:5px;
            /deep/ .el-textarea__inner{
                color:#fff;
                font-size:12px;
                background:rgba(61, 61, 61,.5);
                resize:none;
                border-radius:2px;
                min-height:60px !important;
                max-height:300px;
                &:focus{
                    border-color:#E6A23C;
                }
            }
            /deep/ .el-input__count{
                background:transparent;
            }

            .release-footer{
                margin-top:10px;
                display:flex;
                justify-content:space-between;
                align-items:center;
                /deep/ .el-upload--picture-card{
                    background:rgba(61, 61, 61,.5);
                    line-height:55px;
                    width:50px;
                    height:50px;
                    &:hover{
                        border-color:#E6A23C;
                    }
                    &:focus{
                        border-color:#E6A23C;
                    }
                }
                /deep/ .el-upload-list--picture-card .el-upload-list__item{
                    width:50px;
                    height:50px;
                    margin-bottom:0px;
                }

                .release-submit{
                    padding:5px 20px;
                    margin-top:20px;
                    color:#fff;
                    background:#E6A23C;
                    border:0px;
                    border-radius:3px;
                    font-size:11px;
                    cursor:pointer;
                    &:disabled{
                        background:rgba(250, 130, 49,.2);
                        cursor:not-allowed
                    }
                }
            }
        }
        .dynamic-box{
            width:500px;
            margin:30px 0px;
            padding:10px 0px;
            background:rgba(61, 61, 61,.9);
            border-radius:5px;
            animation: dynamicList 1s ease-out;
            -moz-animation: dynamicList 1s ease;
            -webkit-animation: dynamicList 1s ease;
            -o-animation: dynamicList 1s ease;
            .dynamic-list{
                display:flex;
                flex-direction:column;
                .dynamic-item{
                    display:flex;
                    flex-direction:column;
                    padding:5px 10px;
                    border-bottom:2px solid rgba(61, 61, 61,1);
                    .left{
                        display:flex;
                        flex-direction:column;
                        margin:5px 0px;
                        padding:0px 10px;
                        border-right: 1px solid rgba(61, 61, 61,1);
                        .info-userAvatar{
                            width:50px;
                            height:50px;
                            cursor:pointer;
                        }
                        .info-user-container{
                            margin-top:5px;
                            color:#fff;
                            font-size:12px;
                            display:flex;
                            flex-direction:column;
                            .info-user-backdrop{
                                display:flex;
                                flex-direction:column;
                                font-size:10px;
                            }
                        }
                    }
                    .right{
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                        margin:5px 0px;
                        padding:0px 10px;
                        .dynamic-content{
                            font-size:12px;
                            color:#fff;
                            margin-bottom:10px;
                        }
                        .dynamic-img{
                            display:flex;
                            flex-wrap:wrap;
                            .info-img{
                                width:50px;
                                height:50px;
                                border-radius:0px;
                                margin-right:10px;
                                cursor:pointer;
                            }
                        }
                    }
                    .bottom{
                        display:flex;
                        align-items:center;
                        background:rgba(255, 255, 255,.2);
                        padding:5px;
                        border-radius:5px;
                        color:#fff;
                        .bottom-btn{
                            flex:1;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            cursor:pointer;
                        }
                    }
                    .comment-box{
                        margin-top:5px;
                        display:flex;
                        flex-direction:column;
                        .mainComment-input{
                            display:flex;
                            padding:5px;
                            border-radius:5px;
                            align-items:center;
                            background:rgba(255, 255, 255,.2);
                            font-size:12px;
                            .comment-user-avatar{
                                height:30px;
                                width:30px;
                                border-radius:50%;
                                margin-right:10px;
                            }
                            .comment-input{
                                flex:1;
                                height:15px;
                                padding:5px 10px;
                                border:0px;
                                border-radius:5px 0 0 5px;
                                background:rgba(61, 61, 61,.9);
                                color:#fff;
                            }
                            .comment-btn{
                                padding:7px;
                                border-radius:0 5px 5px 0;
                                border:0px;
                                color:#fff;
                                background:#E6A23C;
                                font-size:11px;
                                cursor:pointer;
                                &:disabled{
                                    background:rgba(250, 130, 49,.2);
                                    cursor:not-allowed
                                }
                            }
                        }
                        .mainComment-list{
                            margin-top:5px;
                            display:flex;
                            flex-direction:column;
                            .mainComment-item{
                                display:flex;
                                flex-direction:column;
                                margin:5px 5px 5px 40px;
                                .top{
                                    display:flex;
                                    align-item:center;
                                    .comment-user-avatar{
                                        height:30px;
                                        width:30px;
                                        border-radius:50%;
                                        margin-right:10px;
                                    }
                                    .comment-content{
                                        flex:1;
                                        display:flex;
                                        flex-direction:column;
                                        color:#fff;
                                    }
                                    .reply-btn{
                                        font-size:10px;
                                        align-self:flex-end;
                                        color:rgba(255, 255, 255,.2);
                                        cursor:pointer;
                                        transition:all .2s linear;
                                        &:hover{
                                            color:#fff;
                                        }
                                    }
                                }
                                .sonComment-list{
                                    display:flex;
                                    flex-direction:column;
                                    margin:5px 5px 5px 40px;
                                    background:rgba(255, 255, 255,.1);
                                    .sonComment-item{
                                        display:flex;
                                        padding:10px;
                                        .comment-user-avatar{
                                            height:30px;
                                            width:30px;
                                            border-radius:50%;
                                            margin-right:10px;
                                        }
                                        .comment-content{
                                            flex:1;
                                            display:flex;
                                            flex-direction:column;
                                            color:#fff;
                                        }
                                        .reply-btn{
                                            font-size:10px;
                                            align-self:flex-end;
                                            color:rgba(255, 255, 255,.2);
                                            cursor:pointer;
                                            transition:all .2s linear;
                                            &:hover{
                                                color:#fff;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }       
        }
    }
    .dynamic-toTop{
        position:fixed;
        bottom:30px;
        right:20px;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:10px;
        border-radius:50%;
        background:rgba(61, 61, 61,.5);
        color:#fff;
        transition:all .2s linear;
        cursor:pointer;
        &:hover{
            color:#000;
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
.dynamic-wrapper::-webkit-scrollbar {
    width: 3px;
    margin:2px;
    height: 5px;
}
.dynamic-wrapper::-webkit-scrollbar-button {
    display: none;
}
.dynamic-wrapper::-webkit-scrollbar-track {
    background-color: transparent;
}
.dynamic-wrapper::-webkit-scrollbar-thumb {
    width: 1px;
    background: linear-gradient(to right top, #ffbe76, #f0932b);
    -webkit-border-radius: 10em;
    -moz-border-radius: 10em;
    border-radius: 10em;
}

/deep/ .el-textarea__inner::-webkit-scrollbar {
    width: 3px;
    margin:2px;
    height: 5px;
}
/deep/ .el-textarea__inner::-webkit-scrollbar-button {
    display: none;
}
/deep/ .el-textarea__inner::-webkit-scrollbar-track {
    background-color: transparent;
}
/deep/ .el-textarea__inner::-webkit-scrollbar-thumb {
    width: 1px;
    background: linear-gradient(to right top, #f12711, #f5af19);
    -webkit-border-radius: 10em;
    -moz-border-radius: 10em;
    border-radius: 20em;
}

// 进去/离开动画
.toTop-fade-enter-active, .toTop-fade-leave-active {
    transition: all .5s;
}
.toTop-fade-enter, .toTop-fade-leave-active {
    opacity:0;
}


// 关键帧动画
@mixin keyframes($animationName) {
    @-webkit-keyframes #{$animationName} {
        @content;
    }
    @-moz-keyframes #{$animationName} {
        @content;
    }
    @-o-keyframes #{$animationName} {
        @content;
    }
    @keyframes #{$animationName} {
        @content;
    }
}
@include keyframes(dynamicList) {
    0%   { 
        transform:scaleX(0);
    }
    100% { 
        transform:scaleX(1);
    }
}
</style>