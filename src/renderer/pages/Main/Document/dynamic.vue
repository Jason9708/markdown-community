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
                        <div class='left'>
                            <img class='info-userAvatar' v-if='item.createUserAvatar' :src='item.createUserAvatar ? global.avatarPath + item.createUserAvatar : default_headPic' @click='goPersonDetail(item.createUserId)'>
                            <!-- 用户姓名 公司 职业 -->
                            <div class='info-user-container'>
                                <span class='info-user-name'>{{item.createUserName}}</span>
                                <span class='info-user-backdrop'>
                                    <span style='width:60px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;'><i class='icon-profession' style='margin-right:5px;'></i>{{item.createUserProfession}}</span>
                                    <span style='width:60px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;'><i class='icon-company' style='margin-right:5px;'></i>{{item.createUserCompany}}</span>
                                </span>
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
                </div>
            </div>
        </div>
        <!-- 发布动态 -->
    </div>
</template>

<script>
import uploadImg from '../../../components/Uploadimg'
import { postDynamic, getDynamic } from '../../../Api/api.js'
export default {
    name:'Dynamic',
    data(){
        return{
            default_headPic:require('../../../assets/images/default_headPic.jpg'),
            currentLoginUserId:sessionStorage.getItem('currentUserInfo') ? JSON.parse(sessionStorage.getItem('currentUserInfo'))._id : '',
            content:'',
            // 头像上传配置
            uploadUrl:'', // 上传地址
            acceptType:'.jpg,.jpeg,.png',
            limit:5,
            autoUpload:false,
            showFileList:false,
            imgList:[],

            dynamicList:[],
        }
    },
    components:{
        uploadImg
    },
    mounted(){
        this.getDynamicList()
    },
    methods:{
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
        // 获取动态
        getDynamicList(){
            getDynamic().then(res => {
                console.log('获取动态列表：', res)
                if(res.data.code == 0){
                    this.dynamicList = res.data.data
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

.dynamic-wrapper {
    width:100%;
    height:100%;
    overflow:auto;
    background:#fff;
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
            animation: dynamicList 1s ease-out;
            -moz-animation: dynamicList 1s ease;
            -webkit-animation: dynamicList 1s ease;
            -o-animation: dynamicList 1s ease;
            .dynamic-list{
                display:flex;
                flex-direction:column;
                .dynamic-item{
                    display:flex;
                    margin:10px 20px;
                    border-bottom:2px solid rgba(61, 61, 61,1);
                    .left{
                        display:flex;
                        flex-direction:column;
                        margin:10px 0px;
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
                        margin:10px 0px;
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
                }
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