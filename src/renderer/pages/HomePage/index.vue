<template>
    <div class='homepage-wrapper'>
        <!--底部背景图-->
        <div class='background-wrapper'></div>
        <div class='homepage-container'>
            <div class='logo'></div>
            <login-component></login-component>
        </div>
    </div>
</template>

<script>
import './index';
import LoginComponent from '../../components/Login/index.vue'
export default {
    name:'home-page',
    data(){
        return{

        }
    },
    components:{
        LoginComponent
    }
}
</script>

<style lang='scss'>
@import './index.scss';

</style>