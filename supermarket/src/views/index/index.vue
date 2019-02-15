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
        <!-- 右侧头部 -->
        <el-header>
          <Top></Top>
        </el-header>
        <!-- 内容 -->
        <el-main>
          <!-- 路由出口 -->
          <router-view/>
        </el-main>
        <!-- 右侧尾部 -->
        <el-footer>
          <Bottom></Bottom>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入导航组件
import Nav from '@/components/Nav/Nav.vue';

import Top from '@/components/Top/Top.vue';

import Bottom from '@/components/Bottom/Bottom.vue';
// 注册组件
export default {
  name: "index",
  components: {
    Nav,
    Top,
    Bottom,
  }
};
</script>

<style lang="less">
// 首页盒子
.index {
  height: 100%;
  width: 100%;
  // 大容器
  .el-container {
    height: 100%;
    width: 100%;

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
        background-color: #dbdedf;
        color: #333;
        text-align: center;
        line-height: 60px;
      }
      // 中间部分
      .el-main {
        background-color: #e9eef3;
        color: #333;
        text-align: center;
        line-height: 40px;
        width: 100%;
      }
    }
  }
}

</style>
