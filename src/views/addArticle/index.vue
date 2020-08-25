<!--
 * @文件描述: 创建资讯
 * @作者: L
-->
<template>
  <div class="add-article">
    <el-form ref="form" :model="form" label-width="90px" :rules="rule">
      <el-row class="demo-autocomplete">
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作者" prop="author">
              <el-input v-model="form.author" placeholder="请输入作者" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="demo-autocomplete">
        <el-col :span="12">
          <el-form-item label="选择分类" prop="fTagId">
            <el-select v-model="form.fTagId" @change="selectTag" clearable placeholder="请选择">
              <el-option
                v-for="item in fTagList"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="二级分类" prop="cTagId">
            <el-select v-model="form.cTagId" multiple placeholder="请选择">
              <el-option
                v-for="item in cTagList"
                :key="item._id"
                multiple-limit=’2‘
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="封面和摘要">
        <div class="bottomMiddle" >
          <el-upload
            class="avatar"
            multiple
            :class='fileList.length > 0 ? "active" : "" '
            action="1"
            :limit='limit'
            accept="image/jpeg,image/jpg,image/png,image/bmp,image/webp,image/gif"
            :on-change="beforeAvatarUpload"
            :on-remove='handRemove'
            list-type="picture-card"
            :auto-upload="false"
            :file-list="fileList"
            :http-request="uploadSuccess"
            ref="upload">
            <i class="el-icon-plus" v-if="fileList.length === 0"></i>
          </el-upload>
          <el-input
            class="thumn"
            type="textarea"
            placeholder="选填，帮助用户快速了解内容，如不填写自动抓取内容钱50字"
            v-model="form.make"
            maxlength="120"
            show-word-limit
          ></el-input>
      </div>
      </el-form-item>
      <el-form-item label="内容" class="content" prop="content" >
          <tinymce class="tinymce" :height="300"  v-model="form.content" />
      </el-form-item>
      <div style="clear:both"></div>
      <el-form-item  class="bottom">
        <el-button  type="primary" @click="saveClick('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getTagist, getTagChildList } from '@/api/tag'
import { uploadImgs } from '@/api/upload'
import { addArticle } from '@/api/article'
export default {
  components: {
    Tinymce
  },
  data () {
    return {
      limit: 1, // 图片上传数量
      fileList: [], // 图片列表
      fTagList: [], // 一级标签
      cTagList: [], // 二级标签
      fileData: '',
      fileId: '',
      fileInfo: '',
      form: {
        title: '', // 标题
        author: '', // 作者
        content: '', // 内容
        make: '', // 描述
        fTagId: '', // 一级选中的id
        cTagId: [] // 二级选中的List
      },
      rule: {
        fTagId: [{ required: true, message: '请选择一级分类', trigger: 'blur' }],
        cTagId: [{ required: true, message: '请选择二级分类', trigger: 'blur' }],
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        author: [{ required: true, message: '作者不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.getTagist() // 获取一级分类
  },
  methods: {
    // 选中一级分类
    selectTag (e) {
      this.form.fTagId = e
      this.form.cTagId = [] // 切换重置已经选中的标签
      this.getTagChildList(e)
    },
    // 获取一级分类
    async getTagist () {
      const { data } = await getTagist()
      if (data.data.length === 0) {
        return
      }
      this.fTagList = data.data
      this.getTagChildList(this.fTagList[0]._id)
    },
    // 获取二级分类
    async getTagChildList (id) {
      const { data } = await getTagChildList(id)
      if (data.data.length === 0) {
        return
      }
      this.cTagList = data.data
    },
    // 发布文章
    async saveClick (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$refs.upload.submit()
          // 如果没有上传图片就不走上传图片的请求
          if (this.fileList.length !== 0) {
            await uploadImgs(this.fileData).then((res) => {
              console.log(res)
              this.fileInfo = res.data.filename
            })
          }
          const params = {
            title: this.form.title, // 标题
            author: this.form.author, // 发布人
            articleImg: this.fileInfo, // 封面
            tagList: this.form.cTagId, // 标签
            describe: this.form.make, // 简介
            content: this.form.content // 资讯内容
          }
          const { data } = await addArticle(params)
          if (data.state === 200) {
            this.$message.success('创建成功!')
            // this.$router.push({ path:'information'})
            this.$refs[formName].resetFields()
          }
          this.fileInfo = ''
        }
      })
    },
    // 图片上传前
    beforeAvatarUpload (file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 /jpeg/png/jpeg 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },
    // 删除图片
    handRemove (file, fileList) {
      this.fileList = fileList
    },
    uploadSuccess (file) {
      this.fileData = new FormData()
      this.fileData.append('file', file.file)
    }
  }
}
</script>

<style scoped lang="scss">

.add-article{
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 2rem 1rem;
  .content{
    width:100%;
    height: 300px;
    .tinymce{
          border: 1px solid #DCDFE6;
    }
  }
  .demo-autocomplete {
    .el-select {
      width: 100%;
    }
  }
  /deep/.bottomMiddle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .active {
      .el-upload--picture-card {
        display: none;
      }
    }
    .el-upload--picture-card {
      width: 150px !important;
      height: 150px !important;
      line-height: 150px !important;
      display: block;
    }
    .thumn{
      width: 85%;
      height: 150px;
      margin-left: 10px;
      .el-textarea__inner{
          height: 100% !important;
      }
    }
    .el-upload-list--picture-card .el-upload-list__item{
      margin: 0;
    }
  }
  .bottom{
    margin-top: 120px;
    padding-top: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
