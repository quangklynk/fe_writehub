<template>
  <div>
    <div>
      <el-row>
        <el-col
          :span="10"
          style="margin: 15px 0px; font-size: 18px; font-weight: 700"
          >Student's Name : {{ post.student.name }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8"
          >Type :
          <el-tag effect="dark" type="success" size="medium">
            {{ post.type.name }}</el-tag
          >
        </el-col>
        <el-col :span="8"
          >Category :
          <el-tag effect="dark" type="success" size="medium">{{
            post.category.name
          }}</el-tag>
        </el-col>
        <el-col :span="8"
          >Status :
          <el-tag effect="dark" type="success" size="medium">
            {{ post.status.name }}</el-tag
          >
        </el-col>
      </el-row>
    </div>
    <div>
      <p class="main-content" v-html="post.content"></p>
    </div>
    <div v-if="!post.score">
      Score:
      <el-input-number
        v-model="score"
        @change="handleChange"
        :min="0"
        :max="100"
        :step="5"
      ></el-input-number>
      <el-button
        type="primary"
        icon="el-icon-document-checked"
        size="medium"
        @click="submitScore()"
        square
        style="margin-left: 10px"
        >Submit score</el-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      score: 0,
      post: {
        category: {
          name: "",
        },
        type: {
          name: "",
        },
        status: {
          name: "",
        },
      },
    };
  },

  methods: {
    getPostByID() {
      axios
        .get(`post/${this.$route.params.id}`)
        .then((result) => {
          this.post = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleChange(value) {
      console.log(value);
    },

    submitScore() {
      this.post.score = this.score;
      axios
        .patch(`post/${this.$route.params.id}`, this.post)
        .then((result) => {
          console.log(result);
          this.$swal({
            icon: "success",
            title: "Submit successful",
            showConfirmButton: false,
          });
          this.$store.dispatch("idexam", this.post.idExam);
          localStorage.setItem("idexam", this.post.idExam);

          this.$router.go(-1);
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            icon: "error",
            title: err,
            showConfirmButton: false,
          });
        });
    },
  },

  created() {
    this.getPostByID();
  },
};
</script>

<style>
.main-content {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 20px;
  background: #fff;
  border-radius: 4px;
}
</style>
