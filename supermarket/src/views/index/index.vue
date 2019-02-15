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
                    <!-- 头部组件 -->
                    <Top></Top>
                </el-header>
                <!-- 右侧中间 -->
                <el-main>
                    <!-- 路由出口 -->
                    <router-view />
                </el-main>
                <!-- 右侧尾部 -->
                <el-footer>
                    <!-- 尾部组件 -->
                    <Bottom></Bottom>
                </el-footer>
        <!-- 路由出口 -->
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入导航组件
import Nav from '@/components/Nav/Nav.vue';
import Top from '@/components/Top/Top.vue';
// 注册组件
export default {
  name: "index",
  components: {
    Nav,
    Top,
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
    
    }
  }

</style>
