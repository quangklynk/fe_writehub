<template>
  <div class="wrap-post">
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      content: "<h1>Some initial content</h1>",
    };
  },
};
</script>

<style scoped>
.wrap-post{
  background: #ffff;
  height: 500px;
}
</style>