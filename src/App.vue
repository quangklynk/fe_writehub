<template>
  <div id="app">
    <Menu />
  </div>
</template>

<script>
import  Menu  from "./components/Auth/Index.vue";
export default {
  name: "App",
  components: {
    Menu,
  },
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
