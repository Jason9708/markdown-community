<template>
    <div class='homepage-wrapper'>
        <!--底部背景图-->
        <div class='background-wrapper'></div>
        <div class='homepage-container'>
            <div class='logo'></div>
            <transition name='login-fade'>
                <login-component v-if='showLogin' @displayRegister='displayRegister'></login-component>
            </transition>
            <transition name='register-fade'>
                <register-component v-if='showRegister' @displayLogin='displayLogin'></register-component>
            </transition>
        </div>
    </div>
</template>

<script>
import './index'
import LoginComponent from '../../components/Login/index.vue'
import RegisterComponent from '../../components/Register/index.vue'
export default {
    name:'home-page',
    data(){
        return{
            showLogin:true,
            showRegister:false
        }
    },
    components:{
        LoginComponent,
        RegisterComponent
    },
    methods:{
        displayRegister:function(){
            this.showLogin = false;
            setTimeout( () => {
                this.showRegister = true
            },500)
        },
        displayLogin:function(){
            this.showRegister = false;
            setTimeout( () => {
                this.showLogin = true
            },500)
        }
    }
    
}
</script>

<style lang='scss'>
@import './index.scss';

</style>