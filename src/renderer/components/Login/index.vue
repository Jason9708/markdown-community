<template>
    <div class='login-wrapper'>
        <div class='plain-login'>
            <el-form label-position='right' :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" class="login-ruleForm">
                <el-form-item label="手机号或邮箱" prop="userName">
                    <el-input v-model="loginForm.userName"></el-input>
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
        <div class='button-group'>
            <div class='button-items1'>
                <div class='topLine'></div>
                <div class='rightLine'></div>
                <div class='bottomLine'></div>
                <div class='leftLine'></div>
                LOGIN
            </div>
        </div>
        <div class='special-login'>
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
                userName:'',
                password:'',
                verifyCode:'',
            },
            loginRules:{
                userName:[
                    { required:true,message:'请输入用户名',tigger:'blur' }
                ],
                password:[
                    { required:true,message:'请输入密码',tigger:'blur' }
                ],
                verifyCode:[
                    { required:true,message:'请输入验证码',tigger:'blur' }
                ]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>