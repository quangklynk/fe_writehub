<template>
  <!-- Thíu số học viên ngày học -->
  <div>
    <el-table :data="courses" style="width: 100%" max-height="520px" border>
      <el-table-column fixed prop="id" label="ID" width="50px" align="center">
      </el-table-column>
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="teacher" label="Teacher">
        <template slot-scope="scope">
          {{
            "IDTeacher: " +
            scope.row.teacher.id +
            " - " +
            scope.row.teacher.name
          }}
        </template>
      </el-table-column>

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
      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.row)"
            square
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            square
            @click="deleteRow(scope.$index, scope.row)"
          ></el-button>
          <el-button
            icon="el-icon-s-order"
            size="mini"
            square
            @click="goToList(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "course",
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    getAllCourse() {
      axios
        .get("course")
        .then((result) => {
          this.courses = result.data.data;
          console.log(this.courses);
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
              .delete(`course/${row.id}`)
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
              .patch(`course/${row.idUser}/revert`)
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
      this.$router.push({ path: `/menu/course/item/${row.id}` });
    },

    goToList(row) {
      console.log(row.id);
      this.$router.push({ path: `/menu/course/list/${row.id}` });
    },
  },
  async created() {
    this.getAllCourse();
  },
};
</script>

<style></style>
