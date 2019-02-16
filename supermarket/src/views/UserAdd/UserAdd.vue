<template>
    <div class="account-add">
        <!-- 面板组件 -->
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加账号</span>
            </div>
            <div class="user-add">
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" size='small'>
                <el-form-item label="用户名" prop="username">
                  <el-input v-model.number="ruleForm2.username"></el-input>
                </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass"></el-input>
              </el-form-item>
                <el-form-item label="选择用户组">
                  <el-select v-model="usergroup.group" placeholder="请选择用户组" style='width:260px'>
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              </el-form-item>
              </el-form>
             </div>
        </el-card>
    </div>
    
</template>
<script>
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      var reg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (reg.test(value) === false) {
        callback(new Error("请输入正确格式的用户名"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        username: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }]
      },
      usergroup:{
        group:''
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("添加成功!");
          // 获取用户输入的要新增的账号数据，用一个参数对象保存
          let params = {
            username: this.ruleForm2.username,
            pass: this.ruleForm2.pass,
            checkPass: this.ruleForm2.checkPass
          }
          console.log(params);
          // 跳转到账号管理界面
          this.$router.push('/usermanage')
        } else {
          console.log("error 添加失败!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.account-add {
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