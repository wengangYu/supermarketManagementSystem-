<template>
  <el-menu
    :default-active="$route.path"
    background-color="#556d84"
    :unique-opened="true"
    active-text-color="#41b883"
    router
  >
    <el-submenu index="0">
      <template slot="title">
        <i class="el-icon-menu"></i>系统管理
      </template>
      <el-menu-item index="/">
        <i class="el-icon-tickets"></i>
        系统信息
      </el-menu-item>
    </el-submenu>
    <!-- 导航1 -->
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-message"></i>账号管理
      </template>
      <el-menu-item index="/usermanage">账号管理</el-menu-item>
      <el-menu-item index="/useradd">添加账号</el-menu-item>
      <el-menu-item index="/editpassword">密码修改</el-menu-item>
    </el-submenu>
    <!-- 导航2 -->
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>商品管理
      </template>
      <el-menu-item index="/goodsmanage">商品管理</el-menu-item>
      <el-menu-item index="/goodsadd">添加商品</el-menu-item>
    </el-submenu>
    <!-- 导航3-->
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-setting"></i>统计管理
      </template>
      <el-menu-item index="/salescharts">销售统计</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {};
</script>

<style lang="less">
.el-menu {
        background-color: rgb(85, 109, 132);
        border: none;
        .el-submenu__title {
          color: #fff;
        }
        .el-menu-item {
          color: #fff;
        }
      }
</style>