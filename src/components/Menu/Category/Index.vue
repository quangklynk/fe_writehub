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
          <el-button icon="el-icon-refresh" @click="getAllCategory"
            >Refresh</el-button
          >
        </el-button-group>
      </el-col>
    </el-row>
    <!-- Form Add-->
    <el-dialog title="Add new category" :visible.sync="dialogFormVisible">
      <el-form :model="ruleform" :rules="rules" ref="ruleform">
        <el-form-item label="Name" label-width="120px" prop="name">
          <el-input v-model="ruleform.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleform')">Cancel</el-button>
        <el-button type="primary" @click="addRole('ruleform')">Save</el-button>
      </span>
    </el-dialog>

    <!-- Form Edit-->
    <el-dialog title="Edit category" :visible.sync="dialogFormEdit">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="Name" label-width="120px" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">Cancel</el-button>
        <el-button type="primary" @click="updateRole('editForm')"
          >Save</el-button
        >
      </span>
    </el-dialog>
    <!-- ======================================================================== -->
    <el-table :data="categorys" height="70vh" style="width: 100%" border>
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="created_at" label="Created at"> </el-table-column>
      <el-table-column prop="updated_at" label="Updated at"> </el-table-column>
      <el-table-column label="Operations" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            @click.native.prevent="deleteRow(scope.$index, categorys, scope.row)"
            type="text"
            size="small"
          >
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Category",
  data() {
    return {
      categorys: [],

      dialogFormVisible: false,
      dialogFormEdit: false,
      ruleform: {
        name: "",
      },
      editForm: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    getAllCategory() {
      axios
        .get("category")
        .then((result) => {
          this.categorys = result.data.data;
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          axios
            .post("category", this.ruleform)
            .then((result) => {
              console.log(result);
              this.successMess(result.data.status);
              this.getAllCategory();
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

    resetForm(formName) {
      if (formName == "ruleform") {
        this.dialogFormVisible = false;
      } else {
        this.dialogFormEdit = false;
      }
      this.$refs[formName].resetFields();
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

    deleteRow(index, rows, row) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "el-button el-button--primary",
          cancelButton: "el-button el-button--danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          // reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`category/${row.id}`)
              .then((res) => {
                console.log(res);
                if (!res.data.error) {
                  rows.splice(index, 1);
                  swalWithBootstrapButtons.fire("Deleted!", "", "success");
                } else {
                  swalWithBootstrapButtons.fire(
                    "Cancelled!",
                    res.data.mess,
                    "error"
                  );
                }
              })
              .catch((err) => {
                swalWithBootstrapButtons.fire("Error~~~", `${err}`, "error");
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Cancelled", "", "error");
          }
        });
    },

    handleEdit(index, row) {
      this.dialogFormEdit = true;
      this.editForm = row;
      console.log(this.editForm);
    },
    updateRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormEdit = false;
          this.$swal
            .fire({
              title: "Are you sure?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, I do",
            })
            .then((result) => {
              if (result.isConfirmed) {
                axios
                  .post(`category`, this.editForm)
                  .then((result) => {
                    console.log(result);
                    this.$swal({
                      icon: "success",
                      title: "Update successful",
                      showConfirmButton: false,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    this.$swal({
                      icon: "error",
                      title: "Error",
                      text: err,
                      showConfirmButton: false,
                    });
                  });
              }
            });
        } else {
          return false;
        }
      });
    },
  },

  created() {
    this.getAllCategory();
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>