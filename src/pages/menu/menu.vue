<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加弹框 -->
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        show: false,
        title: "菜单添加",
        isAdd: true,
      },
    };
  },
  methods: {
    add() {
      this.info.show = true
        this.info.title = "菜单添加"
        this.info.isAdd = true;
    },
    edit(id){
      this.info.show=true;
      this.info.title="菜单编辑";
      this.info.isAdd=false;
      this.$refs.add.getDetail(id);
      console.log(this.$refs.add.getDetail(id))
    }
  },
  mounted() {},
};
</script>
<style scoped>

</style>