<template>
    <div class='create-wrapper'>
        <Header class='header-component'></Header>
        <!-- 提交按钮 -->
        <div class='create-submit' @click='beforeSumbit'>
            发布
        </div>
        <Editor class='editor'></Editor>
        <!-- 提交弹窗 -->
        <el-dialog
            title="发布文章"
            :visible.sync="submitDialog"
            width="40%"
            custom-class='sumbit-dialog'
            :before-close="handleDialogClose"
        >
            <div class='title'>
                <input class='title-input' v-model='articleInfo.title' placeholder='输入文章标题...'></input>
            </div>
            <!-- 添加封面大图 -->
            <div class='upload'>
                <!-- 未添加 -->
                <template v-if="articleInfo.coverPic === ''">
                    <input class='upload-input' @change='changeCoverPic($event)' type='file' accept='image/gif,image/jpeg,image/jpg,image/png' />
                    <!-- 遮罩层 -->
                    <div class='upload-cover'>点击添加封面图</div>
                </template>
                <!-- 已添加 -->
                <template v-else>
                    <img class='upload-image' id='upload-image' />
                    <i class='icon-delete' style='cursor:pointer;' @click='deleteCoverPic'></i>
                </template>
            </div>
            <!-- 分类 -->
            <div class='classification'>
                <span>分类：</span>
                <span class='classification-label' :class="articleInfo.classification === 1 ? 'choosed-label' : '' " @click="changeClassification(1)">随笔</span>
                <span class='classification-label' :class="articleInfo.classification === 2 ? 'choosed-label' : '' " @click="changeClassification(2)">新闻</span>
                <span class='classification-label' :class="articleInfo.classification === 3 ? 'choosed-label' : '' " @click="changeClassification(3)">知识</span>
                <span class='classification-label' :class="articleInfo.classification === 4 ? 'choosed-label' : '' " @click="changeClassification(4)">沸点</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <div class='dialog-cancel' @click="handleDialogClose">取 消</div>
                <div class='dialog-submit' @click="submitDialog = false">确 定</div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Header from '../../../components/Header'
import Editor from '../../../components/Editor'
export default {
    name:'Create',
    data(){
        return{
            submitDialog:false,
            articleInfo:{  // 文章信息
                content:'',
                title:'',
                coverPic:'',
                classification:'',
            },
        }
    },
    components:{
        Header,
        Editor
    },
    methods:{
        // 点击发布（ 弹出弹窗）
        beforeSumbit:function(){
            this.submitDialog = true
        },
        // 弹窗关闭前回调
        handleDialogClose(){
            // 清空
            this.articleInfo.title = ''
            this.articleInfo.coverPic = ''
            this.articleInfo.classification = ''
            this.submitDialog = false
        },
        // 上传封面图
        changeCoverPic:function(event){
            this.articleInfo.coverPic = event.target.files[0]  // 获取图片

            // 创建 FileReader 对象
            var file = event.target.files[0]
            var fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = function(e) {
                //加载完毕之后获取结果赋值给img
                document.getElementById("upload-image").src = this.result;
                console.log(this.previewCover)
            }
        },
        // 删除封面图
        deleteCoverPic:function(){
            this.articleInfo.coverPic = ''
        },
        // 选择分类
        changeClassification(type){
            // 1-随笔   2-新闻   3-知识   4-沸点
            this.articleInfo.classification = type
        }
    }
}
</script>

<style lang='scss' scoped>
// iconfont
@import '@/iconfont.scss';
.icon-delete:before{
    content: '\e645';
    font-size:15px;
}

.create-wrapper{
    width:100%;
    height:100%;
    overflow-y:screen;
    display:flex;
    flex-direction: column;
    position:relative;
    .header-component{
        padding:30px 0px 10px 30px;
    }
    .create-submit{
        position:absolute;
        top:115px;
        right:30px;
        padding:3px 10px;
        border:1px solid #303952;
        border-radius:3px;
        font-size:11px;
        cursor:pointer;
        transition:all .2s linear;
    }
    .create-submit:hover{
        background: #303952;
        color:#fff;
    }
    .editor{
        flex:1;
    }
    .sumbit-dialog{
        .title{
            padding:5px;
            border:0;
            border-bottom:2px solid #f0932b;
            .title-input{
                border:0;
                color: #303952;
                outline:none;
            }
        }
        .upload{
            margin:10px 0px;
            position:relative;
            .upload-input{
                width:100%;
                height:140px;
                opacity:0;
                cursor:pointer;
            }
            .upload-cover{
                position:absolute;
                top:0px;
                left:0px;
                display:flex;
                justify-content:center;
                align-items:center;
                width:100%;
                height:140px;
                border-radius:5px;
                background:#f1f2f6;
                pointer-events: none;
                font-size:12px;
            }
            .upload-image{
                width:100%;
                border-radius:5px;
            }
            .icon-delete{
                position:absolute;
                top:10px;
                right:10px;
                color:#fff;
                padding:5px;
                background:rgba(30, 39, 46,0.7);
                border-radius:3px;
                transition:all .2s linear;
                &:hover{
                    background:rgba(30, 39, 46,0.9);
                }
            }
        }
        .classification{
            display:flex;
            flex-wrap:wrap;
            align-items:center;
            color:#303952;
            font-size:11px;
            .classification-label{
                margin:0px 5px;
                padding:3px 10px;
                border:1px solid #303952;
                border-radius:3px;
                cursor:pointer;
                transition:all .2s linear;
            }
            .choosed-label{
                background:#303952;
                color:#fff;
            }
        }
        .dialog-footer{
            display:flex;
            justify-content:flex-end;
            .dialog-cancel{
                padding:3px 10px;
                border:1px solid #dfe4ea;
                border-radius:3px;
                font-size:12px;
                cursor:pointer;
                transition:all .2s linear;
                margin-right:10px;
            }
            .dialog-cancel:hover{
                background:#f1f2f6;
            }
            .dialog-submit{
                padding:3px 10px;
                border:1px solid #303952;
                border-radius:3px;
                background: #303952;
                color:#fff;
                font-size:12px;
                cursor:pointer;
                transition:all .2s linear;
            }
            .dialog-submit:hover{
                background:#57606f;
                border:1px solid #57606f;
            }
        }   
    }
    /deep/ .el-dialog__title{
        font-size:14px;
        color:#303952;
    }
}
</style>