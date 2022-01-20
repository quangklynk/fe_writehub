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
        <el-col :span="6"
          >Score :
          <el-tag effect="dark" type="danger" size="medium">
            <span class="score"> {{ post.score || "Pending..." }}</span></el-tag
          >
        </el-col>
        <el-col :span="6"
          >Type :
          <el-tag effect="dark" type="success" size="medium">
            {{ post.type.name }}</el-tag
          >
        </el-col>
        <el-col :span="6"
          >Category :
          <el-tag effect="dark" type="success" size="medium">{{
            post.category.name
          }}</el-tag>
        </el-col>
        <el-col :span="6" style="text-align: end"
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
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

.score {
  font-weight: 700;
  font-size: 20px;
}
</style>
