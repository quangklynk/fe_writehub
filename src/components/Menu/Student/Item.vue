<template>
  <div>
    <div class="wrap-form">
      <el-form
        :model="student"
        :rules="rules"
        ref="student"
        label-width="120px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="student.name"></el-input>
        </el-form-item>

        <el-form-item label="Birth" required>
          <el-form-item prop="birth">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="student.birth"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input type="textarea" v-model="student.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateStudent('student')"
            >Update</el-button
          >
          <el-button @click="resetForm('student')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      student: {},
      rules: {
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 100,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        birth: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
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
    getStudentByID() {
      axios
        .get(`student/${this.$route.params.id}`)
        .then((result) => {
          this.student = result.data.data;
          this.student.birth = new Date(this.student.birth);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateStudent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.student);
          this.student.birth = this.fixDate(this.student.birth);
          axios
            .patch(`student/${this.student.id}`, this.student)
            .then((result) => {
              console.log(result);
              this.$swal({
                icon: "success",
                title: "Update successful",
                showConfirmButton: false,
              });
            })
            .catch((err) => {
              this.$swal({
                icon: "error",
                title: err,
                showConfirmButton: false,
              });
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.getStudentByID();
  },
};
</script>

<style scoped>
.wrap-form {
  width: 500px;
  padding: 20px;
  background: #fff;
}
</style>