<!--
 * @文件描述: 创建资讯
 * @作者: L
-->
<template>
  <div class="add-article">
    <el-form ref="form" :model="form" label-width="90px" :rules="rule">
      <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者" ></el-input>
      </el-form-item>
      <el-form-item label="封面和摘要" >
        <div class="bottomMiddle" >
          <el-upload
            class="avatar"
            multiple
            :class='fileData != {} > 0 ? "active" : "" '
            action="1"
            :limit='limit'
            accept="image/jpeg,image/gif,image/png,image/bmp"
            :before-upload="beforeAvatarUpload"
            list-type="picture-card"
            :auto-upload="true"
            :file-list="fileList"
            :http-request="uploadImg" ref="upload">
            <i class="el-icon-plus"></i>
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
import { uploadImgs } from '@/api/upload'
export default {
  components: {
    Tinymce
  },
  data () {
    return {
      limit: 1,
      fileList: [],
      fileData: '',
      fileId: '',
      fileInfo: '',
      form: {
        title: '',
        author: '',
        content: '',
        make: ''
      },
      rule: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        author: [{ required: true, message: '作者不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }
    }
  },
  mounted () {

  },
  methods: {
    async saveClick (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$refs.upload.submit()
          this.fileData.append('modelType', 1)
          await uploadImgs(this.fileData).then((res) => {
            this.fileInfo = res.data
          })
          // const params = {
          //   briefIntroduction: this.form.make, // 简介
          //   createTime: new Date(), // 时间
          //   informationsContent: this.form.content, // 资讯内容
          //   informationsCover: this.fileInfo, // 封面
          //   informationsTitle: this.form.title, // 资讯标题
          //   publisher: this.form.author // 发布人
          // }
          // const { stat } = await sysInformations(params)
          // if (stat === 1) {
          //   this.$message.success('创建成功!')
          //   this.$router.push({ path:'information'})
          //   this.$refs[formName].resetFields()
          // }
          // this.fileInfo = ''
          // this.$refs.editor.setContent('') // 清除内容
        }
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/jpeg' || 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 /jpeg/png/jpeg 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    uploadImg (file) {
      //  console.log(file);
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
