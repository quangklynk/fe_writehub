<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting">
          <span style="margin-left: 5px">{{ user }}</span></i
        >

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container>
      <el-aside width="200px" style="background-color: #fff">
        <el-menu text-color="#171725" active-text-color="#5BA525">
          <el-menu-item index="1">
            <i class="el-icon-message"></i><span> Dashboard </span>
          </el-menu-item>
          <router-link to="/menu/post">
            <el-menu-item index="2">
              <i class="el-icon-message"></i><span> Activity </span>
            </el-menu-item></router-link
          >
          <el-menu-item index="3">
            <i class="el-icon-message"></i><span> Challenges </span>
          </el-menu-item>

          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-setting"></i>Settings</template
            >

            <router-link to="/menu/course">
              <el-menu-item index="3-1">Courses</el-menu-item>
            </router-link>
            <el-menu-item-group>
              <template slot="title">Property Post</template>
              <router-link to="/menu/type">
                <el-menu-item index="3-2">Type</el-menu-item>
              </router-link>
              <router-link to="/menu/category">
                <el-menu-item index="3-3">Category</el-menu-item>
              </router-link>
              <router-link to="/menu/status">
                <el-menu-item index="3-4">Status</el-menu-item>
              </router-link>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">User</template>
              <router-link to="/menu/teacher">
                <el-menu-item index="3-5">Teacher</el-menu-item>
              </router-link>
              <router-link to="/menu/student">
                <el-menu-item index="3-6">Student</el-menu-item>
              </router-link>
            </el-menu-item-group>

            <router-link to="/menu/role">
              <el-menu-item index="3-7">Roles</el-menu-item>
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
    return {};
  },
  methods: {},
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