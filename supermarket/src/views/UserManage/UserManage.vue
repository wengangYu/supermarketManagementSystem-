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
            
            <el-table-column label="账号" width="180">
              <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                  <p>用户名: {{ scope.row.username }}</p>
                  <div slot="reference" class="name-wrapper">
                      <span>{{ scope.row.username }}</span>
                  </div>
                  </el-popover>
              </template>
            </el-table-column>
            <!-- 用户组 -->
            <el-table-column label="用户组" width="180">
              <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                  <p>用户名: {{ scope.row.usergroup }}</p>
                  <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.usergroup }}</el-tag>
                  </div>
                  </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="240" >
              <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.ctime | moment}}</span>
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
      tableData: [],  
    };
  },
  //生命周期-created 组件加载完成
  created() {
    this.showaccountlist()
  },
  
  
  methods: {
    //时间过滤
    
    //调用刷新列表
    showaccountlist(){
      this.axios.get('http://127.0.0.1:666/account/accountlist')
      .then(response =>{
        this.tableData = response.data
        // var ctime = response.data.map(ctime => response.data.ctime)
        // console.log(ctime)
      })
      .catch(err=>{
        console.log(err)
      })
    },


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