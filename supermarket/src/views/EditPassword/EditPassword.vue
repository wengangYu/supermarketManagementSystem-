<template>
  <div class="edit-password">
    <!-- 面板组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <!-- 修改密码表单 -->
      <div class="edit-pwd">
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
          size="small"
        >
          <!-- 原密码 -->
          <el-form-item label="原密码" prop="Oldpwd">
            <el-input type="password" v-model="ruleForm2.Oldpwd"></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码" prop="Newpwd">
            <el-input type="password" v-model="ruleForm2.Newpwd"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPwd">
            <el-input type="password" v-model="ruleForm2.checkPwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
            <el-button @click="resetForm('passwordModifyForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    // 密码验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm2.checkPwd !== "") {
          this.$refs.ruleForm2.validateField("checkPwd");
        }
        callback();
      }
    };
    // 确认新密码验证
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm2.Newpwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 旧密码验证
    const checkOldPwd = (rule, value, callback) => {
      // 获取当前用户登录的账户
      let username = window.localStorage.getItem("username");
      // // 发送Ajax给后端，把旧的密码发送给后端，对比密码是否一致
      
      this.req
        .get(
          `/account/checkOldPwd?`,{oldPwd:value,username:username}
        )
        .then(response => {
          // 接收后台传来的错误码 和提示信息
          let { error_code, reason } = response;
          if (error_code !== 0) {
            // 错误提示
            callback(new Error(reason));
          } else {
            // 正确
            callback();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    return {
      ruleForm2: {
        Oldpwd: "",
        Newpwd: "",
        checkPwd: ""
      },
      rules2: {
        Oldpwd: [{ validator: checkOldPwd, trigger: "blur" }],
        Newpwd: [{ validator: validatePass, trigger: "blur" }],
        checkPwd: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 收集参数
          let params = {
            username: window.localStorage.getItem("username"),
            Oldpwd: this.ruleForm2.Oldpwd,
            Newpwd: this.ruleForm2.Newpwd
          };
          console.log("hhhh", params);

          // 发送ajax给后端
          this.req
            .post(
              "/account/savenewpwd",
              params
            )
            .then(response => {
              // 接后端数据
              let { error_code, reason } = response;
              // 判断  成功
              if (error_code === 0) {
                // 清除token
                window.localStorage.removeItem("token");
                // 弹出提示
                this.$message({
                  type: "success",
                  message: reason
                });
                setTimeout(() => {
                  // 跳转到登录页面
                  this.$router.push("/login");
                }, 1000);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 点击重置按钮 触发这个函数
    resetForm(formName) {
      // this.$refs.loginForm.resetFields() 获取整个表单组件 调用重置方法
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.edit-password {
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
</style>