<template>
    <div class='dynamic-wrapper'>
        <!-- 发布动态 -->
        <div class='dynamic-release'>
            <el-input
                type="textarea"
                autosize
                placeholder="发布动态，分享你的想法吧~~"
                maxlength='1000'
                show-word-limit
                v-model="content">
            </el-input>
            <div class='release-footer'>
                <el-upload
                    :action="uploadUrl"
                    list-type="picture-card"
                    :auto-upload='autoUpload'
                    :limit='limit'
                    :file-list="imgList"
                    :accept='acceptType'
                    :on-remove="handleRemove"
                    :on-exceed='handleExceed'>
                    <i class="el-icon-plus"></i>
                </el-upload>
                <button class='release-submit' :disabled="content != '' ? false : true">发布</button>
            </div>
        </div>
    </div>
</template>

<script>
import uploadImg from '../../../components/Uploadimg'
export default {
    name:'Dynamic',
    data(){
        return{
            content:'',
            // 头像上传配置
            uploadUrl:'', // 上传地址
            acceptType:'.jpg,.jpeg,.png',
            limit:5,
            autoUpload:false,
            showFileList:false,
            imgList:[],
        }
    },
    components:{
        uploadImg
    },
    methods:{
        /***/
        handleRemove(fileList){
            // todo
        },
        handleExceed(file){
            this.$notify({
                title: 'Tips',
                message: 'sorry，最多上传5张图片！',
                type: 'error',
                duration:3000
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.dynamic-wrapper {
    width:100%;
    height:100vh;
    overflow:auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    background:#fff;
    .dynamic-release{
        display:flex;
        flex-direction:column;
        width:450px;
        padding:20px;
        margin-top:30px;
        background:rgba(61, 61, 61,.9);
        border-radius:5px;
        /deep/ .el-textarea__inner{
            color:#fff;
            font-size:12px;
            background:rgba(61, 61, 61,.5);
            resize:none;
            border-radius:2px;
            min-height:60px !important;
            max-height:300px;
            &:focus{
                border-color:#E6A23C;
            }
        }
        /deep/ .el-input__count{
            background:transparent;
        }

        .release-footer{
            margin-top:10px;
            display:flex;
            justify-content:space-between;
            align-items:center;
            /deep/ .el-upload--picture-card{
                background:rgba(61, 61, 61,.5);
                line-height:55px;
                width:50px;
                height:50px;
                &:hover{
                    border-color:#E6A23C;
                }
                &:focus{
                    border-color:#E6A23C;
                }
            }
            /deep/ .el-upload-list--picture-card .el-upload-list__item{
                width:50px;
                height:50px;
                margin-bottom:0px;
            }

            .release-submit{
                padding:5px 20px;
                margin-top:20px;
                color:#fff;
                background:#E6A23C;
                border:0px;
                border-radius:3px;
                font-size:11px;
                cursor:pointer;
                &:disabled{
                    background:rgba(250, 130, 49,.2);
                    cursor:not-allowed
                }
            }
        }
    }
}
</style>