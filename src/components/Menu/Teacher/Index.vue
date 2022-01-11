<template>
  <div>
    <el-table :data="teachers" style="width: 100%" max-height="100vh" border>
      <el-table-column fixed prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="idUser" label="IDUser"> </el-table-column>
      <el-table-column prop="birth" label="Birth"> </el-table-column>
      <el-table-column prop="address" label="Address"> </el-table-column>
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
      <!-- <el-table-column fixed="right" label="Operations">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            @click="deleteRow(scope.$index, teachers)"
            type="text"
            size="small"
          >
            Remove
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Teacher",
  data() {
    return {
      teachers: [],
    };
  },
  methods: {
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  },
  async created() {
    this.getAllTeacher();
  },
};
</script>

<style>
</style>