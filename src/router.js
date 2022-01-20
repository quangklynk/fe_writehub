import Vue from "vue";
import Router from "vue-router";

// Error page
import Error from "./components/Error/404.vue";

// Login
import Login from "./components/Auth/Login.vue";
import Register from "./components/Auth/Register.vue";
import MenuLogin from "./components/Auth/Index.vue";
import Forgot from "./components/Auth/Forgot.vue";

// Menu
import Menu from "./components/Menu/Index.vue";

// DashBoard
import DashBoard from "./components/Menu/DashBoard/Index.vue";

// Teacher
import Teacher from "./components/Menu/Teacher/Index.vue";
import ItemTeacher from "./components/Menu/Teacher/Item.vue";
import AddTeacher from "./components/Menu/Teacher/Add.vue";

// Student
import Student from "./components/Menu/Student/Index.vue";
import StudentItem from "./components/Menu/Student/Item.vue";

// Role
import Role from "./components/Menu/Role/Index.vue";

// Courses
import Courses from "./components/Menu/Courses/Index.vue";
import ItemCourses from "./components/Menu/Courses/Item.vue";
import AddCourses from "./components/Menu/Courses/Add.vue";
import ListStudent from "./components/Menu/Courses/ListStudent.vue";

// Category
import Category from "./components/Menu/Category/Index.vue";

// Status
import Status from "./components/Menu/Status/Index.vue";

// Post
import Post from "./components/Menu/Post/Index.vue";

// Type
import Type from "./components/Menu/Type/Index.vue";

// Exam
import Exam from "./components/Menu/Exam/Index.vue";
import ExamItem from "./components/Menu/Exam/Item.vue";

//Grading
import Grade from "./components/Menu/Grading/Index.vue";
import GradeItem from "./components/Menu/Grading/Item.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: MenuLogin,
      children: [
        { path: "/", component: Login },
        { path: "/forgot", component: Forgot },
        { path: "/register", component: Register },
      ],
    },

    {
      path: "/menu",
      component: Menu,
      children: [
        // DashBoard
        { path: "/menu/", component: DashBoard },

        // Teacher
        { path: "/menu/teacher", component: Teacher },
        { path: "/menu/teacher/:id", component: ItemTeacher },
        { path: "/menu/add/teacher", component: AddTeacher },

        // Student
        { path: "/menu/student", component: Student },
        { path: "/menu/student/:id", component: StudentItem },

        // Courses
        { path: "/menu/course", component: Courses },
        { path: "/menu/course/item/:id", component: ItemCourses },
        { path: "/menu/course/add", component: AddCourses },
        { path: "/menu/course/list/:id", component: ListStudent },

        // Category
        { path: "/menu/category", component: Category },

        // Status
        { path: "/menu/status", component: Status },
        // Role
        { path: "/menu/role", component: Role },
        // Post
        { path: "/menu/post", component: Post },
        // Type
        { path: "/menu/type", component: Type },
        // Exam
        { path: "/menu/exam", component: Exam },
        { path: "/menu/exam/:id", component: ExamItem },

        //Grading
        { path: "/menu/grade", component: Grade },
        { path: "/menu/grade/:id", component: GradeItem },
      ],
    },

    { path: "/404", name: "errorpage", component: Error }, //token, user
    { path: "*", redirect: "/404" },
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("token");
  if (to.path == "/forgot" || to.path == "/reset" || to.path == "/register") {
    next();
  } else if (to.path != "/" && !loggedIn) {
    next("/");
  }
  next();
});

export default router;
