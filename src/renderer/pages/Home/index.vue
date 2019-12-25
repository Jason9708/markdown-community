<template>
    <div class='Home-wrapper'>
        <div class='Home-container'>
            <div class='container-right'>
                <!-- 右侧个人信息展示栏 -->
                <div class='information-box' v-if='isLogin'>
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
                    <!-- 个人次要信息：联系方式、职业、公司 or 学校 -->
                    <div class='subsidiary'>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-profession'></i> 前端工程师</span>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-company'></i> 滕迅、呵里巴巴、字节眺动、蝼蚁金服</span>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-profession'></i> 1107088997@qq.com</span>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-wechat'></i> Chicago9708</span>
                    </div>
                </div>
                <!-- 网站 -->
                <div class='internet-box' v-if='isLogin'>
                    <i class='icon-weibo'></i>
                    <i class='icon-internet'></i>
                    <i class='icon-github'></i>
                </div>
                <!-- login -->
                <div class='login-box' v-if='!isLogin && !showRegister'>
                    <img class='LOGO' src='../../assets/images/LOGO.png'>
                    <!-- 切换注册框图标按钮 -->
                    <i class='icon-register' style='position:absolute;top:10px;right:10px;cursor:pointer;color:#303952;' @click='turnRegisterClick'></i>
                    <div class='input-box'>
                        <!-- 动态线 -->
                        <div class='dynamicLine'></div>
                        <input class='INPUT' id='username' v-model='loginInfo.username' placeholder='username' style='margin-bottom:10px;' @click.stop='inputAnime'>
                        <input class='INPUT' id='password' v-model='loginInfo.password'  @click.stop='inputAnime' placeholder='password' >
                        <div class='BUTTON' @click='signinClcik'>
                            <div class='LOADING'>
                                <!-- 遮罩物 -->
                                <div class='hide'>
                                </div>
                            </div>
                            <div class='word'>SIGN IN</div>
                        </div>
                    </div>
                </div>
                <!-- register -->
                <div class='register-box' v-if='!isLogin && showRegister'>
                    <img class='LOGO' src='../../assets/images/LOGO.png'>
                    <!-- 切换登录框图标按钮 -->
                    <i class='icon-login' style='position:absolute;top:10px;right:10px;cursor:pointer;color:#303952;' @click='turnLoginClick'></i>
                    <div class='input-box'>
                        <!-- 动态线 -->
                        <div class='dynamicLine'></div>
                        <input class='INPUT' id='username' v-model='registerInfo.username' placeholder='username' style='margin-bottom:10px;' @click.stop='inputAnime'>
                        <input class='INPUT' id='password' v-model='registerInfo.password'  @click.stop='inputAnime' placeholder='password' >
                        <div class='BUTTON' @click='registerClick'>
                            <div class='LOADING'>
                                <!-- 遮罩物 -->
                                <div class='hide'>
                                </div>
                            </div>
                            <div class='word'>REGISTER</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='container-left'>
                <!-- 右侧界面入口 -->
                <div class='btn-group'>
                    <div class='btn' @click="transLink('Home')">
                        <i class='icon-home'></i>
                        <span style='margin-top:10px;'>Home</span>
                    </div>
                    <div class='btn' @click="transLink('Main')">
                        <i class='icon-write'></i>
                        <span style='margin-top:10px;'>Edtior</span>
                    </div>
                    <div class='btn' @click="transLink('Home')">
                        <i class='icon-template'></i>
                        <span style='margin-top:10px;'>Document</span>
                    </div>
                    <div class='btn' @click="transLink('Profile')">
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
import anime from 'animejs'
export default {
    name:'Home',
    data(){
        return{
            hotArticle:hotArticle,
            keyWord:'', // 搜索值
            loginInfo:{
                username:'',
                password:''
            },
            registerInfo:{
                username:'',
                password:''
            },
            doAnime:'username',

            // 显示与隐藏配置
            showSearchBox:false,
            isLogin:false,
            showRegister:false,
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
    methods:{
        /**
         *  路由跳转
         *  @route 路由路径名
         */
        transLink:function(route){
            var routeName = ''
            switch(route){
                case 'Home':
                    routeName = '/society'
                    break
                case 'Main':
                    routeName = '/create'
                    break
                case 'Profile':
                    routeName = '/profile'
                    break
                default:
                    routeName = '*'
            }
            this.$router.push({
                path:routeName
            })
        },
        /**
         * Animie 
         * @inputAnime - 输入框动画
         * @signinAnime - 登录按钮动画
         */
        inputAnime:function(e){
            var current = null;
            if(e.target.id == 'password' && this.doAnime == 'username') {
                if (current) current.pause();
                current = anime({
                    targets: '.dynamicLine',
                    keyframes: [
                        {
                            translateX:150,
                            width:3,
                        },
                        {   
                            height:40,
                        },
                        {
                            height:3,
                            translateY:40
                        },
                        {
                            translateX:0,
                            width:150
                        }
                    ],
                    duration: 500,
                    easing: 'linear'
                });
                this.doAnime = 'password'
                current.play()
            }
            if(e.target.id == 'username' && this.doAnime == 'password') {
                if (current) current.pause();
                current = anime({
                    targets: '.dynamicLine',
                    keyframes: [
                        {
                            translateX:150,
                            width:3,
                        },
                        {   
                            height:40,
                            translateY:0
                        },
                        {
                            height:3,
                        },
                        {
                            translateX:0,
                            width:150
                        }
                    ],
                    duration: 500,
                    easing: 'linear'
                });
                this.doAnime = 'username'
                current.play()
            }
        },
        signinAnime:function(){
            const Anime = anime({
                targets:'.LOADING',
                rotate:[0,360],
                loop: true,
                borderColor:['#ffbe76','#e67e22'],
                easing: 'linear',
                direction: 'alternate',
                opacity:1,
            })
            Anime.play()
        },
        /**
         * Click 
         * @signinClcik - 登录点击事件
         * @registerClick - 注册点击事件
         */
         signinClcik:function(){
            this.signinAnime()
            setTimeout(() => {
                this.isLogin = true
            },2000)
         },
         registerClick:function(){
            this.signinAnime()
            setTimeout(() => {
                this.isLogin = true
            },2000)
         },
         turnRegisterClick:function(){
            this.showRegister = true
         },
         turnLoginClick:function(){
            this.showRegister = false
         }
    }
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
.icon-weibo:before {
    content: '\e61f';
    display:block;
    margin:10px 5px;
    font-size:15px;
    cursor:pointer;
    color:#303952;
}
.icon-internet:before {
    content: '\e6f5';
    display:block;
    margin:10px 5px;
    font-size:15px;
    cursor:pointer;
    color:#303952;
}
.icon-github:before {
    content: '\e709';
    display:block;
    margin:10px 5px;
    font-size:15px;
    cursor:pointer;
    color:#303952;
}
.icon-register:before {
    content: '\e71c';
    font-size:18px;
}
.icon-login:before {
    content: '\e63a';
    font-size:17px;
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
            margin:50px 20px 30px 50px;
            width:500px;
            display:flex;
            align-items:center;
            .information-box{
                position:relative;
                display:flex;
                flex-direction:column;
                background:linear-gradient(to right top, #ffbe76, #f0932b);
                color:#fff;
                box-shadow:0 0 20px -6px #000;
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
                        flex:1;
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
            .login-box{
                display:flex;
                position:relative;
                align-items:center;
                width:100%;
                height:100%;
                background:#fff;
                border-radius:10px;
                .LOGO{
                    width:200px;
                    height:200px;
                }
                .input-box{
                    flex:1;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    position:relative;
                    .dynamicLine{
                        position:absolute;
                        top:30px;
                        left:70px;
                        width:150px;
                        height:3px;
                        background:linear-gradient(to right, #ffbe76, #f0932b);
                        border-radius:5px;
                    }
                    .INPUT{
                        color:#303952;
                        font-size:12px;
                        font-weight:600;
                        padding:5px 20px;
                        width:150px;
                        height:20px;
                        border:0px;
                        outline:none;
                    }
                    .BUTTON{
                        margin-top:30px;
                        position: relative;
                        display: flex;
                        flex-wrap:wrap;
                        justify-content: center;
                        align-items: center;
                        width:150px;
                        height:30px;
                        color:#ffbe76;
                        cursor:pointer;
                        transition:all .5s ease;
                        .word{
                            position: absolute;
                            font-size:14px;
                            font-weight:600;
                            font-family:'Microsoft JhengHei',"Open Sans", Helvetica, Arial, sans-serif;
                            letter-spacing:1px;
                            z-index:2;
                        }
                        .LOADING{
                            position:absolute;
                            top:7px;
                            left:20px;
                            width:12px;
                            height:12px;
                            border-radius:50%;
                            border:2px solid #ffbe76;
                            opacity:0;
                            .hide{
                                position:absolute;
                                top:2.5px;
                                left:-2px;
                                width:20px;
                                height:5px;
                                background:#fff;
                            }
                            
                        }
                    }
                    .BUTTON:hover {
                        color:#f0932b;
                    }
                }
            }
            .register-box{
                display:flex;
                align-items:center;
                position:relative;
                width:100%;
                height:100%;
                background:#fff;
                border-radius:10px;
                .LOGO{
                    width:200px;
                    height:200px;
                }
                .input-box{
                    flex:1;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    position:relative;
                    .dynamicLine{
                        position:absolute;
                        top:30px;
                        left:70px;
                        width:150px;
                        height:3px;
                        background:linear-gradient(to right, #ffbe76, #f0932b);
                        border-radius:5px;
                    }
                    .INPUT{
                        color:#303952;
                        font-size:12px;
                        font-weight:600;
                        padding:5px 20px;
                        width:150px;
                        height:20px;
                        border:0px;
                        outline:none;
                    }
                    .BUTTON{
                        margin-top:30px;
                        position: relative;
                        display: flex;
                        flex-wrap:wrap;
                        justify-content: center;
                        align-items: center;
                        width:150px;
                        height:30px;
                        color:#ffbe76;
                        cursor:pointer;
                        transition:all .5s ease;
                        .word{
                            position: absolute;
                            font-size:14px;
                            font-weight:600;
                            font-family:'Microsoft JhengHei',"Open Sans", Helvetica, Arial, sans-serif;
                            letter-spacing:1px;
                            z-index:2;
                        }
                        .LOADING{
                            position:absolute;
                            top:7px;
                            left:15px;
                            width:12px;
                            height:12px;
                            border-radius:50%;
                            border:2px solid #ffbe76;
                            opacity:0;
                            .hide{
                                position:absolute;
                                top:2.5px;
                                left:-2px;
                                width:20px;
                                height:5px;
                                background:#fff;
                            }
                            
                        }
                    }
                    .BUTTON:hover {
                        color:#f0932b;
                    }
                }
            }
            .internet-box{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                height:100px;
                margin-left:15px;
                background:#fff;
                border-radius:8px;
                box-shadow:0 0 10px -10px #000;
                padding:10px;
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
                    color:#303952;
                }
                .btn:hover {
                    background:linear-gradient(to right top, #ffbe76, #f0932b);
                    color:#fff;
                    box-shadow:0 0 15px -5px #000;
                }
            }
        }
    }
    .Home-carousel{
        padding:30px 0px 20px 0px;
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
        opacity:0.9;
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
        transition: all .5s;
    }
    .fade-enter, .fade-leave-active {
        top: -50px;
        opacity:0;
    }
}

</style>