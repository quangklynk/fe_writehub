<template>
  <div>
    <el-row
      v-for="item in display_posts"
      :key="item.id"
      :gutter="20"
      class="set-margin"
    >
      <el-col :span="8" v-for="item1 in item" :key="item1.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ "Topic: " + item1.category.name }}</span>
            <span class="score">{{ item1.score || "Null" }}</span>
          </div>
          <div>
            <el-tag type="success">{{ item1.type.name }}</el-tag>
            <el-tag type="danger"> {{ item1.status.name}}</el-tag>
          </div>
          <div class="author">
            <p>Author: {{ item1.student.name }}</p>
            <p v-if="item1.created_at">
              {{ item1.created_at | formatDate }}
            </p>
            <p v-else>Null</p>
          </div>
          <div class="text item" v-html="item1.content"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      posts: [],
      display_posts: [],
    };
  },
  methods: {
    getAllPost() {
      axios
        .get("post")
        .then((result) => {
          this.posts = result.data.data;
          console.log(result);

          let i, j, chunk, temporary;
          chunk = 3;
          for (i = 0, j = this.posts.length; i < j; i += chunk) {
            temporary = this.posts.slice(i, i + chunk);
            this.display_posts.push(temporary);
          }
          console.log(this.display_posts);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getAllPost();
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
  height: 100px;
  overflow: hidden;
}

.item {
  margin-bottom: 18px;
}

.clearfix {
  display: flex;
  justify-content: space-between;
}

.box-card {
  width: 100%;
  cursor: pointer;
}

.set-margin {
  margin-bottom: 20px;
}

.score {
  display: inline-block;
  border: 1px solid #000;
  padding: 5px;
  border-radius: 5px;
  background: #6f25a5;
  color: #fff;
  font-weight: 600;
  width: 60px;
  text-align: center;
}

.author {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  font-style: italic;
  color: #aaaaaa;
}
</style>
