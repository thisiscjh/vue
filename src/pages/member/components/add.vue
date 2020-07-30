<template>
  <div>
    <!-- 添加表格 -->
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="80px">
         <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
         <el-input v-model="form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
       
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="update()">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 添加表格 -->
  </div>
</template>
<script>

import { reqMemberUpdate,reqMemberDetail} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import {mapGetters,mapActions} from "vuex"
export default {
  props: ["info"],
  computed:{
    ...mapGetters({
      list:"member/list"
    })
  },
  components: {},
  data() {
    return {
      form: {
        nickname: "",
        phone:"",
        password:"",
        status: 1,
      },
      };
  },
  methods: {
    ...mapActions({
      reqList:"member/reqList"
    }),
    //重置样式
    empty() {
      this.form = {
        nickname: "",
        phone:"",
        password:"",
        status: 1,
      };
    },
    cancel() {
      this.info.show = false;
        this.empty();
    },
    getDetail(id){
      reqMemberDetail({uid:id}).then((res)=>{
      this.form=res.data.list;
      this.form.id=id
      console.log(id)
      })

      
    },
    /////////////
    update(){
      reqMemberUpdate(this.form).then((res)=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.empty()
          this.cancel()
          this.reqList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>