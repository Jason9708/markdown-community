<template>
    <div class='Home-wrapper'>
        <div class='Home-container'>
            <div class='container-right'>
                <!-- 右侧个人信息展示栏 -->
                <div class='information-box' v-if='isLogin' @click.stop='goPersonDetail'>
                    <!-- 搜索按钮 -->
                    <i class='icon-search' style='position:absolute;top:5px;right:5px;cursor:pointer;' @click.stop='showSearchBox = true'></i>
                    <!-- 个人主要信息：头像、昵称、签名 -->
                    <div class='main'>
                        <img class='avator' :src="userInfo.avatar ? global.avatarPath + userInfo.avatar : default_headPic"></img>
                        <div class='info'>
                            <span class='name'>{{userInfo.nickname !='' ? userInfo.nickname : userInfo.username}}</span>
                            <span class='intro'>{{userInfo.intro}}</span>
                        </div>
                    </div>
                    <!-- 个人次要信息：联系方式、职业、公司 or 学校 -->
                    <div class='subsidiary'>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-profession'></i> {{userInfo.profession}}</span>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-company'></i> {{userInfo.company}}</span>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-email'></i>{{userInfo.email}}</span>
                        <span style='display:flex;align-items:center;padding:5px;'><i class='icon-wechat'></i>{{userInfo.wechat}}</span>
                    </div>
                </div>
                <!-- 网站 -->
                <div class='internet-box' v-if='isLogin'>
                    <i class='icon-weibo' @click="userInfo.weibo !='' ? openUrl(userInfo.weibo) : ''"></i>
                    <i class='icon-internet' @click="userInfo.internet !='' ? openUrl(userInfo.internet) : ''"></i>
                    <i class='icon-github' @click="userInfo.github !='' ? openUrl(userInfo.github) : ''"></i>
                </div>
                <!-- login -->
                <div class='login-box' v-if='!isLogin && !showRegister'>
                    <img class='LOGO' src='../../assets/images/LOGO.png'>
                    <!-- 切换注册框图标按钮 -->
                    <i class='icon-register' style='position:absolute;top:10px;right:10px;cursor:pointer;color:#303952;' @click='turnRegisterClick'></i>
                    <div class='input-box'>
                        <input class='INPUT' id='username' v-model='loginInfo.username' placeholder='Username' style='margin-bottom:20px;' >
                        <input class='INPUT' id='password' v-model='loginInfo.password' type='password' placeholder='Password' >
                        <div class='BUTTON' @click='signinClcik'>
                            <el-button type="warning" :loading="btnLoading" size="mini">Login</el-button>
                        </div>
                    </div>
                </div>
                <!-- register -->
                <div class='register-box' v-if='!isLogin && showRegister'>
                    <img class='LOGO' src='../../assets/images/LOGO.png'>
                    <!-- 切换登录框图标按钮 -->
                    <i class='icon-login' style='position:absolute;top:10px;right:10px;cursor:pointer;color:#303952;' @click='turnLoginClick'></i>
                    <div class='input-box'>
                        <input class='INPUT' id='username' v-model='registerInfo.username' placeholder='Username' style='margin-bottom:20px;'>
                        <input class='INPUT' id='password' v-model='registerInfo.password' placeholder='Password' type='password'>
                        <div class='BUTTON' @click='registerClick'>
                            <el-button type="warning" :loading="btnLoading" size="mini">Register</el-button>
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
                    <div class='btn' @click="transLink('Document')">
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
        <el-divider content-position="left">Hot Article</el-divider>
        <!-- 热门文章走马灯 -->
        <div class='Home-carousel'>
            <el-carousel :interval="5000" type="card" height="250px">
                <el-carousel-item v-for="(item,index) in hotArticleList" :key="index">
                    <div class='carousel-box' @click='goArticleDetail(item)'>
                        <img :src="item.coverPic ? global.articleCoverPath + item.coverPic : default_cover ">
                        <div class='carousel-info'>
                            <span style='margin-bottom:5px;font-size:18px;font-weight:700;display:flex;align-items:center;'>{{item.title}}<span class='classification'>{{getClassificationDes(item.classification)}}</span></span>
                            <span style='font-size:11px;display:flex;align-items:center;'>
                                {{item.createUserName}}
                                <el-divider direction="vertical"></el-divider>
                                {{item.date | timeFormat}}
                                <el-divider direction="vertical"></el-divider>
                                <i class='icon-like'></i>
                                <span style='margin-left:5px;'>{{item.like}}</span>
                            </span>
                        </div>
                    </div>
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
import { userRegister, userLogin, getUserInfo, getHotArticleList } from '../../Api/api.js'
import anime from 'animejs'
export default {
    name:'Home',
    data(){
        return{
            default_headPic:require('../../assets/images/default_headPic.jpg'),
            default_cover:require('../../assets/images/default_cover.png'),
            keyWord:'', // 搜索值
            loginInfo:{
                username:'',
                password:''
            },
            registerInfo:{
                username:'',
                password:''
            },
            userInfo:{},
            hotArticleList:[], // 热门文章列表（点赞数前5位）
            doAnime:'username',

            // 显示与隐藏配置
            showSearchBox:false,
            showRegister:false,

            // 控制按钮加载
            btnLoading:false
        }
    },
    computed:{
        isLogin:function(){
            return this.$store.state.isAuthenticated
        }
    },
    mounted(){
        document.addEventListener('click',(e) => {
            let className = e.target.className
            if(className != 'search-box' && className != 'search' && className != 'icon-search'){
                this.showSearchBox = false
            }
        })
        this.getHotArticles()
        // 进入首页时若为登录状态，重新获取登录人信息
        if(this.isLogin){
            this.getLoginUserInfo()
        }
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
                case 'Document':
                    routeName = '/document'
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
         * Animie  禁用
         * @inputAnime - 输入框动画
         * @loadingAnime - 加载动画
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
        loadingAnime:function(){
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
         * @openUrl - 链接跳转
         */
         signinClcik:function(){
            // this.loadingAnime() - 禁用
            this.btnLoading = true
            userLogin(this.loginInfo).then( res => {
                if(res.data.code == 0){
                    // 获取 token 存入缓存
                    const token = res.data.token
                    window.localStorage.setItem('Token',token)
                    // 更新授权状态
                    this.$store.dispatch('setIsAuthenticated',true)
                    // 查询当前登录人信息
                    this.getLoginUserInfo()
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                    // anime.remove('.LOADING')
                }
                this.btnLoading = false
            })
         },
         registerClick:function(){
            // this.loadingAnime() - 禁用
            this.btnLoading = true
            userRegister(this.registerInfo).then( res => {
                if(res.data.code == 0){
                    this.showRegister = false
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'success',
                        duration:3000
                    });   
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    });
                }
                this.registerInfo.username = ''
                this.registerInfo.password = ''
                this.btnLoading = false
            })
         },
         turnRegisterClick:function(){
            this.showRegister = true
            this.loginInfo.username = ''
            this.loginInfo.password = ''
         },
         turnLoginClick:function(){
            this.showRegister = false
            this.registerInfo.username = ''
            this.registerInfo.password = ''
         },
         openUrl:function(url){
             window.open(url)
         },
        // 根据classification获取对应分类名  1-随笔   2-新闻   3-知识   4-沸点
        getClassificationDes:function(classification){
            switch(classification){
                case '1':
                    return '随笔'
                    break
                case '2':
                    return '新闻'
                    break
                case '3':
                    return '知识'
                    break
                case '4':
                    return '沸点'
                    break
                default:
                    return ''
            }
        },
        /**
         * 查询登陆人信息
         *  调用时携带 Token ，通过 Token 查询
         */
        getLoginUserInfo:function(){
            getUserInfo().then( res => {
               if(res.data.code == 0){
                   this.$store.dispatch('setUser',res.data.data)
                   this.userInfo = res.data.data
                   sessionStorage.setItem('currentUserInfo',JSON.stringify(this.userInfo))
               }else{
                   this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
               }
            })
        },
        /**
         * 获取热门文章列表
         */
        getHotArticles:function(){
            getHotArticleList().then( res => {
                console.log('getHotArticleList:',res)
                if(res.data.code == 0){
                    this.hotArticleList = res.data.data
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                }
            })
        },
        // 跳转人物详情
        goPersonDetail(){
            var id = JSON.parse(sessionStorage.getItem('currentUserInfo'))._id
            this.$router.push({
                path:'/personDetail',
                query:{
                    id: id
                }
            })
        },
        // 跳转文章详情页
        goArticleDetail:function(item){
            this.$router.push({
                path:'/detail',
                query:{
                    id:item._id
                }
            })
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
.icon-like:before{
    content: '\e663';
    font-size:11px;
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
                min-width:400px;
                margin-bottom:20px;
                background:#fff;
                color:#303952;
                // box-shadow:0 0 20px -6px #000;
                border-radius:5px;
                cursor:pointer;
                transition:all .2s linear;
                &:hover {
                    background:#ecf0f1;
                }
                .main{
                    padding:30px 10px 20px 10px;
                    margin:0 20px;
                    border-bottom:1px solid rgba(178,186,194,.15);
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
                        .name{
                            margin-bottom:15px;
                            font-size:18px;
                            font-weight:600;
                            letter-spacing:1px;
                        }
                        .intro{
                            font-size:11px;
                            letter-spacing:1px;
                        }
                    }
                }
                .subsidiary{
                    display:flex;
                    flex-direction:column;
                    font-size:11px;
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
                        padding:2px 20px;
                        width:150px;
                        height:20px;
                        border:0px;
                        outline:none;
                        font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
                        border-left:3px solid rgba(178,186,194,.3);
                        transition:all .5s linear;
                        &:focus{
                            border-left:3px solid rgba(243, 156, 18,.7);
                        }
                    }
                    .BUTTON{
                        margin-top:30px;
                        .el-button{
                            width:130px;
                            font-weight:normal;
                            font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
                            transition:all .3s linear;
                        }
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
                        font-weight:500;
                        padding:2px 20px;
                        width:150px;
                        height:20px;
                        border:0px;
                        outline:none;
                        font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
                        border-left:3px solid rgba(178,186,194,.3);
                        transition:all .5s linear;
                        &:focus{
                            border-left:3px solid rgba(243, 156, 18,.7);
                        }
                    }
                    .BUTTON{
                        margin-top:30px;
                        .el-button{
                            width:130px;
                            font-weight:normal;
                            font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
                            transition:all .3s linear;
                        }
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
            font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
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
        .carousel-box{
            position:relative;
            height: 100%;
            width:100%;
            transition:all .2s linear;
            &:hover{
                img{
                    filter:brightness(90%);
                }
            }
            img{
                height:100%;
                width:100%;
                border-radius:0px;
            }
            .carousel-info{
                display:flex;
                flex-direction:column;
                padding:20px 10px;
                position:absolute;
                z-index:2; 
                bottom:0px;
                left:0px;
                right:0px;
                display:flex;
                flex-direction:column;
                background:linear-gradient(to top, rgba(116, 125, 140,.2), rgba(116, 125, 140,.4));
                color:#fff;
                .classification{
                    margin-left:10px;
                    padding:0px 10px;
                    border-left:2px solid rgba(255, 255, 255,.4);
                    color:#fff;
                    font-size:10px;
                    font-weight:100;
                }
            }
        }
    }

    /deep/ .el-divider--horizontal{
        margin:0px;
        /deep/ .el-divider__text{
            background-color:#f4f5f5;
            font-size:12px;
        }
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