<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button-group>
          <el-button
            icon="el-icon-circle-plus-outline"
            type="success"
            @click="dialogFormVisible = true"
            >Add new</el-button
          >
          <el-button icon="el-icon-refresh" @click="getAllType"
            >Refresh</el-button
          >
        </el-button-group>
      </el-col>
    </el-row>
    <!-- Form Add-->
    <el-dialog title="Add new type" :visible.sync="dialogFormVisible">
      <el-form :model="ruleform" :rules="rules" ref="ruleform">
        <el-form-item label="Type's name" label-width="120px" prop="name">
          <el-input v-model="ruleform.name"></el-input>
        </el-form-item>
      </el-form>
            <!-- navigation button -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleform')">Cancel</el-button>
        <el-button type="primary" @click="addType('ruleform')">Save</el-button>
      </span>
    </el-dialog>

    <!-- =========================== Info table ================================ -->
    <el-table :data="type" height="70vh" style="width: 100%" border>
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="created_at" label="Created at"> </el-table-column>
      <el-table-column prop="updated_at" label="Updated at"> </el-table-column>
      <el-table-column label="Operations" width="120">
        <!-- <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            @click.native.prevent="deleteRow(scope.$index, roles, scope.row)"
            type="text"
            size="small"
          >
            Remove
          </el-button>
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Type",
  data() {
    return {
      type: [],

      dialogFormVisible: false,

      ruleform: {
        name: "",
      },

      rules: {
        name: [
          {
            required: true,
            message: "Please input name of type",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    getAllType() {
      axios
        .get("type")
        .then((result) => {
          this.type = result.data.data;
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    resetForm(formName) {
      if (formName == "ruleform") {
        this.dialogFormVisible = false;
      } else {
        this.dialogFormEdit = false;
      }
      this.$refs[formName].resetFields();
    },

    addType(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          axios
            .post("type", this.ruleform)
            .then((result) => {
              console.log(result);
              this.successMess(result.data.status);
              this.getAllType();
              this.ruleform.name = "";
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
  },

  created() {
    this.getAllType();
  },
};
</script>

<style>
</style>