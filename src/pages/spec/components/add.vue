<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item class="box" label="规格属性" v-for="(item,index) in attrArr" :key="index" label-width="80px">
          <el-input v-model="item.value" class="inp"></el-input>
          <el-button type="primary" v-if="index==0" @click="addAttr" class="btn">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { successAlert, wanringAlert, warningAlert } from "../../../util/alert";
import {
  reqSpecAdd,
  reqSpecUpdate,
  reqSpecDetail,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
 props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  data() {
    return {
      attrArr: [
        {
          value: "",
        },
      ],

      //提交给后端的数据
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  mounted() {
   
  },
  methods: {
    ...mapActions({
      
      reqList: "spec/reqList",
      reqTotal: "spec/reqTotal",
    }),

    //新增规格属性
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    //删除规格属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },

    //置空
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    //取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //添加
    add() {
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }

      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      //发起添加请求
      reqSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //清空
          this.empty();
          //弹框消失
          this.cancel();
          //重新获取角色列表数据
          this.reqTotal();
          //重新获取总的数量
          this.reqList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条数据
    getDetail(id) {
      //ajax
      reqSpecDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(res.data.list[0].attrs).map((item) => ({
          value: item,
        }));
      });
    },
    //点击了修改
    update() {
       if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }

      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.reqList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped lang="stylus">
.add >>> .el-form-item__content {
  display: flex !important;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-button {
  width: auto;
   margin:0;
}
</style>