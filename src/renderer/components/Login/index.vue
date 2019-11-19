<template>
    <div class='login-wrapper'>
        <div class='plain-login-container'>
            <div class='plain-login'>
                <el-form label-position='right' :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" class="login-ruleForm">
                    <el-form-item label="手机号或邮箱" prop="account">
                        <el-input v-model="loginForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="verifyCode">
                        <el-input v-model="loginForm.verifyCode">
                            <div slot='append'>获取验证码</div>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class='btn-group'>
                <div class='btn-items login-btn'>
                    登录
                </div>
                <div class='btn-items register-btn' @click='displayRegister'>
                    注册
                </div>
            </div>
        </div>
        <div class='special-login-container'>
            <div class='left'>
                第三方登录：
            </div>
            <div class='right'>
                <i class='icon-wechat-logo'></i>
            </div>
        </div>
    </div>
</template>

<script>
import './index.js'
export default {
    name:'LoginComponent',
    data(){
        return{
            loginForm:{
                account:'',
                password:'',
                verifyCode:'',
            },
            loginRules:{
                account:[
                    { required:true,message:'请输入账号',tigger:'blur' }
                ],
                password:[
                    { required:true,message:'请输入密码',tigger:'blur' }
                ],
                verifyCode:[
                    { required:true,message:'请输入验证码',tigger:'blur' }
                ]
            }
        }
    },
    methods:{
        displayRegister:function(){
            this.$emit('displayRegister')
        }
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>