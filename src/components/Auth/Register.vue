<template>
  <div class="box-log">
    <div class="avatar">
      <el-avatar shape="circle" :size="100" fit="fill" class="avatar-img">
        <img src="./../../assets/img/as.jpg" alt=""
      /></el-avatar>
      <span class="title">Make you become a professional writer</span>
    </div>
    <div class="form-log">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="email">
            <el-input
              v-model="ruleForm.email"
              placeholder="Email address"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              placeholder="Enter your password"
            ></el-input>
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="birth">
                <el-date-picker
                  type="date"
                  placeholder="Pick birthday"
                  v-model="ruleForm.birth"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="name">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="Enter your name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="address">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="Enter your address"
              v-model="ruleForm.address"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="fix-btn"
              type="success"
              @click="submitForm('ruleForm')"
              >Sign up</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="wrap-link">
        <p>
          By creating an account, you are agreeing to our <br />

          <span class="link-page">Terms of Service</span> and
          <span class="link-page"> Privacy Policy. </span>
        </p>
      </div>
      <div class="wrap-signin">
        <p>Already have an account?</p>
        <router-link to="/">
          <button>Sign in</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      ruleForm: {
        email: "",
        password: "",
        name: "",
        birth: new Date(),
        address: "",
        idRole: 2,
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input email",
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
            message: "Please input password",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
        ],
        birth: [
          {
            type: "date",
            required: true,
            message: "Please pick a birthday",
            trigger: "change",
          },
        ],
        address: [
          {
            required: true,
            message: "Please input address",
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
          this.ruleForm.birth = this.fixDate(this.ruleForm.birth);
          axios
            .post("register", this.ruleForm)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    fixDate(date) {
      let dd = date.getDate();
      let mm = date.getMonth() + 1;

      let yyyy = date.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      return (date = yyyy + "-" + mm + "-" + dd);
    },
  },
  created() {},
};
</script>

<style scoped>
@import "./css/register.css";
</style>