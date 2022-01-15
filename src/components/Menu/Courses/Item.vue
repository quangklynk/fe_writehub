<template>
  <div>
    <el-form
      :model="editCourses"
      :rules="rules"
      ref="editCourses"
      label-width="120px"
      class="demo-editCourses"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="editCourses.name"></el-input>
      </el-form-item>
      <el-form-item label="Teacher" prop="idTeacher">
        <el-select
          v-model="editCourses.idTeacher"
          filterable
          allow-create
          default-first-option
          placeholder="Activity zone"
          size="large"
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
      <el-form-item label="Time" required>
        <div class="block">
          <el-date-picker
            v-model="editCourses.date"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateCourse('editCourses')"
          >Create</el-button
        >
        <el-button @click="resetForm('editCourses')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      editCourses: {
        name: "",
        idTeacher: "",
        date: [],
        to: "",
        from: "",
      },
      teachers: [],
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
        ],
        idTeacher: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    getCoueseByID() {
      axios
        .get(`course/${this.$route.params.id}`)
        .then((result) => {
          this.editCourses = result.data.data;
          this.editCourses.date = [
            new Date(this.editCourses.from),
            new Date(this.editCourses.to),
          ];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCourse(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editCourses.from = this.fixDate(this.editCourses.date[0]);
          this.editCourses.to = this.fixDate(this.editCourses.date[1]);
          console.log(this.editCourses);
          axios
            .post("course", this.editCourses)
            .then((result) => {
              this.successMess(result.data.mess);
            })
            .catch(() => {
              this.erroMess();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    successMess(mess) {
      this.$message({
        message: mess,
        type: "success",
      });
    },

    erroMess() {
      this.$message.error("Oops, this is a error message.");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  },

  created() {
    this.getCoueseByID();
    this.getAllTeacher();
  },
};
</script>

<style scoped>
.el-date-editor .el-range-separator {
  width: 10%;
}

.el-select.el-select--large {
  width: 100%;
}
</style>