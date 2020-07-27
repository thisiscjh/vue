<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="80px">
          <!-- :default-checked-keys="[1,5]" -->
          <el-tree :data="menuList" :default-checked-keys="defaultKey" show-checkbox node-key="id" :props="defaultProps" ref="tree"></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqRoleAdd, reqRoleList, reqRoleDetail,reqRoleUpdate } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
        
      },
      defaultKey:[],
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    if (this.reqMenuList.length == 0) {
      this.reqMenuList();
    }
  },
  methods: {
    ...mapActions({
      reqMenuList: "menu/reqList",
      reqRoleList: "role/reqList",
    }),
    //置空
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
        
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    cancel() {
      this.info.show = false;
      if(!this.info.isAdd){
        this.empty()
      }
    },
    add() {
      //获取tree的key赋值给form.menu
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      //添加角色
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.list);
          this.empty();
          this.cancel();
          //重新获取角色列表信息
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条数据
    getDetail(id) {
      reqRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id=id;
        this.defaultKey=JSON.parse(res.data.list.menus)
      });
    },
    //修改
    updata(){
      
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
     reqRoleUpdate(this.form).then(res=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.empty()
          this.cancel()
          //重新获取数据
          this.reqRoleList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },


};
</script>
<style scoped>
</style>