<template>
    <div class='profile_wrapper'>
        <div class='profile_container'>
            <div class='avatar_setting'>
                <upload-img :uploadUrl='uploadUrl' tips='上传jpg/png文件，且不超过2Mb' :limit='limit'></upload-img>
            </div>
            <div class='info_setting'>
                <!-- 表单设置 -->
                <el-input v-model="userInfo.nickname">
                    <template slot="prepend">昵称</template>
                </el-input>
                <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入简介"
                    maxlength='100'
                    v-model="userInfo.intro">
                </el-input>
                <el-input v-model="userInfo.profession">
                    <template slot="prepend">职业</template>
                </el-input>
                <el-input v-model="userInfo.company">
                    <template slot="prepend">公司</template>
                </el-input>
                <el-input v-model="userInfo.email">
                    <template slot="prepend">邮箱</template>
                </el-input>
                <el-input v-model="userInfo.weibo">
                    <template slot="prepend">微博</template>
                </el-input>
                <el-input v-model="userInfo.github">
                    <template slot="prepend">Github</template>
                </el-input>
                <el-input v-model="userInfo.internet">
                    <template slot="prepend">个人网站</template>
                </el-input>
            </div>
            <div class='btn_group'>
                <div class='save' @click='updateClick'>
                    Submit
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from '../../../Api/api.js'
import uploadImg from '../../../components/Uploadimg'
export default {
    name:'profileSetting',
    data(){
        return{
            // 头像上传配置
            uploadUrl:'xxx', // 上传地址
            limit:1,
            // 表单数据
            userInfo:{
                nickname:'',
                intro:'',
                profession:'',
                company:'',
                email:'',
                wechat:'',
                github:'',
                internet:''
            }
        }
    },
    components:{
        uploadImg
    },
    mounted(){
        this.getLoginUserInfo()
    },
    methods:{
        /**
         * 查询登陆人信息
         *  调用时携带 Token ，通过 Token 查询
         */
        getLoginUserInfo:function(){
            getUserInfo().then( res => {
               if(res.data.code == 0){
                   this.$store.dispatch('setUser',res.data.data)
                   this.userInfo = res.data.data
               }else{
                   this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    });
               }
            })
        },
        /**
         * 更新用户信息
         *  @userInfo   表单数据
         */
        updateClick:function(){
            updateUserInfo(this.userInfo).then( res => {
                if(res.data.code == 0){
                    this.$store.dispatch('setUser',res.data.data)
                    this.$notify({
                        title: 'Tips',
                        message: '保存成功！',
                        type: 'success',
                        duration:3000
                    });
                    this.$router.push({
                        path:'/'
                    })
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.profile_wrapper{
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items:center;
    .profile_container{
        width:50%;
        padding:10px 20px;
        border-radius:5px;
        position: relative;
        .avatar_setting{
            padding-bottom:20px;
            border-bottom:2px solid #f0932b;
        }
        .info_setting{
            margin-top:10px;
            /deep/ .el-input-group{
                font-size:12px;
                margin-bottom:10px;
            }
            /deep/ .el-textarea{
                font-size:12px;
                margin-bottom:10px;
            }
            /deep/ .el-input-group__prepend{
                border:0px;
                background: #f0932b;
                color:#fff;
                width:70px;
                padding:0px;
                text-align: center;
            }
            /deep/ .el-input__inner{
                height:30px;
                line-height: 30px;
                border:0px;
            }
            /deep/ .el-textarea__inner{
                border:0px;
                resize:none;
                padding:10px 15px;
                max-height: 100px;
            }
        }
        .btn_group{
            display: flex;
            padding:10px 30px;
            .save{
                flex:1;
                display: flex;
                justify-content: center;
                align-items:center;
                font-size:14px;
                font-weight:600;
                font-family:'Microsoft JhengHei',"Open Sans", Helvetica, Arial, sans-serif;
                cursor:pointer;
                padding:5px 10px;
                color:#303952;
                border:2px solid #303952;
                border-radius:10px;
                transition:all 0.5s ease;
            }
            .save:hover {
                color:#fff;
                color:#f0932b;
                border:2px solid #f0932b;
            }
        }
    }
}
</style>