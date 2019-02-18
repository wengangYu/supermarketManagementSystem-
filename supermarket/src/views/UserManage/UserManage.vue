<template>
  <div class="usermanage">
    <!-- 面板主件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号管理</span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>

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
        <el-table-column label="创建日期" width="240">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.ctime | moment}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row),dialogFormVisible = true"
            >编辑</el-button>
            <!-- 弹出框 -->
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-dialog title="账号修改" :visible.sync="dialogFormVisible" width="440px">
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                size="small"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input v-model.number="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="选择用户组" prop="group">
                  <el-select v-model="ruleForm.group" placeholder="请选择用户组" style="width:260px">
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="dialogFormVisible = false, submitForm('ruleForm')"
                >确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
  <!-- 编辑-嵌套弹出表单 -->
</template>

<script>
import qs from "qs";
export default {
  data() {
    //校验规则
    var checkUsername = (rule, value, callback) => {
      var reg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (reg.test(value) === false) {
        callback(new Error("请输入正确格式的用户名"));
      }
      callback();
    };

    //选择用户组
    var checkgroup = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择用户组"));
      } else {
        callback();
      }
    };
    return {
      //分页
      total: 0, //数据总数
      currentPage: 1, //当前页
      pageSize: 3, //每页条数
      //表格数据
      tableData: [],
      dialogFormVisible: false,
      //验证
      ruleForm: {
        username: "",
        group: "",
        id: 0
      },
      //验证规则
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        group: [{ validator: checkgroup, trigger: "blur" }]
      },
      formLabelWidth: "146px",
      //检验修改表单
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        group: [{ validator: checkgroup, trigger: "blur" }]
      }
    };
  },
  //生命周期-created 组件加载完成
  created() {
    this.showaccountlist();
  },

  methods: {
    //分页
    handleSizeChange(val) {
      //保存每页条数
      this.pageSize = val;
      this.showaccountlist();
      // console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      //保存当前页给绑定的数据
      this.currentPage = val;
      this.showaccountlist();
      // console.log(`当前页: ${val}`);
      // this.axios.get(`http://127.0.0.1:666/account/pages?page=${val},size=`)
    },
    //调用刷新列表
    showaccountlist() {
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      console.log(`当前页:${currentPage},条数:${pageSize}`);
      this.axios
        .get("http://127.0.0.1:666/account/accountlist")
        .then(response => {
          this.tableData = response.data;
          //数据库 数据总数
          this.total = this.tableData.length;
          //将页码和数量axios发给后端
          this.axios.get(`http://127.0.0.1:666/account/pages?page=${currentPage}&size=${pageSize}`)
          .then(response=>{
            //接收到的data赋值给tabledata
            this.tableData = response.data
            //重新刷新网页
            //如果删除了当前页的数据需要跳转到上一页,但需要排除第一页
            if(response.data.length==0 && currentPage!==1){
              //跳转
              this.currentPage -=1;
              this.showaccountlist()
            }
          })
          //捕获错误
          .catch(err=>{
            console.log(err)
          })
        })
        .catch(err => {
          console.log(err);
        });
    },

    //账号回显
    handleEdit(index, row) {
      //获取当前点击的用户id
      let currentid = row.id;
      //将点击的用户id 通过axios发给后端
      this.axios
        .get(`http://127.0.0.1:666/account/accountedit?id=${currentid}`)
        .then(response => {
          this.ruleForm.username = response.data.username;
          this.ruleForm.group = response.data.usergroup;
          this.ruleForm.id = response.data.id;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //账号编辑确认
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //获取当前用户修改的内容和该id
          let currentid = this.ruleForm.id;
          let username = this.ruleForm.username;
          let usergroup = this.ruleForm.group;
          //将用户修改的内容发给后台

          let parms = {
            id: currentid,
            username: username,
            usergroup: usergroup
          };
          //post 请求发给后台
          this.axios
            .post(
              "http://127.0.0.1:666/account/accounteditconfirm",
              qs.stringify(parms)
            )
            .then(response => {
              let { error_code, msg } = response.data;
              if (error_code === 0) {
                this.$message({
                  message: msg,
                  type: "success"
                });
                //重新刷新账号列表
                this.showaccountlist();
              } else {
                this.$message.error(msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          //让表单还在
          this.dialogFormVisible = true;
          return false;
        }
      });
    },

    //账号删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          this.axios
            .get(`http://127.0.0.1:666/account/accountdel?id=${id}`)
            .then(response => {
              // 接收后端返回的错误码 和 提示信息
              let { error_code, msg } = response.data;
              if (error_code === 0) {
                this.$message({
                  type: "success",
                  message: msg
                });
                this.showaccountlist();
              } else {
                // 弹出删除失败的提示
                this.$message.error(msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // //获取要删除的id
      // let id = row.id
      // //发送idgei 后端
      // this.axios.get(`http://127.0.0.1:666/account/accountdel?id=${id}`)
      // .then(response=>{
      //   let{error_code,msg} = response.data
      //   if (error_code === 0){
      //     this.$message({
      //         message: msg,
      //         type: "success"
      //     })
      //   }this.showaccountlist()
      // })
      // .catch(err=>{
      //   console.log(err)
      // })
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
}
.clearfix {
  height: 40px;
  width: 100%;
}
.block {
  padding-top: 20px;
}
</style>