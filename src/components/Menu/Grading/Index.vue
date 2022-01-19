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

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Marking",
  data() {
    return {
      posts: [],
      exams: [],

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
    getAllProp() {
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
    this.getAllProp();
  },
};
</script>

<style>
</style>