
<template>
    <div class="account-add">
        <!-- 面板组件 -->
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加账号</span>
            </div>
            <div class="user-add">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size='small'>
                <el-form-item label="用户名" prop="username">
                  <el-input v-model.number="ruleForm.username"></el-input>
                </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass"></el-input>
              </el-form-item>
                <el-form-item label="选择用户组" prop="group">
                  <el-select v-model="ruleForm.group" placeholder="请选择用户组" style='width:260px' >
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //选择用户组
    var checkgroup = (rule,value,callback) =>{
      if(value === ''){
        
        callback(new Error('请选择用户组'));
      }else{
        callback();
      }
    }
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
        group: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }],
        group:[{validator: checkgroup, trigger: "blur"}]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //收集用户的账号 密码 组 ;
          let params = {
            username: this.ruleForm.username,
            password: this.ruleForm.pass,
            group: this.ruleForm.group
          };

          // 使用axios发送数据给后端
          this.axios
            .post(
              "http://127.0.0.1:666/account/accountadd",
              qs.stringify(params)
            )
            .then(response => {
              //解构变量
              let { error_code, msg } = response.data;
              this.$message({
                message: msg,
                type: "success"
              });
              //插入成功后跳转到账号列表
              this.$router.push('/usermanage')
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
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
}
.clearfix {
  height: 40px;
  width: 100%;
}
.index{
  .account-add{
    .user-add{
      .el-button--primary{
        width: 100%;
      }
    }
  }
}
</style>