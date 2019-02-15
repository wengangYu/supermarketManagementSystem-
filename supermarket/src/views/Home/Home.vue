<template>
  <div class="home">
    <!-- 头 -->
    <!-- 中 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>系统信息</span>
      </div>
      <div class="text item">
        <!-- 提示信息 -->
        <template>
          <el-alert title="导入数据" type="success" show-icon></el-alert>
          <el-alert title="商品总数60000，已销售金额99999，库存商品总价22381294" type="info" show-icon></el-alert>
        </template>
        <!-- 左右卡片 -->
        <el-row :gutter="20">
          <!-- 左 -->
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>销售排行</span>
              </div>
              <div class="text item">
                <el-table :data="saleData" style="width: 100%">
                  <el-table-column prop="goodsname" label="商品名称"></el-table-column>
                  <el-table-column prop="saleCount" label="销量"></el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
          <!-- 右 -->
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>缺货商品</span>
              </div>
              <div class="text item">
                <el-table :data="stuckoutData" style="width: 100%">
                  <el-table-column prop="goodsname" label="商品名称"></el-table-column>
                  <el-table-column prop="inventory" label="库存"></el-table-column>
                  <el-table-column prop="saleCount" label="操作">
                    <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">入库</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
  data() {
    return {
      // 销售排行
      saleData: [
        {
          goodsname: "Air Max 1980",
          saleCount: "20"
        },
        {
          goodsname: "Air Jordan 1",
          saleCount: "53"
        },
        {
          goodsname: "Air Jordan 11",
          saleCount: "23"
        },
        {
          goodsname: "CONVERSE⭐ 1970s",
          saleCount: "67"
        }
      ],
      // 缺货商品
      stuckoutData: [
        {
          goodsname: "iphon8",
          inventory: "70"
        },
        {
          goodsname: "iPhoneX",
          inventory: "90"
        },
        {
          goodsname: "iPhone8plus",
          inventory: "20"
        },
        {
          goodsname: "oppo",
          inventory: "10"
        }
      ]
    };
  }
};
</script>
<style lang="less">
.home {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: bolder;
      background: rgb(133, 192, 177);
    }
    .item {
      .el-alert {
        margin-bottom: 25px;
      }
    }
  }
}
</style>