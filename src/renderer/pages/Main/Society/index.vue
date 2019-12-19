<template>
    <div class='society-wrapper'>
        <div class='nav-list'>
            <div class='nav-item' style='margin-right:20px;' @click='navChange'>
                <span>HOT</span>
            </div>
            <div class='nav-item' @click='navChange'>
                <span>NEW</span>
            </div>
            <div class='isActive'></div>
        </div> 
        <div class='society-article'>
            <div class='next'>
                <i class='icon-left'></i>
            </div>
            <div class='next'>
                <i class='icon-left'></i>
            </div>
        </div>
    </div>
</template>

<script>
import anime from 'animejs'
export default {
    name:'Society',
    data(){
        return{
            isActive:1, // 1 为 HOT 2为 NEW
        }
    },
    methods:{
        // 点击Nav触发动画
        tiggerNavAnime:function(){
            const Anime = anime({
                targets:'.isActive',
                translateX:80,
                easing: 'spring(1, 80, 10, 5)'
            })
            Anime.play()
        },
        restoreNavAnime:function(){
            const Anime = anime({
                targets:'.isActive',
                translateX:0,
                easing: 'spring(1, 80, 10, 5)'
            })
            Anime.play()
        },
        // nav 点击事件
        navChange:function(){
            if(this.isActive === 1){
                this.tiggerNavAnime()
                this.isActive = 2
            }else{
                this.restoreNavAnime()
                this.isActive = 1
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// iconfont
@import '@/iconfont.scss';
.icon-like:before{
    content: '\e663';
    font-size:12px;
}
.icon-like{
    transition:all .5s ease;
}
.icon-like:hover {
    color:#fc5c65;
}
.icon-comment:before{
    content: '\e60c';
    font-size:12px;
}
.icon-comment{
    transition:all .5s ease;
}
.icon-comment:hover {
    color:#20bf6b;
}
.icon-delete:before{
    content: '\e645';
    font-size:12px;
}
.icon-delete{
    transition:all .5s ease;
}
.icon-delete:hover {
    color:#000;
}

.society-wrapper{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    background:#fff;
    .nav-list{
        display:flex;
        justify-content:flex-start;
        align—items:center;
        height:30px;
        padding:20px;
        position:relative;
        .nav-item{
            display:flex;
            justify-content:center;
            width:40px;
            padding:5px 10px;
            font-size:14px;
            font-weight:600;
            color:#303952;
            cursor:pointer;
        }
        .isActive{
            position:absolute;
            bottom:20px;
            left:25px;
            width:50px;
            height:2px;
            background:#f0932b;
            border-radius:10px;
        }
    }
    .society-article{
        padding:5px 20px;
        flex:1;
        display:flex;
        flex-direction:column;
        margin:0px 20px 10px 20px;
        border-radius:5px;
        overflow-Y:auto;
        background:gray;
    }
}
</style>