<template>
    <div class='society-wrapper'>
        <div class='society-list'>
            <div class='list-item' v-for='(item,index) in 2' :key='index'>
                <!-- 封面图 -->
                <img class='coverPic' src='../../../assets/images/mock/2.jpg'></img>
                <!-- 文章信息 标题、简介-->
                <div class='info'>
                    <div class='title'>
                        盲聋瞎
                    </div>
                    <div class='intro'>
                        聋子听哑巴说瞎子看到了爱情
                    </div>
                </div>
                <!-- 评论、点赞 -->
                <div class='opacity'>
                    <i class='icon-like' style='margin-bottom:8px;'></i>
                    <i class='icon-comment' style='margin-bottom:8px;'></i>
                    <i class='icon-delete'></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Society',
    data(){
        return{

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
    .society-list{
        flex:1;
        flex-wrap:wrap;
        margin:30px 10px;
        background:#fff;
        border-radius:5px;
        overflow-y:auto;
        .list-item{
            display:flex;
            padding:15px 20px;
            height:80px;
            transition:all 1s ease;
            cursor:pointer;
            .coverPic{
                height:100%;
                border-radius:5px;
                box-shadow:0 0 15px -5px #000;
            }
            .info{
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                padding:8px 15px;
                flex:1;
                font-family:-apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
                .title{
                    font-size:15px;
                    font-weight:600;
                    color:#303952;
                    letter-spacing:1px;
                }
                .intro{
                    font-size:12px;
                    font-weight:500;
                    color:rgb(178, 186, 194);
                }
            }
            .opacity{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                width:20px;
                padding:20px 5px;
                border-radius:0px 5px 5px 0px;
                background: linear-gradient(to right top, #ffbe76, #f0932b);
                color:#fff;
            }
        }
        .list-item:hover{
            background:#ecf0f1;
        }
    }
}
</style>