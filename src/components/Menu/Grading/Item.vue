<template>
  <div>
    <div>
      <el-row>
        <el-col :span="8"
          >Type :
          <el-tag effect="dark" type="success" size="medium">
            {{ post[0].type.name }}</el-tag
          >
        </el-col>
        <el-col :span="8"
          >Category :
          <el-tag effect="dark" type="success" size="medium">{{
            post[0].category.name
          }}</el-tag>
        </el-col>
        <el-col :span="8"
          >Status :
          <el-tag effect="dark" type="success" size="medium">
            {{ post[0].status.name }}</el-tag
          >
        </el-col>
      </el-row>
    </div>
    <br />
    <p class="main-content">
      {{ post[0].content }}
    </p>

    <br />
    <div>
      Score:
      <el-input-number
        v-model="num"
        @change="handleChange"
        :min="1"
        :max="100"
      ></el-input-number>
      <el-button
        type="primary"
        icon="el-icon-document-checked"
        size="medium"
        @click="submitScore()"
        square
        style="margin-left: 10px;"
      >Submit score</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GradingItem",
  data() {
    return {
      num: 1,
      post: [],
    };
  },

  methods: {
    getPostByID() {
      axios
        .get(`post/${this.$route.params.id}`)
        .then((result) => {
          this.post = result.data.data;
          console.log(this.post);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleChange(value) {
      console.log(value);
    },

    submitScore() {
      this.post[0].score = this.num;
      axios
        .patch(`post/${this.$route.params.id}`, this.post[0])
        .then((result) => {
          this.post = result.data.data;
          console.log(this.post);

          this.$router.push({ path: `/menu/grade` });
        })
        .catch((err) => {
          console.log(err);
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
}
</style>