<template>
    <div class='usermanage'>
        <!-- 面板主件 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账号管理</span>
            </div>
            <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">

              <el-table-column
      type="selection"
      width="55">
    </el-table-column>
            <el-table-column label="创建日期" width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
            </el-table-column>
            <el-table-column label="账号" width="180">
              <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                  <p>用户名: {{ scope.row.name }}</p>
                  <div slot="reference" class="name-wrapper">
                      <span>{{ scope.row.name }}</span>
                  </div>
                  </el-popover>
              </template>
            </el-table-column>
            <!-- 用户组 -->
            <el-table-column label="用户组" width="180">
              <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                  <p>用户名: {{ scope.row.group }}</p>
                  <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.group }}</el-tag>
                  </div>
                  </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "余汶刚",
          group: "普通用户"
        },
        {
          date: "2016-05-04",
          name: "王小二",
          group: "超级管理员"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          group: "超级管理员"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          group: "普通用户"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
      }
  }
};
</script>

<style lang="less">
.usermanage {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
        text-align: left;
      .el-form {
        width: 360px;
        .el-form-item {
            margin-bottom: 24px;
        }
      }
    }
  }
};
.clearfix{
  height: 40px;
  width: 100%;
}
</style>