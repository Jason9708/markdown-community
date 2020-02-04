<template>
    <div class='articleDetail-wrapper'>
        <div class='main-container'>
            <!-- 文章简介（封面图 + 标题 + 创建者信息）-->
            <div class='article-info'>
                <img class='info-coverPic' v-if='artcileData.coverPic' :src='global.articleCoverPath + artcileData.coverPic'>
                <div class='info-container'>
                    <!-- 文章标题 + 分类 + 心情 -->
                    <div class='info-article'>
                        <span class='info-article-title'>{{artcileData.title}}<span class='info-article-classification'>{{getClassificationDes(artcileData.classification)}}</span></span>
                        <span class='info-article-date'><i :class="'icon-' + getMoodIcon(artcileData.mood)" style='margin-right:15px;color:#303952;'></i>{{artcileData.date | timeFormat}}</span>
                    </div>
                    <!-- 用户信息 -->
                    <div class='info-user'>
                        <img class='info-userAvatar' v-if='artcileData.createUserAvatar' :src='artcileData.createUserAvatar ? global.avatarPath + artcileData.createUserAvatar : default_headPic' @click='goPersonDetail'>
                        <!-- 用户姓名 公司 职业 -->
                        <div class='info-user-container'>
                            <span class='info-user-name'>{{artcileData.createUserName}}</span>
                            <span class='info-user-backdrop'><i class='icon-profession' style='margin-right:5px;'></i>{{artcileData.createUserProfession}}<i class='icon-company' style='margin:0px 5px;'></i>{{artcileData.createUserCompany}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class='article-content' v-html='artcileData.content'></div>
        </div>
    </div>
</template>

<script>
import { getArticleDetail } from '../../../Api/api.js'
import marked from 'marked'
export default {
    name:'Detail',
    data(){
        return{
            default_headPic:require('../../../assets/images/default_headPic.jpg'),
            artcileData:''
        }
    },
    mounted(){
        this.getDetailData()
    },
    methods:{
        getDetailData:function(){
            var id = this.$route.query.id
            getArticleDetail(id).then(res => {
                console.log('getArticleDetail:',res)
                if(res.data.code == 0){
                    this.artcileData = res.data.data
                    this.artcileData.content = marked(res.data.data.content)
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
        // 根据mood获取对应心情icon  1-smile  2-normal  3-cry
        getMoodIcon:function(classification){
            switch(classification){
                case '1':
                    return 'smile'
                    break
                case '2':
                    return 'normal'
                    break
                case '3':
                    return 'cry'
                    break
                default:
                    return ''
            }
        },
        goPersonDetail:function(){
            var id = this.artcileData.createUserId
            this.$router.push({
                path:'/personDetail',
                query:{
                    id: id
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
// iconfont
@import '@/iconfont.scss';
@import './markdown.css';
.icon-smile:before{
    content: '\e63f';
    font-size:14px;
}
.icon-normal:before{
    content: '\e8da';
    font-size:14px;
}
.icon-cry:before{
    content: '\e758';
    font-size:14px;
}
.icon-profession:before {
    content: '\e78e';
    font-size:14px;
}
.icon-company:before {
    content: '\e72a';
    font-size:14px;
}


.articleDetail-wrapper{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    background:#fff;
    overflow:auto;
    .main-container{
        flex:1;
        overflow-Y:auto;
        position: relative;
        .article-info{
            margin:30px;
            .info-coverPic{
                width:100%;
                border-radius:5px 5px 0px 0px;
            }
            .info-container{
                padding:10px 10px;
                border-bottom:2px solid rgba(178,186,194,.15);
                display:flex;
                justify-content:space-between;
                align-item:center;
                .info-article{
                    display:flex;
                    flex-direction:column;
                    justify-content:space-between;
                    .info-article-title{
                        display:flex;
                        align-items:center;
                        flex-wrap:wrap;
                        font-size:18px;
                        font-weight:700;
                        color:#000;
                    }
                    .info-article-date{
                        display:flex;
                        align-items:center;
                        margin-top:5px;
                        font-size:12px;
                        color:#A4AEA8;
                    }
                    .info-article-classification{
                        margin-left:10px;
                        padding:0px 10px;
                        border-left:2px solid rgba(178,186,194,.15);
                        color:#303952;
                        font-size:10px;
                        font-weight:100;
                    }
                }
                .info-user{
                    display:flex;
                    padding:0px 15px;
                    border-left:2px solid rgba(178,186,194,.15);
                    .info-userAvatar{
                        width:50px;
                        height:50px;
                        border-radius:5px;
                        cursor:pointer;
                    }
                    .info-user-container{
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                        margin-left:10px;
                        .info-user-name{
                            font-size:14px;
                            font-weight:700;
                            color:#000;
                        }
                        .info-user-backdrop{
                            display:flex;
                            align-items:center;
                            font-size:12px;
                            color:#A4AEA8;
                        }
                    }
                }
            }
        }
        .article-content{
            margin:30px;
            font-size:14px;
        }
    }
}

// 滚动条样式覆盖
.main-container::-webkit-scrollbar {
    width: 3px;
    margin:2px;
    height: 5px;
}
.main-container::-webkit-scrollbar-button {
    display: none;
}
.main-container::-webkit-scrollbar-track {
    background-color: transparent;
}
.main-container::-webkit-scrollbar-thumb {
    width: 1px;
    background: linear-gradient(to right top, #ffbe76, #f0932b);
    -webkit-border-radius: 10em;
    -moz-border-radius: 10em;
    border-radius: 10em;
}
</style>