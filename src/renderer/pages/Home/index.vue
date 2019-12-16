<template>
    <div class='Home-wrapper'>
        <div class='Home-container'>
            <div class='container-right'>
                <!-- 右侧个人信息展示栏 -->
                <div class='information-box'>
                    <!-- 搜索按钮 -->
                    <i class='icon-search' style='position:absolute;top:5px;right:5px;cursor:pointer;' @click='showSearchBox = true'></i>
                    <!-- 个人主要信息：头像、昵称、签名 -->
                    <div class='main'>
                        <img class='avator' src='../../assets/images/default_headPic.jpg'></img>
                        <div class='info'>
                            <span class='name'>Jason</span>
                            <span class='intro'>我和我的猫还有你妈都很想你，开玩笑的，我没有猫，你也没有妈</span>
                        </div>
                    </div>
                    <!-- 个人次要信息：联系方式、职业、公司 or 学校、个人网站 -->
                    <div class='subsidiary'>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-profession'></i> 前端工程师</span>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-company'></i> 滕迅、呵里巴巴、字节眺动、蝼蚁金服</span>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-profession'></i> 1107088997@qq.com</span>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-wechat'></i> Chicago9708</span>
                    </div>
                </div>
            </div>
            <div class='container-left'>
                <!-- 左侧界面入口 -->
                <div class='btn-group'>
                    <div class='btn'>
                        <i class='icon-home'></i>
                        <span style='margin-top:10px;'>Home</span>
                    </div>
                    <div class='btn'>
                        <i class='icon-write'></i>
                        <span style='margin-top:10px;'>Edtior</span>
                    </div>
                    <div class='btn'>
                        <i class='icon-template'></i>
                        <span style='margin-top:10px;'>Article</span>
                    </div>
                    <div class='btn'>
                        <i class='icon-setting'></i>
                        <span style='margin-top:10px;'>Profile</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 热门文章走马灯 -->
        <div class='Home-carousel'>
            <el-carousel :interval="5000" type="card" height="250px">
                <el-carousel-item v-for="(item,index) in hotArticle" :key="index">
                    <img :src='item.coverPic' style='height: 100%;width:100%;'>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 搜索框 -->
        <transition name='fade'>
            <div class='search-box' v-if='showSearchBox'>
                <i class='icon-search' style='font-size:12px;padding:3px;border:1px solid #EC6F66;border-radius:50%;background:#EC6F66;'></i>
                <input type="text" class="search" v-model='keyWord' />
            </div>
        </transition>
    </div>
</template>

<script>
import hotArticle from './mock.js'
export default {
    name:'Home',
    data(){
        return{
            hotArticle:hotArticle,
            keyWord:'', // 搜索值
            showSearchBox:false, // 显示搜索框
        }
    },
    mounted(){
        document.addEventListener('click',(e) => {
            let className = e.target.className
            if(className != 'search-box' && className != 'search' && className != 'icon-search'){
                this.showSearchBox = false
            }
        })
    },
}
</script>

<style lang='scss' scoped>
// iconfont
@import '@/iconfont.scss';
.icon-profession:before {
    content: '\e78e';
    margin-right:10px;
}
.icon-company:before {
    content: '\e72a';
    margin-right:10px;
}
.icon-email:before {
    content: '\e77e';
    margin-right:10px;
}
.icon-wechat:before {
    content: '\e6cb';
    margin-right:10px;
}
.icon-home:before {
    content: '\e74e';
    font-size:40px;
}
.icon-write:before {
    content: '\e6f6';
    font-size:40px;
}
.icon-template:before {
    content: '\e768';
    font-size:40px;
}
.icon-setting:before {
    content: '\e76c';
    font-size:40px;
}
.icon-search:before {
    content: '\e7b3';
}

// css style
.Home-wrapper{
    height:100%;
    width:100%;
    background:#f4f5f5;
    position: relative;
    .Home-container{
        width:100%;
        height:310px;
        display:flex;
        .container-right{
            margin:30px;
            width:400px;
            display:flex;
            flex-direction:column;
            .information-box{
                position:relative;
                display:flex;
                flex-direction:column;
                background:linear-gradient(to right, #F3A183, #EC6F66);
                color:#fff;
                box-shadow:0 0 20px -4px #000;
                margin-bottom:20px;
                border-radius:10px;
                .main{
                    padding:30px 20px 30px 20px;
                    display:flex;
                    .avator{
                        width:80px;
                        height:80px;
                        border-radius:50%;
                        margin-right:30px;
                        box-shadow:0 0 15px -5px #000;
                    }
                    .info{
                        padding:5px 0px;
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                        .name{
                            margin-bottom:15px;
                            font-size:18px;
                            font-weight:600;
                            letter-spacing:1px;
                        }
                        .intro{
                            font-size:12px;
                            letter-spacing:1px;
                        }
                    }
                }
                .subsidiary{
                    display:flex;
                    flex-direction:column;
                    font-size:12px;
                    padding:10px 20px 20px 50px;
                }
            }
        }
        .container-left{
            flex:1;
            display:flex;
            justify-content:center;
            margin:30px;
            .btn-group{
                display:flex;
                justify-content:center;
                flex-wrap:wrap;
                width:300px;
                .btn{
                    width:100px;
                    height:100px;
                    padding:10px;
                    margin-right:20px;
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    align-items:center;
                    font-size:14px;
                    font-weight:600;
                    cursor:pointer;
                    transition-duration: .5s;
                    transition-property:color;
                    border-radius:10px;
                }
                .btn:hover {
                    background:linear-gradient(to right, #F3A183, #EC6F66);
                    color:#fff;
                    box-shadow:0 0 15px -5px #000;
                }
            }
        }
    }
    .Home-carousel{
        padding:10px 0px;
    }

    // element 
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    // 搜索框
    .search-box{
        position: absolute;
        top:20px;
        left: 50%;
        margin-left:-100px;
        padding:5px 20px 5px 10px;
        display: flex;
        align-items: center;
        height:30px;
        width:200px;
        background:#323237;
        border:1px solid #323237;
        border-radius:5px;
        box-shadow:0 0 15px -5px #000;
        color:#fff;
        font-size:$theme-font-size;
        .search{
            flex:1;
            border:0;
            padding:5px 10px;
            background: transparent;
            color:#fff;
            outline:none;
        }
    }
    // 进去/离开动画
    .fade-enter-active, .fade-leave-active {
        transition: top .3s
    }
    .fade-enter, .fade-leave-active {
        top: -50px
    }
}

</style>