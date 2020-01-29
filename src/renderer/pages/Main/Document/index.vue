<template>
    <div class='document-wrapper'>
        <div class='main-container'>
            <!--上一页-->
            <div class='PREV' @click='Prev'>
                <i class='icon-left'></i>
            </div>
            <!--下一页-->
            <div class='NEXT' @click='Next'>
                <i class='icon-right'></i>
            </div>
            <!-- 文章列表 -->
            <!-- 文章列表 -->
            <div class='article-list'>
                <div class='article-item' v-for='(item,index) in 2' :key='index'> 
                    <!-- 标题 -->
                    <div class='title'>
                        你经历过哪些比较有意思的心理效应或现象？
                    </div>
                    <!-- 作者 & 发布时间 -->
                    <div class='info'>
                        <span class='name'>CHICAGO</span>
                        <span class='time'>2019 12 23</span>
                    </div>
                    <!-- 概要内容 -->
                    <div class='article'>
                        <img class='coverPic' src='../../../assets/images/mock/1.jpg'>
                        <span class='content'>
                            人类对世界的理解是漫长的过程，我们很难还原最初的人类先民看到星空时，会有怎样的反应。但无疑许多原始的表现会长时间伴随着我们的演化，决定我们对外在世界的观感，例如星空：它们可能并不浪漫，而是代表了原始的恐惧。
                        </span>
                    </div>
                    <!-- 操作 -->
                    <div class='operation'>
                        <div class='operation-list'>
                            <i class='icon-like' style='margin-right:10px;cursor:pointer;'></i>
                            <i class='icon-comment' style='margin-right:10px;cursor:pointer;'></i>
                            <i class='icon-delete' style='cursor:pointer;'></i>
                        </div>
                        <div class='more' style='cursor:pointer;' @click='tiggerOperationAnime(index)'>
                            <i class='icon-more'></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import anime from 'animejs'
export default {
    name:'Document',
    data(){
        return{
            showOperation:false, // 控制更多按钮是收回 / 展开  当false时点击则展开，当true时点击则为收缩
            // 上下页 按钮配置
            prev:'left',
            next:'right'
        }
    },
    methods:{
        /**
         * 文章操作逻辑
         * @Prev 上一页点击事件
         * @Next 下一页点击事件  
         */
        Prev:function(){
        },
        Next:function(){
        },
        /**
         * 文章操作逻辑
         * @tiggerOperationAnime 触发动画
         * @restoreOperationAnime 复原动画
         * @optionChange 更多图标点击事件  
         */
        tiggerOperationAnime:function(index){
            var el = document.getElementsByClassName('operation-list')[index]
            console.log(el.classList)
            var flag
            for(let i = 0; i < el.classList.length; i++){
                if(el.classList[i] === 'show-Operationlist'){
                    flag = true
                }else{
                    flag = false
                }
            }
            if(flag){
                console.log('hhh')
                el.classList.remove('show-Operationlist')
            }else{
                console.log('xxx')
                el.classList.add('show-Operationlist')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// iconfont
@import '@/iconfont.scss';
.icon-left:before {
    content: '\e744';
    font-size:15px;
}
.icon-right:before {
    content: '\e743';
    font-size:15px;
}
.icon-more:before{
    content: '\eb30';
    font-size:20px;
}
.icon-more{
    transition:all .5s ease;
}
.icon-more:hover {
    color:#5FA8D3;
}
.icon-like:before{
    content: '\e663';
    font-size:15px;
}
.icon-like{
    margin-left:10px;
    transition:all .2s ease;
}
.icon-like:hover {
    color:#fc5c65;
}
.icon-comment:before{
    content: '\e60c';
    font-size:15px;
}
.icon-comment{
    transition:all .2s ease;
}
.icon-comment:hover {
    color:#20bf6b;
}
.icon-delete:before{
    content: '\e645';
    font-size:15px;
}
.icon-delete{
    transition:all .2s ease;
}
.icon-delete:hover {
    color:#C9D2CA;
}

.document-wrapper {
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    background:#fff;
    .main-container{
        flex:1;
        overflow-Y:auto;
        display: flex;
        position: relative;
        .PREV{
            position: absolute;
            z-index:2;
            top:50%;
            left:10px;
            transform: translateY(-50%);
            padding:5px 5px;
            display: flex;
            justify-content: center;
            align-items:center;
            border-radius:50%;
            color:#fff;
            background: #000;
            opacity: 0.6;
            cursor: pointer;
            transition:all .5s ease;
            &:hover{
                opacity: 1;
            }
        }
        .NEXT{
            position: absolute;
            z-index:2;
            top:50%;
            right:10px;
            transform: translateY(-50%);
            padding:5px 5px;
            display: flex;
            justify-content: center;
            align-items:center;
            border-radius:50%;
            color:#fff;
            background: #000;
            opacity: 0.6;
            cursor: pointer;
            transition:all .5s ease;
            &:hover{
               opacity: 1; 
            }
        }
        .article-list{
            flex:1;
            display: flex;
            flex-direction: column;
            align-items: center;
            .article-item{
                position: relative;
                display: flex;
                flex-direction: column;
                margin:10px 20px;
                cursor:pointer;
                &:first-child{
                    margin-top:30px;
                }
                .title{
                    font-size:18px;
                    font-weight:bold;
                    color:#303952;
                    width:400px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow:ellipsis;
                }
                .info{
                    margin-top:8px;
                    display: flex;
                    align-items:center;
                    font-size:12px;
                    font-family: 'Microsoft JhengHei',"Open Sans", Helvetica, Arial, sans-serif;
                    .name{
                        color:#303952;
                        margin-right:10px;
                    }
                    .time{
                        color:#A4AEA8;
                    }
                }
                .article{
                    display:flex;
                    margin-top:15px;
                    .coverPic{
                        margin:0px 20px 10px 0px;
                        width: 120px;
                        height:80px;
                        border-radius:5px;
                    }
                    .content{
                        flex:1;
                        height:100px;
                        font-size:13px;
                        line-height: 25px;
                        color:#303231;
                        overflow: hidden;
                        text-overflow:ellipsis;
                    }
                }
                .operation{
                    position:absolute;
                    top:0px;
                    right:5px;
                    display: flex;
                    align-items: center;
                    .operation-list{
                        display: flex;
                        align-items:center;
                        width:0px;
                        overflow: hidden;
                        opacity:0;
                        transform:scale(0,0);
                        transition:all .3s linear;
                    }
                    .show-Operationlist{
                        opacity:1;
                        width:90px;
                        transform:scale(1,1);
                    }
                }
            }
        }
    }
}
</style>