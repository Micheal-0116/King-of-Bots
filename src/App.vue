<template>
  <NavBar /> 
  <router-view></router-view>
</template>

<script>
  //那个router-view会自动根据我们的网址来变化，在index里面去定义如何变化
  //导入我们手写的导航栏组件, vue中下载bootstrap的样式、格式
import NavBar from './components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

export default {
  components: {
    NavBar
  },
  setup() {
     //$.ajax({
      //url:  "http://127.0.0.1:3000/user/account/token/",
      //type: "post",
      //data: {
      //  username: 'zjt',
      //  password: "pzjt",
      //},
      //success(resp) {
      //  console.log(resp);
      //},
      //error(resp) {
      //  console.log(resp);
      //}
     //})


    // $.ajax({
    //   url: "http://127.0.0.1:3000/user/account/register/",
    //   type: "post",
    //   data: {
    //     username: "yxc2",
    //     password: "123",
    //     confirmedPassword: "123",
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // })
  }

}
</script>

<style>
body {
  background-image: url("~@/assets/images/background.png");
  background-size: cover;
}
</style>
