<template>
  <div>
    <!-- Function row -->
    <el-row>
      <el-col :span="24">
        <el-button-group>
          <el-button
            icon="el-icon-circle-plus-outline"
            type="success"
            @click="handleAdd"
            >Add new</el-button
          >
          <el-button icon="el-icon-refresh" @click="getAllExam"
            >Refresh</el-button
          >
        </el-button-group>
      </el-col>
    </el-row>

    <!-- Form Add-->
    <el-dialog
      title="Add new Examination"
      :visible.sync="dialogFormVisible"
      width="40%"
    >
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
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Duration" prop="duration">
            <el-input v-model.number="exam_item.duration" autocomplete="off">
              <template slot="append">minutes</template>
            </el-input>
          </el-form-item>
          <!-- Dropdown select -->
          <el-form-item label="Teacher" prop="idTeacher">
            <el-select
              v-model="exam_item.idTeacher"
              placeholder="Teacher's name"
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
            <el-select v-model="exam_item.idCourse" placeholder="Course's name">
              <el-option
                v-for="item in courses"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- ---------- -->
          <el-form-item>
            <el-button type="primary" @click="addExam('exam_item')"
              >Add</el-button
            >
            <el-button @click="resetForm('exam_item')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-table :data="exams" style="width: 100%" max-height="100vh" border>
      <el-table-column fixed prop="id" label="ID" width="50px" align="center">
      </el-table-column>
      <el-table-column prop="dateExam" label="Exam day"> </el-table-column>
      <el-table-column prop="course.name" label="Course"></el-table-column>
      <el-table-column prop="teacher.name" label="Teacher"></el-table-column>
      <el-table-column prop="duration" label="Duration"></el-table-column>

      <el-table-column prop="created_at" label="created_at">
        <template slot-scope="scope">
          {{ scope.row.created_at | formatDate }}
        </template>
      </el-table-column>

      <el-table-column prop="updated_at" label="updated_at">
        <template slot-scope="scope">
          {{ scope.row.updated_at | formatDate }}
        </template>
      </el-table-column>

      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.row)"
            square
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            square
            @click="deleteRow(scope.$index, exams, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Exam",
  data() {
    return {
      exams: [],
      // data for add dialog
      exam_item: {
        dateExam: "",
        idTeacher: "",
        idCourse: "",
      },
      teachers: [],
      courses: [],
      dialogFormVisible: false,

      rules: {
        dateExam: {
          type: "date",
          required: true,
          message: "Please pick a date",
          trigger: "blur",
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
    getAllExam() {
      axios
        .get("exam")
        .then((result) => {
          this.exams = result.data.data;
          console.log(this.exams);
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

    handleEdit(row) {
      console.log(row.id);
      this.$router.push({ path: `/menu/exam/${row.id}` });
    },

    handleAdd() {
      this.dialogFormVisible = true;
      this.getAllTeacher();
      this.getAllCourse();
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    addExam(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
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

    deleteRow(index, rows, row) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "el-button el-button--primary",
          cancelButton: "el-button el-button--danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          // reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`exam/${row.id}`)
              .then((res) => {
                console.log(res);
                if (!res.data.error) {
                  rows.splice(index, 1);
                  swalWithBootstrapButtons.fire("Deleted!", "", "success");
                } else {
                  swalWithBootstrapButtons.fire(
                    "Cancelled!",
                    res.data.mess,
                    "error"
                  );
                }
              })
              .catch((err) => {
                swalWithBootstrapButtons.fire("Error !!!", `${err}`, "error");
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Cancelled", "", "error");
          }
        });
    },
  },

  created() {
    this.getAllExam();
  },
};
</script>

<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.el-select {
  width: 100%;
}

.el-row {
  margin-bottom: 20px;
}
</style>
