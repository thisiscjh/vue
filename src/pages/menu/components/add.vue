<template>
  <div>
    <!-- 添加表格 -->
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid" placeholder="请选择菜单类型">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="80px" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="80px" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
    <!-- 添加表格 -->
  </div>
</template>
<script>

import { reqMenuAdd ,reqMenuUpdate,reqMenuDetail} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import {mapGetters,mapActions} from "vuex"
export default {
  props: ["info"],
  computed:{
    ...mapGetters({
      list:"menu/list"
    })
  },
  components: {},
  data() {
    return {
      form: {
        name: "",
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      urls: [
        "/home",
        "/menu",
        "/role",
        "/manage",
        "/members",
        "/spec",
        "/goods",
        "/banner",
        "/strator",
      ],
      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ],
    };
  },
  methods: {
    ...mapActions({
      reqList:"menu/reqList"
    }),
    //重置样式
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    add() {
      reqMenuAdd(this.form).then((res) => {
       console.log(res)
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //重置form数据
          this.empty();
          //弹框消失
          this.cancel();
          this.reqList()
        }else{
          warningAlert(res.data.msg)
        }
      });
    },
    getDetail(id){
      console.log(id)
      reqMenuDetail({id:id}).then((res)=>{
      this.form=res.data.list;
      this.form.id=id
      console.log(id)
      })

      
    },
    /////////////
    update(){
      reqMenuUpdate(this.form).then((res)=>{
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