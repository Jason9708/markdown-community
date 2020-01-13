<!--
    图片上传组件
        uploadUrl - 上传地址
        showFileList - true显示文件列表  false隐藏文件列表
        multiple - 是否支持文件多选
        extraData - 上传时附带的额外参数
        onSuccess - 上传成功的回调   function(response, file, fileList)
        onError - 上传失败的回调    function(err, file, fileList)
        onChange - 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用   function(file, fileList)
        beforeUpload - 上传文件之前的钩子   function(file)   若此函数返回false，则停止上传
        limit - 限制上传个数
        tips - 提示语
        autoUpload - 是否直接上传 若否，则通过主动调用 submit()进行上传
-->
<template>
    <div class='upload_Img'>
        <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :multiple='multiple'
            :data='extraData'
            :headers='headers'
            :file-list="fileList"
            :show-file-list="showFileList"
            :on-success="onSuccess"
            :on-error='onError'
            :on-change='onChange'
            :on-remove='onRemove'
            :limit='limit'
            :before-upload="beforeUpload"
            :auto-upload="autoUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip" v-if='tips'>{{tips}}</div>
        </el-upload>
    </div>
</template>

<script>
export default {
    name:'uploadImg',
    data(){
        return{
            imageUrl:''
        }
    },
    props:[ 'uploadUrl', 'showFileList', 'multiple', 'extraData', 'limit', 'autoUpload', 'tips', 'headers','fileList'],
    methods:{
        onSuccess(res, file, fileList) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$emit('onSuccess',file,fileList)
        },
        onRemove(file,fileList) {
            this.$emit('onRemove',file,fileList)
        },
        onChange(file,fileList){
            this.$emit('onChange',file,fileList)
        },
        onError(err, file, fileList){
            this.$emit('onError',file,fileList)
        },
        beforeUpload(file) {
            const isPic = file.type === 'image/jpeg' || file.type === 'png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isPic) {
                this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isPic && isLt2M;  // false 时停止上传
        }
    }
}
</script>

<style lang="scss" scoped>
.upload_Img{
    /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    /deep/ .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    /deep/ .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    /deep/ .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
    /deep/ .el-upload__tip{
        font-size:10px;
        color:#303952;
    }
}
</style>