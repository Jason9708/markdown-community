<template>
    <div class='create-wrapper'>
        <Header class='header-component'></Header>
    </div>
</template>

<script>
import Header from '../../../components/Header'
export default {
    name:'Create',
    data(){
        return{

        }
    },
    components:{
        Header
    }
}
</script>

<style lang='scss' scoped>
.create-wrapper{
    width:100%;
    height:100%;
    overflow:screen;
    .header-component{
        padding:30px 0px 30px 30px;
    }
}
</style>