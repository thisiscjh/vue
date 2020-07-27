<template>
<div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="edit($event)"></v-list> 
 </div>
</template>
<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default { 
components:{
    vList,
    vAdd 
},
data(){return{
    info:{
        show:false,
        title:"添加角色",
        isAdd:true
    }
}},
methods:{
    //点击添加按钮
    add(){
        this.info.show=true;
        this.info.title="添加角色"
        this.info.isAdd=true;
    },
    //点击编辑
    edit(id){
       this.info.show=true;
       this.info.title="编辑角色";
       this.info.isAdd=false
       this.$refs.add.getDetail(id)
    }
},
mounted(){},
}
</script>
<style scoped>
</style>