<template>
  <div class="block">
    <el-dialog width="1350px" :visible.sync="innerVisible" append-to-body>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>编辑图片</span>
        </div>
        <div>
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in imagesData" :key="index">
              <div class="block">
                <el-image :src="item.enclosureUrl"></el-image>

                <div>
                  <el-button size="small" type="danger" @click="delImage(index)"
                    >删除</el-button
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-dialog>

    <el-image
      v-if="!imagesData || imagesData.length === 0"
      :src="require('../../assets/images/common/noImage.gif')"
    ></el-image>
    <el-image
      v-if="imagesData && imagesData && imagesData.length > 0"
      :src="imagesData[0].enclosureUrl"
      :preview-src-list="imagesData.map(item => item.enclosureUrl)"
    ></el-image>
    <div>
      <span class="demonstration">{{ title }}{{ imagesData.length }}</span>
      <span class="isRequired">*</span>
    </div>
    <div class="upload-btn" v-if="dialogStatus.action !== 'info'">
      <div style="margin-right:10px;">
        <el-upload class="upload-demo" action="" :http-request="fileUpload">
          <el-button size="small" type="primary" @click="willUpload"
            >点击上传</el-button
          >
        </el-upload>
      </div>
      <div>
        <el-button
          size="small"
          type="primary"
          v-if="
            dialogStatus.action !== 'info' &&
              imagesData &&
              imagesData &&
              imagesData.length > 0
          "
          @click="showDelImagesForm('renting', imagesData)"
          >编辑</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
  name: 'appendixImg',
  props: {
    title: {
      type: String,
      required: true
    },
    imagesData: {
      type: Array,
      required: true
    },
    dialogStatus: {
      type: Object,
      required: true
    },
    fileType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      innerVisible: false,
      obj:{}
    }
  },
  methods: {
    // 获取验签
    willUpload() {
      axios({
        method: 'get',
        url:
          'https://mlj-back-api.jqtianxia.com/upload/signature?fileNumber=1&suffix=jpg&fileType=partner_appendix',
        headers: {
          'X-Auth-Token': getToken()
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.obj = res.data.data
        }
      })
    },
    fileUpload(e) {
     
      // 先准备好 oss 服务器需要的内容
      const photo = e.file // 获取图片对象
      if (e.file.type !== 'image/png' && e.file.type !== 'image/jpeg') {
        this.$message({
          message: '只能上传图片',
          type: 'error'
        })
        this.imagesData.splice(this.imagesData.length, 1)
        return
      }
      const photoName = photo.name // 原图片的名称
      const key = this.obj['dir'] + this.obj['fileName'] // 存储到oss的图片名称 自己定，必须确保唯一性，不然会覆盖oss中原有的文件
      const policy = this.obj['policy'] // 服务器端同事调oss的API，通过接口返回给前端的 policy
      const OSSAccessKeyId = this.obj['accessId'] // 服务器端同事调oss的API，通过接口返回给前端的 OSSAccessKeyId
      const callback = this.obj['callback'] // 服务器端同事调oss的API，通过接口返回给前端的 callback。这个是需要 oss 触发这个回调来通知服务器操作结果。
      const signature = this.obj['signature'] // 服务器端同事调oss的API，通过接口返回给前端的 signature。这个就是签名，最关键的。
      const url = `https://nanning-meilijin-prod.oss-cn-shenzhen.aliyuncs.com/`

      // biu一下，提交给oss
      let param = new FormData()
      param.append('name', `${photoName}`)
      param.append('key', `${key}`)
      param.append('policy', `${policy}`)
      param.append('OSSAccessKeyId', `${OSSAccessKeyId}`)
      param.append('success_action_status', 200) // 不要问为什么，照做
      param.append('callback', `${callback}`)
      param.append('signature', `${signature}`)
      param.append('file', photo, photoName) // 这个**切记**一定要放到最后去 append ，不然阿里云会一直报 key 的错误
      axios
        .post(url, param)
        .then(response => {
          console.log('response == ', response)
          if (response.status === 200) {
            this.imagesData.unshift({
              enclosureUrl:
                'https://resfile.jqtianxia.com/' +
                this.obj['dir'] +
                this.obj['fileName'],
              enclosureType: this.fileType
            })
          }
        })
        .catch(err => {
          console.log('err == ', err)
        })
    },
    sendRequest() {
     
      // var xmlhttp = null
      // if (window.XMLHttpRequest) {
      //   xmlhttp = new XMLHttpRequest()
      // } else if (window.ActiveXObject) {
      //   xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
      // }

      // if (xmlhttp != null) {
      //   // serverUrl是 用户获取 '签名和Policy' 等信息的应用服务器的URL，请将下面的IP和Port配置为您自己的真实信息。
      //   // this.serverUrl =
      //   //   'http://tool.jqtianxia.net:9011/upload/signature?fileNumber=1&suffix=jpg&fileType=partner_appendix'
      //   this.serverUrl =
      //     'https://mlj-back-api.jqtianxia.com/upload/signature?fileNumber=1&suffix=jpg&fileType=partner_appendix'

      //   // this.serverUrl =
      //   //   'http://10.13.1.5:9021/upload/signature?fileType=partner_appendix&fileNumber=1&suffix=jpg&clientno=1&filetype=2'

      //   xmlhttp.open('GET', this.serverUrl, false)
      //   xmlhttp.setRequestHeader(
      //     'X-Auth-Token',
      //     getToken()
      //   )
      //   xmlhttp.send(null)
      //   return xmlhttp.responseText
      // } else {
      //   alert('Your browser does not support XMLHTTP.')
      // }
    },

    delImage(index) {
      this.imagesData.splice(index, 1)
    },
    showDelImagesForm() {
      this.innerVisible = true
    }
  }
}
</script>

<style>
.el-upload-list__item {
  display: none;
}
</style>
