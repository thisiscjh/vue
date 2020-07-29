<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
            <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isnew==1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ishot==1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cPage"
      :page-size="size"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
import {reqManDelete} from "../../../util/request"
import {successAlert,warningAlert} from "../../../util/alert"
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "manage/list",
      total: "manage/total",
      size: "manage/size",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "manage/reqList",
      reqTotal: "manage/reqTotal",
      changePage: "manage/changePage",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      reqManDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqList();
          this.reqTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改页码
    cPage(a) {
      this.changePage(a);
      this.reqList();
    },
  },
  mounted() {
    this.reqTotal();
    this.reqList();
  },
};
</script>
<style scoped>
img{
    width: 80px;
    height: 80px;
}
</style>