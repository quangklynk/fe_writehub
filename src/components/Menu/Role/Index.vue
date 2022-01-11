<template>
  <div>
    <!-- Form -->
    <el-button
      icon="el-icon-circle-plus-outline"
      type="success"
      @click="dialogFormVisible = true"
      >Add new</el-button
    >

    <el-dialog title="Add new role" :visible.sync="dialogFormVisible">
      <el-form :model="ruleform" :rules="rules" ref="ruleform">
        <el-form-item label="Description" label-width="120px" prop="des">
          <el-input v-model="ruleform.des"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addRole('ruleform')"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <!-- ======================================================================== -->
    <el-table :data="roles" style="width: 100%" border>
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
      roles: [],

      dialogFormVisible: false,

      ruleform: {
        des: "",
      },

      rules: {
        des: [
          {
            require: true,
            message: "Please input role description",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    getAllRole() {
      axios
        .get("role")
        .then((result) => {
          this.roles = result.data.data;
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addRole(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("role", this.ruleform)
            .then((result) => {
              console.log(result);
              this.successMess(result.data.status);
              this.getAllRole();
              this.ruleform.des = "";
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    successMess(mess) {
      this.$message({
        message: mess,
        type: "success",
      });
    },

    erroMess() {
      this.$message.error("Oops, this is a error message.");
    },
  },

  created() {
    this.getAllRole();
  },
};
</script>

<style>
</style>