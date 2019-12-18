<template>
    <div class='create-wrapper'>
        <Header class='header-component'></Header>
        <Editor class='editor'></Editor>
    </div>
</template>

<script>
import Header from '../../../components/Header'
import Editor from '../../../components/Editor'
export default {
    name:'Create',
    data(){
        return{

        }
    },
    components:{
        Header,
        Editor
    }
}
</script>

<style lang='scss' scoped>
.create-wrapper{
    width:100%;
    height:100%;
    overflow-y:screen;
    display:flex;
    flex-direction: column;
    .header-component{
        padding:30px 0px 30px 30px;
    }
    .editor{
        flex:1;
    }
}
</style>