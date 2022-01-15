<template>
  <div class="box-log">
    <div class="avatar">
      <el-avatar shape="circle" :size="100" fit="fill" class="avatar-img">
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
            <el-input
              v-model="ruleForm.email"
              placeholder="Email address"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              placeholder="Enter your password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              class="fix-btn"
              type="success"
              @click="submitForm('ruleForm')"
              >Sign in</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="wrap-forgot">
        <router-link to="/forgot">
          <button>Forgot password?</button>
        </router-link>
      </div>
      <div class="wrap-signin">
        <p>Don't have an account?</p>
        <router-link to="/register">
          <button>Create account</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
            min: 0,
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
          axios
            .post("login", this.ruleForm)
            .then((result) => {
              console.log(result);
              this.$swal({
                icon: "success",
                title: "Login successed !!!",
                showConfirmButton: false,
              });

              localStorage.setItem("token", result.data.token);
              this.$store.dispatch("id", result.data.data.user.id);
              this.$store.dispatch("user", result.data.data.user.name);
              this.$store.dispatch("role", result.data.data.idRole);
              // back_up
              localStorage.setItem("id", result.data.data.user.id);
              localStorage.setItem("user", result.data.data.user.name);
              localStorage.setItem("role", result.data.data.idRole);

              this.$router.push({ path: "/menu" });
            })
            .catch((err) => {
              console.log(err);
              this.$swal({
                icon: "error",
                title: err,
                showConfirmButton: false,
              });
            });
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
@import "./css/login.css";
</style>