<template>
  <div id="app">
    <div class='header' style="-webkit-app-region: drag;">
      <i class="el-icon-minus" style='margin-right:20px;cursor:pointer;-webkit-app-region: no-drag;' @click="operate('min')"></i>
      <!-- <i class="el-icon-copy-document" style='margin-right:20px;cursor:pointer;-webkit-app-region: no-drag;' @click="operate('max')"></i> -->
      <i class="el-icon-close" style='margin-right:20px;cursor:pointer;-webkit-app-region: no-drag;' @click="operate('close')"></i>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  const { ipcRenderer: ipc } = require("electron");
  export default {
    name: 'jason-community',
    methods:{
      operate:function(operate){
        ipc.send(operate)
      }
    }
  }
</script>

<style lang='scss'>
html,body{
  padding:0;
  margin:0;
  width:100%;
  height:100%;
  overflow:screen;
  font-family:'Microsoft JhengHei';
  font-weight:1px;
}
#app{
  height:100%;
  
}
.header{
  position:fixed;
  top:0;
  display:flex;
  width:100%;
  justify-content:flex-end;
  padding:10px;
  color:#000;
  z-index:999;
  font-size:$theme-font-size;
}
</style>
