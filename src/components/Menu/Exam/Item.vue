<template>
  <div>
    <div class="wrap-form">
      <el-form
        :model="exam_item"
        :rules="rules"
        ref="exam_item"
        label-width="120px"
      >
        <el-form-item prop="dateExam" label="Exam day">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="exam_item.dateExam"
            style="width: 50%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Duration" prop="duration">
          <el-input
            v-model.number="exam_item.duration"
            autocomplete="off"
            style="width: 50%"
          >
            <template slot="append">minutes</template>
          </el-input>
        </el-form-item>

        <!-- Dropdown select -->
        <el-form-item label="Teacher" prop="idTeacher">
          <el-select
            v-model="exam_item.idTeacher"
            placeholder="Teacher's name"
            style="width: 50%"
          >
            <el-option
              v-for="item in teachers"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Course" prop="idCourse">
          <el-select
            v-model="exam_item.idCourse"
            placeholder="Course's name"
            style="width: 50%"
          >
            <el-option
              v-for="item in courses"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="updateExamItem('exam_item')"
            >Update</el-button
          >
          <el-button @click="resetForm('exam_item')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Exam-item",
  data() {
    return {
      exam_item: {},

      teachers: [],

      courses: [],

      rules: {
        dateExam: {
          type: "date",
          required: true,
          message: "Please pick a date",
          trigger: "change",
        },
        duration: [
          { required: true, message: "Duration is required" },
          { type: "number", message: "Duration must be a number" },
        ],
        idTeacher: {
          required: true,
          message: "Please pick a teacher",
          trigger: "change",
        },
        idCourse: {
          required: true,
          message: "Please pick a course",
          trigger: "change",
        },
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
    getExamByID() {
      axios
        .get(`exam/${this.$route.params.id}`)
        .then((result) => {
          this.exam_item = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllTeacher() {
      axios
        .get("teacher")
        .then((result) => {
          this.teachers = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllCourse() {
      axios
        .get("course")
        .then((result) => {
          this.courses = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateExamItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.exam_item.dateExam);
          this.exam_item.dateExam = this.fixDate(this.exam_item.dateExam);
          console.log(this.exam_item.dateExam);
          axios
            .post("exam", this.exam_item)
            .then((result) => {
              console.log(result);
              this.$swal({
                icon: "success",
                title: "Update successful",
                showConfirmButton: false,
              });
              this.backToExam();
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

    backToExam() {
      this.$router.push({ path: `/menu/exam` });
    },
  },

  created() {
    this.getExamByID();
    this.getAllTeacher();
    this.getAllCourse();
  },
};
</script>

<style>
</style>