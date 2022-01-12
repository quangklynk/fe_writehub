<template>
  <div>
    <el-table :data="teachers" style="width: 100%" max-height="100vh" border>
      <el-table-column fixed prop="id" label="ID" width="50px" align="center">
      </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column
        prop="idUser"
        label="ID Account"
        width="100px"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="user.email" label="Email"> </el-table-column>
      <el-table-column prop="birth" label="Birth" width="100px">
      </el-table-column>
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
      <el-table-column prop="user.flag" label="Status" align="center">
        <template slot-scope="scope">
          {{ scope.row.user.flag == 0 ? "Active" : "Leave" }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.row)"
            square
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-refresh-left"
            size="mini"
            square
            v-if="scope.row.user.flag"
            @click="reverseRow(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            square
            v-else
            @click="deleteRow(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
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

          this.teachers.forEach((element) => {
            element.user.role = element.user.idRole == 1 ? "admin" : "teacher";
          });

          console.log(this.teachers);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteRow(index, row) {
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
          text: "You will be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          // reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`teacher/${row.idUser}`)
              .then((res) => {
                console.log(res);
                if (!res.data.error) {
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

    reverseRow(index, row) {
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
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, revert it!",
          // reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .patch(`teacher/${row.idUser}/revert`)
              .then((res) => {
                console.log(res);
                if (!res.data.error) {
                  swalWithBootstrapButtons.fire("Reverted!", "", "success");
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

    handleEdit(row) {
      console.log(row.id);
      this.$router.push({ path: `/menu/teacher/${row.id}` });
    },
  },
  async created() {
    this.getAllTeacher();
  },
};
</script>

<style>
</style>