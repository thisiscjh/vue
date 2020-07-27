<template>
  <div>
    <template>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="角色编号" width="180"></el-table-column>  
        <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <del-Btn class="btn" @confirm="del(scope.row.id)"></del-Btn>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex"
import { reqMenuDelete, reqRoleDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed:{
    ...mapGetters({
      list:"role/list"
    })
  },
  data() {
    return {
  }
  },
  methods: {
    ...mapActions({
      reqList:"role/reqList"
    }),
    edit(id){
      this.$emit("edit",id)
    },
    //删除
    del(id){
      reqRoleDelete({id:id}).then(res=>{
        if(res.data.code==200){
        successAlert(res.data.msg)
        this.reqList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
    
  },
  mounted() {
    this.reqList()
  },
};
</script>
<style scoped>
.btn{
  float: left;
  margin-left: 30px;
}
.el-button{
  float: left;
}
</style>