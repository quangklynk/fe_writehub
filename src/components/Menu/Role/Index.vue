<template>
  <div>
    <el-table :data="data" height="250" style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="des" label="Description"> </el-table-column>
      <el-table-column prop="created_at" label="Created at"> </el-table-column>
      <el-table-column prop="updated_at" label="Updated at"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Role",
  data() {
    return {
      data: [],
    };
  },

  methods: {
    getAllRole() {
      axios
        .get("role")
        .then((result) => {
          this.data = result.data.data;
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.getAllRole();
  },
};
</script>

<style>
</style>