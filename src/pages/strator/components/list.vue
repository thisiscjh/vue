<template>
<div>
     <template>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="80"></el-table-column>  
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
            <del-Btn class="btn" @confirm="del(scope.row.uid)"></del-Btn>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination background layout="prev,pager,next" @current-change="xPage" :page-size="size" :total="total"></el-pagination>
 </div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import {reqStratorDetail,reqStratorDelete} from "../../../util/request"
import {successALert,warningAlert, successAlert} from "../../../util/alert"
export default { 
    computed:{
        ...mapGetters({
            list:"strator/list",
            total:"strator/total",
            size:"strator/size"
        })
    },
components:{},
data(){return{}},
methods:{
    ...mapActions({
        reqList:"strator/reqList",
        reqTotal:"strator/reqTotal",
        changePage:"strator/changePage"
    }),
    edit(id){
        this.$emit("edit",id)
    },
    del(id){
        reqStratorDelete({uid:id}).then(res=>{
            if(res.data.code==200){
                successAlert("删除成功")
                this.reqList()
                this.changePage()
            }else{
                warningAlert(res.data.msg)
            }
        })
    },
    xPage(x){
        this.changePage(x)
        this.reqList()
    }
},
mounted(){
    this.reqTotal()
    this.reqList()
},
}
</script>
<style scoped>
</style>