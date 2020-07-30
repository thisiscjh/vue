<template>
  <div>
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
        title: "会员添加",
      },
    };
  },
  methods: {
    edit(id){
      this.info.show=true;
      this.info.title="会员编辑";
      this.$refs.add.getDetail(id);
      console.log(this.$refs.add.getDetail(id))
    }
  },
  mounted() {},
};
</script>
<style scoped>

</style>