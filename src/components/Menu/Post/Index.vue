<template>
  <div class="wrap-post">
    <el-dialog
      title="Choose property for post"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="set_false"
      :close-on-press-escape="set_false"
      :show-close="set_false"
    >
      <el-form :model="property_post" :rules="rules" ref="property_post">
        <el-row>
          <el-col :span="12">
            <el-form-item label="Type" prop="idType">
              <el-select
                @change="changeSelect($event, `type`)"
                v-model="property_post.idType"
                filterable
                allow-create
                default-first-option
                placeholder="Activity Type"
              >
                <el-option
                  v-for="item in data.types"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Category" prop="idCategory">
              <el-select
                v-model="property_post.idCategory"
                filterable
                allow-create
                default-first-option
                @change="changeSelect($event, `category`)"
                placeholder="Activity Category"
              >
                <el-option
                  v-for="item in data.categories"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="Status" prop="idStatus">
              <el-select
                v-model="property_post.idStatus"
                filterable
                allow-create
                default-first-option
                placeholder="Activity Status"
                @change="changeSelect($event, `status`)"
              >
                <el-option
                  v-for="item in data.statuses"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Exam" prop="idExam">
              <el-select
                v-model="property_post.idExam"
                filterable
                allow-create
                default-first-option
                placeholder="Activity Exam"
                @change="changeSelect($event, `exam`)"
              >
                <el-option
                  v-for="item in data.exams"
                  :key="item.id"
                  :label="item.dateExam"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('property_post')"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
    <div>
      <el-row>
        <el-col :span="6"
          >Type :
          <el-tag effect="dark" type="success" size="medium">
            {{ showData.type }}</el-tag
          >
        </el-col>
        <el-col :span="6"
          >Category :
          <el-tag effect="dark" type="success" size="medium">{{
            showData.category
          }}</el-tag>
        </el-col>
        <el-col :span="6"
          >Status :
          <el-tag effect="dark" type="success" size="medium">
            {{ showData.status }}</el-tag
          >
        </el-col>
        <el-col :span="6"
          >Exam :
          <el-tag effect="dark" type="success" size="medium">
            {{ showData.exam }}</el-tag
          >
        </el-col>
      </el-row>
    </div>
    <vue-editor v-model="property_post.content"></vue-editor>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark"></div
      ></el-col> </el-row
    ><el-button type="primary" @click="storePost">Submit</el-button>
  </div>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      dialogVisible: true,
      set_false: false,
      property_post: {
        idType: "",
        idCategory: "",
        idStatus: "",
        idExam: "",
        idStudent: this.$store.getters.id,
        content: "",
      },
      rules: {
        idType: [
          {
            required: true,
            message: "Please select",
            trigger: "change",
          },
        ],
        idExam: [
          {
            required: true,
            message: "Please select",
            trigger: "change",
          },
        ],
        idCategory: [
          {
            required: true,
            message: "Please select",
            trigger: "change",
          },
        ],
        idStatus: [
          {
            required: true,
            message: "Please select",
            trigger: "change",
          },
        ],
      },
      data: {
        types: [],
        categories: [],
        statuses: [],
        exams: [],
      },
      showData: {
        type: "",
        category: "",
        status: "",
        exam: "",
      },
    };
  },
  methods: {
    getAllProp() {
      axios
        .get(`type`)
        .then((result) => {
          this.data.types = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`category`)
        .then((result) => {
          this.data.categories = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`status`)
        .then((result) => {
          this.data.statuses = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(`exam/student/${this.property_post.idStudent}`)
        .then((result) => {
          this.data.exams = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeSelect(e, list) {
      if (list == "type") {
        this.showData.type = this.data.types.find((x) => x.id === e).name;
      } else if (list == "status") {
        this.showData.status = this.data.statuses.find((x) => x.id === e).name;
      } else if (list == "category") {
        this.showData.category = this.data.categories.find(
          (x) => x.id === e
        ).name;
      } else {
        this.showData.exam = this.data.exams.find((x) => x.id === e).dateExam;
      }
    },
    storePost() {
      axios
        .post("post", this.property_post)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getAllProp();
  },
};
</script>

<style scoped>
.wrap-post {
  background: #ffff;
  height: 500px;
}
</style>