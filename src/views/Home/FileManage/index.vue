<script>
// 导入请求
import {CreateDoc, docList, DownloadDoc} from "@/api/api";

// dialog对话框
import TextDialog from "@/components/global/my-Dialog/TextDialog.vue";
import {getToken} from "@/utils/token";

export default {
  name: "FirstInstance",
  components: {
    TextDialog
  },
  data() {
    return {
      // 表格数据
      docListData: [],

      // 分页查询参数
      listQuery: {
        // 查询页码
        pageNo: 1,
        // 一页几个
        pageSize: 10,
        // 查询条件
        name: ""
      },

      // 总条数
      rows: 0,

      // 页码
      pages: 0,

      // 弹框的显示与隐藏
      dialogVisible: false,

      // 对话框配置
      dialogConfig: {
        title: '',
        btnTitle: '',
        message: ''
      },
      dialogType: '',

      // 缓存一些数据
      temp: {},
    }
  },
  mounted() {
    this.getDocListData();
  },
  methods: {

    // 获取表格数据
    async getDocListData() {
      try {
        // 发送请求
        const res = await docList(this.listQuery);
        // 解构数据
        let {code, data} = res.data;
        if (code === 20000) {
          // 存储数据
          this.docListData = data.list;
          // 总条数
          this.rows = data.rows;
          this.pages = data.pages;
        } else {
          this.$notify({
            title: '提示',
            message: '数据更新失败',
            type: 'error'
          });
        }
      } catch (error) {
        this.$notify({
          title: '提示',
          message: '获取一审数据失败',
          type: 'error'
        });
      }
    },

    // 筛选处理函数
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    // 对话框的配置项
    async DialogConfig(type, row) {
      this.temp = {...row}
      // 点击后,不管怎么的,都要显示我们的对话框了
      this.dialogVisible = !this.dialogVisible;
      // 传进来的type类型判断
      switch (type) {
        case 'generate':
          this.dialogConfig = {
            title: "生成凭证",
            btnTitle: "生 成",
            message: "确 定 生 成 凭 证"
          };
          this.dialogType = "generate"
          break;
        case 'download':
          this.dialogConfig = {
            title: "下载凭证",
            btnTitle: "下 载",
            message: "确 定 下 载 凭 证"
          };
          this.dialogType = "download"
          break;
        default:
          break;
      }
    },

    // 点击确定执行的逻辑
    async confirm() {
      // //传的参数 row.id传给服务端
      let {id} = this.temp;

      // 请求下载文件,这里并没有执行
      const handleDownload = async () => {
        // 这里是发送下载带id的请求
        let res = await DownloadDoc({id})
        let {code, data} = res.data;
        if (code === 20000) {
          // 我们获取到文件的路径
          // console.log(data.file_path)
          // await this.getDocListData(); //查询数据
          // console.log(process.env.VUE_APP_procedural)
          this.downloadFile(`${process.env.VUE_APP_procedural}static/${data.file_path}`, data.file_path);
        }
      }

      // 判断type类型,执行方法
      this.dialogType === 'generate' ?
          await CreateDoc({id})
          :
          await handleDownload()
      this.dialogVisible = false;
      await this.getDocListData(); //查询数据


    },

    // 下载的流的请求
    downloadFile(url, fileName) {  //第二次请求 获取到文件流
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = "blob"; //blob字节流
      xhr.setRequestHeader('token', getToken()); //传入token
      xhr.send();
      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log(xhr.response)
          this.createA(xhr.response, fileName);
        }
      }
    },

    //动态创建a标签  <!-- <a href="文件的链接地址" download="下载的文件名称"></a> -->
    createA(data, fileName) {
      let _blob = new Blob([data]);
      //window对象下有URL对象作用：专门用来将blob或file读取成url;
      let a = document.createElement('a'); //创建a标签
      a.href = window.URL.createObjectURL(_blob);
      a.download = fileName;  //下载的文件名称
      a.click(); //触发a标签
      this.$notify({
        title: '下载凭证',
        message: '下载凭证成功',
        type: 'success',
        duration: 1000
      });
    }

  },

  computed: {
    // 状态的插槽数据
    ApprovalCategory() {
      // 数组对象的去重
      // 创建map
      let map = new Map();
      // 遍历数据
      for (let item of this.docListData) {
        // 避免修改源数据
        let v = {...item};
        console.log("v is", v)
        // 看看有没有
        if (!map.has(v)) {
          // 文本格式化,使用我们的过滤器,传入数据
          v.text = this.$options.filters["categoryfilter"](v.app_type)
          // 放进去
          map.set(v.app_type, v);
        }
      }
      // 放进新的data中
      const data = [...map.values()];
      return data.map(item => ({
        text: item.text,
        value: item.status
      }))
    }
  }

}
</script>


<template>

  <!--  卡片-->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>办公申请</span>
    </div>


    <!--      搜索框  clearable-可清除   input事件,只要输入就触发获取列表-->
    <el-input
        prefix-icon="el-icon-search"
        placeholder="请输入查询用户名"
        v-model="listQuery.name"
        @input="getListData()"
        clearable
        style="width: 100%;"
        size="medium"
    >
    </el-input>

    <!--表格   stripe斑马纹-->
    <el-table
        :data="docListData"
        stripe
        style="width: 100%">

      <!--      序号-->
      <el-table-column
          fixed
          type="index"
          label="序号"
      >
      </el-table-column>

      <!--      申请人-->
      <el-table-column
          fixed
          prop="account"
          label="申请人"
          column-key="account"
          class="custom-column">
        <!--        :filter-method="filterHandler"-->
      </el-table-column>

      <!--申请时间-->
      <el-table-column
          prop="created"
          label="申请时间"
          column-key="created">
        <template slot-scope="scope">
          {{ scope.row.created | formatDate }}
        </template>
      </el-table-column>

      <!--      申请类别 filters 过滤出所有的状态并去重  filter-method 筛选的逻辑-->
      <el-table-column
          prop="app_type"
          label="申请类别"
          :filters="ApprovalCategory"
          :filter-method="filterHandler"
      >
        <!--          作用域插槽-->
        <template slot-scope="scope">
          <!--            使用全局过滤器  -->
          <!--          status +statusStyle 根据状态样式过略-->
          <!--          status +statusFilter 状态的显示内容-->
          <el-tag :type="scope.row.app_type | categoryStyle" disable-transitions> {{
              scope.row.app_type | categoryfilter
            }}
          </el-tag>
        </template>
      </el-table-column>


      <!--      操作-->
      <el-table-column label="凭证处理" width="280px">
        <template slot-scope="scope">
          <!--          @click="handleEdit(scope.$index, scope.row)" 自带的,用于获取行信息的数据-->
          <el-button
              size="mini"
              type="success"
              @click="DialogConfig('generate',scope.row)"
              :disabled="scope.row.file_path != null"
          >生成凭证
          </el-button>

          <el-button
              size="mini"
              type="danger"
              @click="DialogConfig('download',scope.row)"
              :disabled="scope.row.file_path === null"
          >下载凭证
          </el-button>

        </template>
      </el-table-column>

    </el-table>

    <!--    分页器-->
    <div class="block">
      <!--      使用分页器组件-->
      <Pagination
          @action="getDocListData"
          :pageNum.sync="listQuery.pageNo"
          :seleSizes="[10, 20, 30, 40]"
          :item.sync="listQuery.pageSize"
          :total="rows"
      >
      </Pagination>
    </div>

    <!--   对话框-->
    <TextDialog
        :dialogTitle="dialogConfig.title"
        :isVisible.sync="dialogVisible"
        :btnTitle="dialogConfig.btnTitle"
        @confirm="confirm"
    >
      <!--      confirm emit的方法名字,调用父组件中的DeleteDate方法-->
      <p>{{ dialogConfig.message }}</p>
    </TextDialog>

  </el-card>

</template>