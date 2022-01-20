<template>
  <div class="wrap-post">
        <el-row>
      <el-col :span="24">
        <el-button-group>
          <el-button
            icon="el-icon-circle-plus-outline"
            type="success"
            @click="pickExam()"
            >Choose an examination</el-button
          >
        </el-button-group>
      </el-col>
    </el-row>
    <el-dialog
      title="Choose your examination to grading"
      :visible.sync="dialogVisible"
      width="40%"

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
    <el-table :data="posts" style="width: 100%" max-height="100vh" border>
      <el-table-column fixed prop="id" label="ID" width="50px" align="center">
      </el-table-column>
      <el-table-column prop="student.name" label="Student"></el-table-column>
      <el-table-column prop="type.name" label="Type"></el-table-column>
      <el-table-column prop="category.name" label="Categories">
        <template slot-scope="scope">
          <el-tag effect="dark" type="success" size="medium">
            {{ scope.row.category.name }}</el-tag
          >
        </template>
      </el-table-column>
      <!-- <el-table-column prop="content" label="Content"></el-table-column> -->
      <el-table-column prop="status.name" label="Status"></el-table-column>

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
            icon="el-icon-s-order"
            size="mini"
            @click="handleGrading(scope.row)"
            square
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Grading",
  data() {
    return {
      // 1st stage
      exams: [],

      // 2nd stage
      posts: [],

      dialogVisible: false,
      set_false: false,

      idTeacher: this.$store.getters.id,
      idExam: this.$store.getters.idexam,

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
        .get(`post/${this.idTeacher}:${this.property_post.idExam}`)
        .then((result) => {
          this.posts = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    pickExam() {
      this.dialogVisible = true;
      this.getAllProp1st();
    },

    submitFormExam(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.getAllProp2nd();
          console.log("idExam: " + this.property_post.idExam);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    handleGrading(row) {
      console.log(row.id);
      this.$router.push({ path: `/menu/grade/${row.id}` });
    },

    checkExistExam() {
      if(this.idExam){
        console.log("idexam: " + this.idExam);
        this.property_post.idExam = this.idExam;
        this.getAllProp2nd();
      }

    },
    
  },

  created() {
    this.checkExistExam();
  },
};
</script>

<style>
</style>