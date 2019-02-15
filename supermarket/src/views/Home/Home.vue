<template>
  <div class="home">
    <!-- 头 -->
    
    <!-- 中 -->
    <el-main>中间</el-main>
    <!-- 尾 -->
    <el-footer>尾部</el-footer>
  </div>
</template>
<script>

export default {

};
</script>
<style lang="less">
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  // 头
  .el-header {
    position: relative;
    width: 100%;
    line-height: 60px;
    height: 60px;
    background-color: #fff ;
    text-align: right;
    .title{
      position: absolute;
      margin: 0;

    }
  }
  // 主体
  .el-main {
    flex: 1;
    background-color: #f1f1f1;
  }
  // 尾部
  .el-footer {
    height: 60px;
    line-height: 60px;
    background-color: #fff ;
  }
}
</style>