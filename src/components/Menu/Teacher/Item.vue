<template>
  <div>
    <div class="wrap-form">
      <el-form
        :model="teacher"
        :rules="rules"
        ref="teacher"
        label-width="120px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="teacher.name"></el-input>
        </el-form-item>

        <el-form-item label="Birth" required>
          <el-form-item prop="birth">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="teacher.birth"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input type="textarea" v-model="teacher.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateTeacher('teacher')"
            >Update</el-button
          >
          <el-button @click="resetForm('teacher')">Reset</el-button>
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
      teacher: {},
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
    getTeacherByID() {
      axios
        .get(`teacher/${this.$route.params.id}`)
        .then((result) => {
          this.teacher = result.data.data;
          this.teacher.birth = new Date(this.teacher.birth);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateTeacher(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.teacher);
          this.teacher.birth = this.fixDate(this.teacher.birth);
          axios
            .patch(`teacher/${this.teacher.id}`, this.teacher)
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
    this.getTeacherByID();
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