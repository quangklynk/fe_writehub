<template>
  <div class="container">
    <div class="box-log">
      <div class="avatar">
        <el-avatar shape="circle" :size="100" :fit="fill" class="avatar-img">
          <img src="./../../assets/img/as.jpg" alt=""
        /></el-avatar>
        <span class="title">Make you become a professional writer</span>
      </div>
      <div class="form-log">
        <button class="log-facebook">
          <img src="./../../assets/img/image 2.jpg" alt="" />
          <p>Continue with Facebook</p>
        </button>
        <div class="or">
           <el-divider><p class="or-p">or</p></el-divider>
        </div>
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button class="fix-btn" type="success" @click="submitForm('ruleForm')"
                >Sign in</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            min: 8,
            max: 16,
            message: "Please input name",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  created() {},
};
</script>

<style scoped>
@import "./css/index.css";
</style>