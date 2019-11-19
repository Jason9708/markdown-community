<template>
    <div class='register-wrapper'>
        <div class='register-container'>
            <el-form label-position='right' :model="RegisterForm" :rules="registerRules" ref="registerForm" label-width="100px" class="register-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="registerForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="userPhone">
                    <el-input v-model="registerForm.userPhone"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registerForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="verifyCode">
                    <el-input v-model="registerForm.verifyCode">
                        <div slot='append'>获取验证码</div>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:'RegisterComponent',
    data(){
        return{
            registerForm:{
                userName:'',
                userPhone:'',
                password:'',
                verifyCode:'',
            },
            registerRules:{
                userName:[
                    { required:true,message:'请输入用户名',tigger:'blur' }
                ],
                userPhone:[
                    { required:true,message:'请输入手机号',tigger:'blur'}
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
        displayLogin:function(){
            this.$emit('displayLogin')
        }
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>