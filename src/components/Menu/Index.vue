<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting">
          <span style="margin-left: 5px">{{ user }}</span></i
        >

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View profile</el-dropdown-item>
          <el-dropdown-item divided>
            <i class="el-icon-error"></i>
            <span @click="log_out">Log out </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container>
      <el-aside width="200px" style="background-color: #fff">
        <el-menu text-color="#171725" active-text-color="#5BA525">
          <router-link to="/menu/">
            <el-menu-item index="1">
              <i class="el-icon-folder"></i><span> Dashboard </span>
            </el-menu-item>
          </router-link>
          <router-link to="/menu/post">
            <el-menu-item index="2">
              <i class="el-icon-chat-line-square"></i><span> Activity </span>
            </el-menu-item></router-link
          >
          <router-link to="/menu/grade">
            <el-menu-item index="3">
              <i class="el-icon-trophy"></i><span> Grading </span>
            </el-menu-item>
          </router-link>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-setting"></i>Settings</template
            >

            <router-link to="/menu/course">
              <el-menu-item index="4-1">Course</el-menu-item>
            </router-link>
            <router-link to="/menu/exam">
              <el-menu-item index="4-2">Examination</el-menu-item>
            </router-link>
            <el-menu-item-group>
              <template slot="title">Property Post</template>
              <router-link to="/menu/type">
                <el-menu-item index="4-3">Type</el-menu-item>
              </router-link>
              <router-link to="/menu/category">
                <el-menu-item index="4-4">Category</el-menu-item>
              </router-link>
              <router-link to="/menu/status">
                <el-menu-item index="4-5">Status</el-menu-item>
              </router-link>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">User</template>
              <router-link to="/menu/teacher">
                <el-menu-item index="4-6">Teacher</el-menu-item>
              </router-link>
              <router-link to="/menu/student">
                <el-menu-item index="4-7">Student</el-menu-item>
              </router-link>
            </el-menu-item-group>

            <router-link to="/menu/role">
              <el-menu-item index="4-8">Roles</el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="background-color: #f4f4f4">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Menu",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    log_out() {
      this.$swal({
        icon: "info",
        title: "Logged out",
        showConfirmButton: false,
      });
      localStorage.removeItem(`token`);
      localStorage.removeItem(`id`);
      localStorage.removeItem(`user`);
      localStorage.removeItem(`role`);
      this.$store.dispatch("id", "");
      this.$store.dispatch("user", "");
      this.$store.dispatch("role", "");
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {},
};
</script>

<style>
.el-header {
  background-color: #ffffff;
  color: #171725;
  line-height: 60px;
  box-shadow: inset 0px -1px 0px #e2e2ea;
}

.el-aside {
  color: #333;
}

.el-icon-setting {
  cursor: pointer;
}
</style>
