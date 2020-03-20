<template>
    <div class='main-wrapper'>
        <!-- 侧边栏 -->
        <div class='side-bar'>
            <img class='avator' :src="Avatar ? global.avatarPath + Avatar : default_headPic" />
            <!-- 缩小侧边栏 -->
            <div class='side-scale' @click='scale'>
                <i class='icon-left'></i>
            </div>
            <!-- 返回按钮 -->
            <div class='return-btn' @click='goBack'>
                Return
            </div>
            <!-- 菜单容器 -->
            <div class='menu-container'>
                <div class='btn' :class="$route.path === '/society'? 'active' : ''" @click="transLink('Home')">
                    <i class='icon-home'></i>
                    <span style='margin-top:10px;'>Home</span>
                </div>
                <div class='btn' :class="$route.path === '/create'? 'active' : ''" @click="transLink('Main')">
                    <i class='icon-write'></i>
                    <span style='margin-top:10px;'>Edtior</span>
                </div>
                <div class='btn' :class="$route.path === '/document'? 'active' : ''" @click="transLink('Dynamic')">
                    <i class='icon-template'></i>
                    <span style='margin-top:10px;'>Dynamic</span>
                </div>
                <div class='btn' :class="$route.path === '/profile'? 'active' : ''" @click="transLink('Profile')">
                    <i class='icon-setting'></i>
                    <span style='margin-top:10px;'>Profile</span>
                </div>
            </div>
        </div>
        <!-- 功能主界面 -->
        <div class='main-container'>
        <router-view></router-view>
        </div>
    </div> 
</template>

<script>
import anime from 'animejs'
export default {
    name:'Main',
    data(){
        return{
            default_headPic:require('../../assets/images/default_headPic.jpg'),
            // 触发anime配置
            noTigger:true,
        }
    },
    mounted(){
    },
    computed:{
        Avatar:function(){
            return this.$store.state.user.avatar
        }
    },
    methods:{
        // 触发 anime
        tiggerAnime:function(){
            const anime00 = anime({
                targets:'.side-bar',
                easing:'easeInOutQuad',
                width:150,   // Array 可以设定动画初始值   from 50px to 0px
            })
            const anime01 = anime({
                targets:'.avator',
                translateX:0,
                easing:'easeInOutQuad',
                scale:0,
                opacity:0,
                height:50
            })
            const anime02 = anime({
                targets:'.side-scale',
                translateX:-40,
                easing:'easeInOutQuad',
                rotate:-180,  // 旋转
            })
            const anime03 = anime({
                targets:'.menu-container',
                easing:'easeInOutQuad',
                width:110,   // Array 可以设定动画初始值   from 50px to 0px
            })
            const anime04 = anime({
                targets:'.btn',
                easing:'easeInOutQuad',
                scale:0.5,
                width:70,
                height:70,
            })
            anime00.play()
            anime01.play()
            anime02.play()
            anime04.play()
        },
        // 复原
        restoreAnime:function(){
            const anime00 = anime({
                targets:'.side-bar',
                easing:'easeInOutQuad',
                width:350,   // Array 可以设定动画初始值   from 50px to 0px
            })
            const anime01 = anime({
                targets:'.avator',
                translateX:0,
                easing:'easeInOutQuad',
                scale:1,
                opacity:1,
                height:80
            })
            const anime02 = anime({
                targets:'.side-scale',
                translateX:0,
                easing:'easeInOutQuad',
                rotate:0,  // 旋转
            })
            const anime03 = anime({
                targets:'.menu-container',
                easing:'easeInOutQuad',
                width:300,   // Array 可以设定动画初始值   from 50px to 0px
            })
            const anime04 = anime({
                targets:'.btn',
                easing:'easeInOutQuad',
                scale:1,
                width:100,
                height:100,
            })
            anime00.play()
            anime01.play()
            anime02.play()
            anime04.play()
        },
        // 侧边栏伸缩
        scale:function(){
            if(this.noTigger){
                this.tiggerAnime()
                this.noTigger = false
                this.$eventBus.$emit('slideStatus', false)
            }else{
                this.restoreAnime()
                this.noTigger = true
                this.$eventBus.$emit('slideStatus', true)
            }
        },
        // 侧边栏跳转
        transLink:function(route){
            var routeName = ''
            switch(route){
                case 'Home':
                    routeName = '/society'
                    break
                case 'Main':
                    routeName = '/create'
                    break
                case 'Dynamic':
                    routeName = '/dynamic'
                    break
                case 'Profile':
                    routeName = '/profile'
                    break
                default:
                    routeName = '*'
            }
            console.log(routeName)
            this.$router.push({
                path:routeName
            })
        },
        goBack:function(){
            this.$router.push({
                path:'/'
            })
        },
    }
}
</script>

<style lang="scss" scoped>
// iconfont
@import '@/iconfont.scss';
.icon-left:before{
    content: '\e744';
    font-size:15px;
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

.main-wrapper{
    display: flex;
    width:100%;
    height:100%;
    background:#f4f5f5;
    .side-bar{
        display:flex;
        flex-direction: column;
        align-items: center;
        width:350px;
        height:100%;
        position: relative;
        .avator{
            margin-top:50px;
            margin-bottom:20px;
            width:80px;
            height:80px;
            border-radius:50%;
            border:4px solid #ffbe76;
            opacity:1;
        }
        .side-scale{
            position: absolute;
            top:70px;
            right:20px;
            padding:5px 8px;
            border-radius:50%;
            color:#303952;
            background: #EDEDED;
            cursor: pointer;
            transition:all .5s ease;
        }
        .side-scale:hover {
            color:#303952;
            background: #fff;
        }
        .return-btn{
            display: flex;
            justify-content: center;
            align-items: center;
            padding:8px 20px;
            color:#303952;
            background: #EDEDED;
            font-size:14px;
            font-weight: 600;
            border-radius:5px;
            cursor: pointer;
            margin:10px 0px 20px 0px;
            transition:all .5s ease;
        }
        .return-btn:hover {
            color:#303952;
            background: #fff;
        }
        .menu-container{
            width:300px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            padding:20px;
            overflow: hidden;
            .btn{
                width:100px;
                height:100px;
                padding:10px;
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                font-size:14px;
                font-weight:600;
                cursor:pointer;
                border-radius:10px;
                margin:10px;
                color:#303952;
                transition:all .5s ease;
            }
            .active{
                background:linear-gradient(to right top, #ffbe76, #f0932b);
                color:#fff;
                box-shadow:0 0 15px -5px #000;
            }
        }
    }
    .main-container{
        flex:1;
    }
}
</style>