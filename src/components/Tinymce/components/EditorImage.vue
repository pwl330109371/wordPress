<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      upload
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <!-- <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        list-type="picture-card"
      >
      </el-upload> -->
      <el-upload
        class="avatar"
        multiple
        :class='fileData != {} > 0 ? "active" : "" '
        action="1"
        :limit='limit'
        accept="image/jpeg,image/gif,image/png,image/bmp"
        :before-upload="beforeAvatarUpload"
        list-type="picture-card"
        :auto-upload="false"
        :file-list="fileList"
        :http-request="uploadSuccess" ref="upload">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-button @click="dialogVisible = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        Confirm
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import { uploadImgs } from '@/api/upload'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data () {
    return {
      limit: 1,
      fileList: [],
      fileData: '',
      fileId: '',
      fileInfo: [],
      dialogVisible: false,
      listObj: {}
    }
  },
  methods: {
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    // 图片上传前
    beforeAvatarUpload (file) {
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
    async uploads () {
      await uploadImgs(this.fileData).then((res) => {
        console.log(res)
        this.fileInfo.push(res.data.filename)
      })
    },
    uploadSuccess (file) {
      //  console.log(file);
      this.fileData = new FormData()
      this.fileData.append('file', file.file)
    },
    handleSubmit () {
      const arr = Object.keys(this.fileInfo).map(v => this.fileInfo[v])
      if (!this.checkAllSuccess()) {
        this.$message('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
        return
      }
      this.$refs.upload.submit()

      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
