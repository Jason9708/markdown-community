<!--
    markdown 编译器 使用说明
        v-model => 绑定值
        toolbars => 工具栏
-->
<template>
    <div class='markdown-container'>
        <mavon-editor v-model='mavonEditor.content' :boxShadow='mavonEditor.boxShadow' :fontSize='mavonEditor.fontSize' :placeholder='mavonEditor.placeholder' :toolbars='mavonEditor.toolbars' @imgAdd="handleEditorImgAdd"/>
    </div>
</template>

<script>
export default {
    name:'markdownEditor',
    data(){
        return{
            // 富文本配置
            mavonEditor:{
                content:'',
                imgFile:{},
                boxShadow:false,
                fontSize:'13px',
                placeholder:'Write down your story',
                toolbars:{
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    undo: false, // 上一步
                    redo: false, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    navigation: true, // 导航目录
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                }
            }
        }
    },
    components:{
        // MarkdownPro
    },
    methods:{
        uploadCb:function(file){
            console.log(file)
        },
        // 获取当前文章内容
        getContent:function(){
            return this.mavonEditor.content
        },
        handleEditorImgAdd:function(pos, $file){
            console.log(pos)
            console.log($file)
            this.mavonEditor.imgFile[pos] = $file
            this.$emit('handleEditorImgAdd', pos, $file)
        },
        handleEditorImgDel (pos) {
            delete this.imgFile[pos]
            this.$emit('handleEditorImgDel', pos)
        },
    }
}
</script>

<style lang="scss" scoped>
.markdown-container{
    margin:0px 10px;
    /deep/ .markdown-body{
        height:90%;
        font-family:-apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
    }
    /deep/ .op-icon{
        font-size:12px !important;
    }
    /deep/ .v-note-navigation-title{
        font-size:12px !important;
    }
}
</style>