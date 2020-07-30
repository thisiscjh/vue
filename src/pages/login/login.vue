<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input class="input" v-model="user.username" placeholder="账号"></el-input>
      <el-input class="input" v-model="user.password" placeholder="密码" show-password></el-input>
      <div class="button">
       <el-button  type="primary" @click="login">登录</el-button>  
      </div>
    </div>
  </div>
</template>
<script>
import {reqLogin} from "../../util/request"
import {successAlert,warningAlert} from "../../util/alert"
export default {
  components: {},
  data() {
    return {
      user:{
        username:"",
        password:""
      }
        
    };
  },
  methods: {
      login(){
          // this.$router.push("/")
             reqLogin(this.user).then(res=>{
              console.log();
             })  
      }
  },
  mounted() {},
};
</script>
<style scoped>
.login{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right, #553444, #303d60 );
}
.con{
    width: 350px;
    padding: 20px;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.con h3{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    line-height: 60px;
}
.con .input{
    margin-bottom: 20px;
}
.button{
    text-align: center;
}
</style>