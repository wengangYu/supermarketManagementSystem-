<template>
  <div class="index">
    <!-- 大容器 -->
    <el-container>
      <!-- 左侧容器 -->
      <el-aside width="200px">
        <!-- 导航组件 -->
        <Nav></Nav>
      </el-aside>
      <!-- 右侧容器 -->
      <el-container>
        <!-- 路由出口 -->
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入导航组件
import Nav from '@/components/Nav/Nav.vue';
// 注册组件
export default {
  name: "index",
  components: {
    Nav
  }
};
</script>

<style lang="less">
// 首页盒子
.index {
  height: 950px;
  // 大容器
  .el-container {
    height: 950px;

    // 左侧
    .el-aside {
      background-color: #556d84;
      color: #333;
      text-align: center;
      line-height: 200px;
    }
    // 右侧
    .el-container {
      // 头尾
      .el-header,
      .el-footer {
        background-color: #b3c0d1;
        color: #333;
        text-align: center;
        line-height: 60px;
      }
      // 中间部分
      .el-main {
        background-color: #e9eef3;
        color: #333;
        text-align: center;
        line-height: 160px;
      }
    }
  }
}
</style>
