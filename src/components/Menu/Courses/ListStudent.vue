<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button-group>
          <el-button icon="el-icon-refresh" @click="getList">Refresh</el-button>
        </el-button-group>
        <el-button-group>
          <el-button
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="dialogFormVisible = true"
            >Add New</el-button
          >
        </el-button-group>
      </el-col>
    </el-row>

    <!-- Add new -->
    <el-dialog title="Add new role" :visible.sync="dialogFormVisible">
      <el-form :model="ruleform" :rules="rules" ref="ruleform">
        <el-form-item label="Student" prop="idStudent">
          <el-select
            v-model="ruleform.idStudent"
            filterable
            allow-create
            default-first-option
            placeholder="Activity Student"
          >
            <el-option
              v-for="item in students"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Is Pay" prop="isPay">
          <el-radio-group v-model="ruleform.isPay">
            <el-radio label="1"> Yes </el-radio>
            <el-radio label="0"> No </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addStudent('ruleform')"
          >Save</el-button
        >
      </span>
    </el-dialog>

    <!-- ======================================================================== -->
    <el-table :data="list" height="70vh" style="width: 100%" border>
      <el-table-column prop="id" label="ID Student"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
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
      ruleform: {
        idCourse: this.$route.params.id,
        idStudent: "",
        isPay: "",
      },

      students: [],

      rules: {
        idStudent: [
          {
            required: true,
            message: "Please select student",
            trigger: "change",
          },
        ],
        isPay: [
          {
            required: true,
            message: "Please select activity isPay",
            trigger: "change",
          },
        ],
      },
    };
  },

  methods: {
    getList() {
      axios
        .get(`stuincourse/list/${this.$route.params.id}`)
        .then((result) => {
          this.list = result.data.data;
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getListStudent() {
      axios
        .get(`stuincourse/student/${this.$route.params.id}`)
        .then((result) => {
          this.students = result.data.data;
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addStudent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          axios
            .post("stuincourse", this.ruleform)
            .then((result) => {
              console.log(result);
              this.ruleform.isPay = "";
              this.ruleform.idStudent = "";
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
  },

  created() {
    this.getList();
    this.getListStudent();
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
