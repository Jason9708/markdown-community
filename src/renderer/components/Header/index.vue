<template>
    <div class='header-container'>
        <div class='top'>
            <span class='greet'>Good {{currentTime}}.</span>
            <span class='name'>Chicago!</span>
        </div>
        <div class='bottom'>
            <!-- 心情选择 -->
            <div class='feeling'>
                <!-- 表情 -->
                <div class='expression' @click='extend'>
                    <i :class='currentFeel'></i>
                </div>
                <div class='expression-list'>
                    <i class='icon-smile expression-item' style='margin-right:15px;cursor:pointer;' @click="changeCurExp('smile')"></i>
                    <i class='icon-normal expression-item' style='margin-right:15px;cursor:pointer;' @click="changeCurExp('normal')"></i>
                    <i class='icon-cry expression-item' style='margin-right:5px;cursor:pointer;' @click="changeCurExp('cry')"></i>
                </div>
                <span class='tips'>How do you feel today?</span>
            </div>
            <!-- 日期 -->
            <div class='calendar'>
                <i class='icon-calendar'></i>
                <span class='time'>{{currentDate}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import anime from 'animejs'
export default {
    name:'headerComponent',
    data(){
        return{
            // 表情配置
            currentFeel:'icon-smile',
            // 日期配置
            currentTime:'',
            currentDate:''
        }
    },
    mounted(){
        this.getCurrentDate()
    },
    methods:{
        // 触发动画
        tiggerAnime:function(){
            const anime00 = anime({
                targets:'.tips',
                easing:'easeInOutExpo',
                translateX:-30,
                opacity:0,
                scale:0.5 
            })
            const anime01 = anime({
                targets:'.expression-list',
                easing:'easeInOutQuad',
                opacity:[0,1],
                width:150,  
            })
            const anime02 = anime({
                targets:'.expression-item',
                easing:'easeInOutQuad',
                opacity:[0,1],
                scale:[0.5,1],
                rotate:[180,360],   // Array 可以设定动画初始值   from 50px to 0px
            })
            anime00.play()
            anime01.play()
        },
        restoreAnime:function(){
            const anime00 = anime({
                targets:'.tips',
                easing:'easeInOutQuad',
                translateX:0,
                opacity:1,
                scale:1  
            })
            const anime01 = anime({
                targets:'.expression-list',
                easing:'easeInOutQuad',
                opacity:[1,0],
                width:0,  
            })
            const anime03 = anime({
                targets:'.expression-item',
                easing:'easeInOutQuad',
                opacity:[1,0],
                scale:[1,0.5],
                rotate:[360,180],   // Array 可以设定动画初始值   from 50px to 0px
            })
            anime00.play()
            anime01.play()
        },
        // 展开表情列表
        extend:function(){
            this.tiggerAnime()
        },
        // 更换表情
        changeCurExp:function(expression){
            this.restoreAnime()
            this.currentFeel = 'icon-' + expression
            var code
            switch(expression){
                case 'smile':
                    code = 1
                    break
                case 'normal':
                    code = 2
                    break
                case 'cry':
                    code = 3
                    break
            }
            this.$emit('getExpression',code)
        },
        // 获取当前系统时间  格式 Tue Dec 17 
        getCurrentDate(){
            let date = new Date()
            let hour = date.getHours()
            if(hour < 12){ this.currentTime = 'morning' } 
            else if (hour < 18){ this.currentTime = 'afternoon' } 
            else if (hour < 24){ this.currentTime = 'evening' } 
            this.currentDate = date.toDateString().split(" ")[1] + ' ' + date.toDateString().split(" ")[2]
        }
    }
}
</script>

<style lang="scss" scoped>
// iconfont
@import '@/iconfont.scss';
.icon-smile:before{
    content: '\e63f';
    font-size:35px;
}
.icon-normal:before{
    content: '\e8da';
    font-size:35px;
}
.icon-cry:before{
    content: '\e758';
    font-size:35px;
}
.icon-calendar:before{
    content: '\e640';
    font-size:15px;
    font-weight:bold;
}

.header-container{
    display:flex;
    flex-direction:column;
    .top{
        display:flex;
        flex-direction:column;
        font-family:"Open Sans", Helvetica, Arial, sans-serif;
        .greet{
            font-size:13px;
            color:#303952;
            font-weight:700;
            margin-bottom:5px;
        }
        .name{
            font-size:30px;
            color:#303952;
            font-weight:600;
        }
    }
    .bottom{
        display:flex;
        align-items:center;
        margin-top:20px;
        position:relative;
        .feeling{
            display:flex;
            align-items:center;
            .expression{
                display:flex;
                justify-content:center;
                align-items:center;
                padding:6px;
                border-radius:50%;
                color:#303952;
                background: #EDEDED;
                cursor:pointer;
                transition:all .2s linear;
            }
            .expression:hover {
                background:#fff;
            }
            .expression-list{
                display:flex;
                justify-content:center;
                align-items:center;
                width:0px;
                padding:5px 0;
                color:#303952;
                overflow:hidden;
            }
            .tips{
                font-family:"Open Sans", Helvetica, Arial, sans-serif;
                font-size:13px;
                color:#303952;
                font-weight:700;
                margin-left:10px;
            }
        }
        .calendar{
            position:absolute;
            left:220px;
            display:flex;
            align-items:center;
            font-family:"Open Sans", Helvetica, Arial, sans-serif;
            font-size:13px;
            color:#303952;
            font-weight:700;
            .time{
                margin-left:10px;
                display:flex;
                align-items:center;
            }
        }
    }
}
</style>