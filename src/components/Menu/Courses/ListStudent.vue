<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button-group>
          <el-button icon="el-icon-refresh" @click="getList">Refresh</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <!-- ======================================================================== -->
    <el-table :data="list" height="70vh" style="width: 100%" border>
      <el-table-column prop="id" label="ID Student"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="created_at" label="Created at"> </el-table-column>
      <el-table-column prop="updated_at" label="Updated at"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "List",
  data() {
    return {
      list: [],

      dialogFormVisible: false,
      dialogFormEdit: false,
      ruleform: {
        des: "",
      },
      editForm: {
        des: "",
      },

      rules: {
        des: [
          {
            required: true,
            message: "Please input description",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    getList() {
      axios
        .get(`stuincourse/${this.$route.params.id}`)
        .then((result) => {
          this.list = result.data.data;
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.getList();
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
