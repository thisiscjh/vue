<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqBannerAdd,
  reqBannerDetail,
  reqBannerUptate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
// import E from "wangeditor";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      List: "banner/list",
    }),
  },
  data() {
    return {
      //上传图片地址
      imageUrl: "",
      form: {
        title:"",
        img:null,
        status: 1,
      },
    };
  },
  methods: {
    // createEditor() {
    //   this.editor = new E("#desc");
    //   this.editor.create();
    //   this.editor.txt.html(this.form.description);
    // },
    //修改了一级分类
    //图片发送了修改
    changeImg(e) {
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("上传的图片不能超过2M");
        return;
      }
      //上传的文件后缀必须是.png .jpg .gif .jpeg
      var extname = e.name.slice(e.name.lastIndexOf("."));
      var extArr = [".png", ".jpg", ".gif", ".jpeg"];
      if (!extArr.some((item) => item === extname)) {
        warningAlert("上传文件必须是图片");
        return;
      }

      //file是上传的文件
      var file = e.raw;
      //生成一个URL地址，赋值给imageUrl,展示出来
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
  
    
    ...mapActions({
      reqList: "banner/reqList",
    }),
    empty() {
        //上传图片地址
        (this.imageUrl = ""),
        (this.form = {
          title:"",
          status: 1,
        });
    //   this.editor.txt.html('')
    },
     cancel(){
       this.info.show=false
       if(!this.info.isAdd){
           this.empty()
       }
   },
    //添加
    add(){
      reqBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel()
          this.empty();
          console.log(this.empty(),this.reqLists());
          this.reqList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取某一条数据
    getDetail(id) {
      reqBannerDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgpre + this.form.img;
      });
    },
    //修改
    update() {
      reqBannerUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel()
          this.reqList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
      this.reqList()
  },
};
</script>
<style scoped lang="stylus">
.add >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border: 1px dashed #409eff !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.box-img {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  position: relative;

  h3 {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
  }

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
</style>