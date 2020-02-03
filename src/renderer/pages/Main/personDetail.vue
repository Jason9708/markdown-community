<!-- 用户详情 -->
<template>
    <div class='personDetail-wrapper'>
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
                <span class='btn-update' v-if='showUpdateBtn'>Update</span>
                <span class='btn-follow' v-if='showFollowBtn'>Follow</span>
                <span class='btn-unflollow' v-if='showUnfollowBtn'>Unfollow</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getPersonInfo } from '../../Api/api.js'
export default {
    name:'personDetail',
    data(){
        return{
            default_headPic:require('../../assets/images/default_headPic.jpg'),
            personInfo:'',
            
            // 按钮配置
            showUpdateBtn:true,
            showFollowBtn:false,
            showUnfollowBtn:false
        }
    },
    mounted(){
        this.getPersonData()
    },
    methods:{
        getPersonData(){
            getPersonInfo(this.$route.query.id).then(res => {
                console.log(res)
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
        }
    }
}
</script>

<style lang="scss" scoped>
// iconfont
@import '@/iconfont.scss';
.icon-profession:before {
    content: '\e78e';
    font-size:16px;
}
.icon-company:before {
    content: '\e72a';
    font-size:16px;
}

.personDetail-wrapper {
    height:100%;
    background:#f4f5f5;
    display:flex;
    flex-direction:column;
    align-items:center;
    font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    .personDetail-header{
        width:70%;
        display:flex;
        justify-content:space-between;
        margin:30px;
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
}   
</style>