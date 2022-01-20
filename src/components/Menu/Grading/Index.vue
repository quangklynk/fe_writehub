<template>
  <div class="wrap-post">
    <el-dialog
      title="Choose your examination to grading"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="set_false"
      :close-on-press-escape="set_false"
      :show-close="set_false"
    >
      <el-form :model="property_post" :rules="rules" ref="property_post">
        <el-row>
          <el-col :span="12">
            <el-form-item label="Examinations" prop="idExam">
              <el-select
                v-model="property_post.idExam"
                filterable
                allow-create
                default-first-option
                placeholder="Valid Examinations"
              >
                <el-option
                  v-for="item in exams"
                  :key="item.id"
                  :label="item.dateExam"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormExam('property_post')"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <!-- List of Posts for grading -->
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
  name: "Marking",
  data() {
    return {
      // 1st stage
      exams: [],
      // 2nd stage
      posts: [],
      type: [],
      category: [],

      dialogVisible: true,
      set_false: false,

      idTeacher: this.$store.getters.id,

      property_post: {
        idExam: "",
        dateExam: "",
      },

      rules: {
        idExam: [
          {
            required: true,
            message: "Please select",
            trigger: "change",
          },
        ],

        dateExam: {
          required: true,
          message: "Please select",
          trigger: "change",
        },
      },
    };
  },
  methods: {
    getAllProp1st() {
      // Exam
      axios
        .get(`exam/teacher/${this.idTeacher}`)
        .then((result) => {
          this.exams = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllProp2nd() {
      axios
        .get(`type`)
        .then((result) => {
          this.data.types = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`category`)
        .then((result) => {
          this.data.categories = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`status`)
        .then((result) => {
          this.data.statuses = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitFormExam(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },

  created() {
    this.getAllProp1st();
  },
};
</script>

<style>
</style>