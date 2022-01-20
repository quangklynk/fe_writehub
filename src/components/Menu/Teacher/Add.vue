<template>
  <div class="wrap-creat">
    <h1>Add new user: teacher</h1>
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
</template>

<script>
import axios from "axios";
export default {
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
          console.log(this.ruleForm);
          axios
            .post("register/teacher", this.ruleForm)
            .then((result) => {
              this.$swal({
                icon: "success",
                title: `Successed ${result}`,
                showConfirmButton: false,
              });
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
.wrap-creat {
  width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
