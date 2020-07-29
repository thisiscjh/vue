<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeF">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in gList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" @change="changeSpecsId">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in sList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" multiple >
            <el-option label="请选择" value disabled=""></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
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
import {
  reqManAdd,
  reqManDetail,
  reqManUptate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //分类
      gList: "goods/list",
      //规格
      sList: "spec/list",
    }),
  },
  data() {
    return {
      editor: null,
      //二级分类数组
      secondCateArr: [],
      //商品规格属性值
      attrsArr: [],
      //上传图片地址
      imageUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  methods: {
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    //修改了一级分类
    changeF(bool) {
      let index = this.gList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateArr = this.gList[index].children;
      this.form.second_cateid = "";
    },
    //图片发送了修改
    changeImg(e) {
      let file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    //商品规格发生改变
    changeSpecsId(){
    let index =this.sList.findIndex(item=>item.id==this.form.specsid)
    this.attrsArr=this.sList[index].attrs
    this.form.specsattr=[]
    },
    ...mapActions({
      //分类一级列表
      reqGoodsList: "goods/reqList",
      //规格列表
      reqSpecList: "spec/reqList",
      reqLists: "manage/reqLists",
      reqManNum: "manage/reqManNum",
    }),
    empty() {
      (this.editor = null),
        //二级分类数组
        (this.secondCateArr = []),
        //商品规格属性值
        (this.attrsArr = []),
        //上传图片地址
        (this.imageUrl = ""),
        (this.form = {
          first_cateid: "",
          second_cateid: "",
          goodsname: "",
          price: 0,
          market_price: 0,
          img: null,
          description: "",
          specsid: "",
          specsattr: [],
          isnew: 1,
          ishot: 1,
          status: 1,
        });
    //   this.editor.txt.html('')
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //添加
    add(){
        this.form.description=this.editor.txt.html();
        this.form.specsattr=JSON.stringify(this.form.specsattr)
        console.log(this.form);
      reqManAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          console.log(this.empty(),this.cancel(),this.reqLists());
          this.cancel();
          this.reqLists();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取某一条数据
    getDetail(id) {
      reqManDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgpre + this.form.img;
        this.changeF(true)
        this.changeSpecsId(true)
        this.form.specsattr=this.form.specsattr
      });
    },
    //修改
    update() {
        this.form.description=this.editor.txt.html();
        this.form.specsattr=JSON.stringify(this.form.specsattr)
      reqManUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqLists();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.gList.length==0) {
      this.reqGoodsList();
    }
    this.reqSpecList(true);
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