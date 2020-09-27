<template>
  <div class="components-container">
    <aside>
      <div>
        <div class="searchButton">
          <div v-if="isAdd">
            <el-button class="filter-item" @click="onSave()" type="primary"
              >提交</el-button
            >
          </div>
          <div v-if="!isAdd">
            <el-button class="filter-item" @click="onSave()" type="primary"
              >提交为新版本</el-button
            >
          </div>
          <div v-if="!isAdd">
            <el-button class="filter-item" type="warning">确认修改</el-button>
          </div>
          <div>
            <el-button class="filter-item" type="info">存为草稿</el-button>
          </div>
          <div>
            <el-button
              class="filter-item"
              @click="$router.go(-1)"
              type="success"
              >返回</el-button
            >
          </div>
        </div>
        <el-form
          ref="dataForm"
          :model="payload"
          label-position="left"
          @closed="resetForm('showDialogRef')"
          :inline="true"
          class="demo-form-inline"
        >
          <!-- 新增内容 -->
          <el-form-item v-if="!isAdd" label="模板编号">
            <el-input v-model="payload.contractTemplateNo" disabled />
          </el-form-item>
          <el-form-item label="合同名称">
            <el-input v-model="payload.contractName" />
          </el-form-item>
          <el-form-item label="产品类型">
            <el-input v-model="payload.productType" />
          </el-form-item>

          <el-form-item label="合同类型">
            <el-input v-model="payload.contractType" />
          </el-form-item>

          <el-form-item label="版本">
            <el-input v-model="payload.version" />
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="payload.memo" />
          </el-form-item>
          <el-form-item label="可用状态" prop="saleCode">
            <el-input v-model="payload.state" />
          </el-form-item>
          <el-form-item label="合同开始时间">
            <el-date-picker
              v-model="payload.startDateTime"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="合同结束时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="payload.endDateTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item v-if="!isAdd" label="修改时间">
            <el-date-picker
              disabled
              v-model="payload.modifiedTime"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item v-if="!isAdd" label="创建时间">
            <el-date-picker
              disabled
              v-model="payload.createdTime"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </aside>
    <div>
      <tinymce v-model="payload.contractContent" :height="300" />
    </div>
    <!-- <div class="editor-content" v-html="content" /> -->
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import underscore from 'underscore'
import {
  getContractTemplateByNoData,
  addContractTemplateData
} from '@/api/contract/templates'
import moment from 'moment'
import Base64 from 'js-base64'
export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      isAdd: false,
      payload: {
        contractName: '',
        contractTemplateNo: '',
        productType: '',
        createdTime: '',
        contractType: '',
        endDateTime: '',
        memo: '',
        modifiedTime: '',
        startDateTime: '',
        state: '',
        version: '',
        contractContent: ''
      }
    }
  },
  created() {
    if (JSON.stringify(this.$route.query) !== '{}') {
      this.getContractTemplateByNo()
    } else {
      this.isAdd = true
    }
  },
  methods: {
    getContractTemplateByNo() {
      getContractTemplateByNoData({
        contractTemplateNo: this.$route.query.contractTemplateNo
      }).then(res => {
        if (res.code === 0) {
          res.data.contractContent = underscore.unescape(
            res.data.contractContent
          )
          this.payload = res.data
        }
      })
    },
    onSave() {
      this.payload.contractContent = underscore.escape(
        this.payload.contractContent
      )
      this.payload.endDateTime = moment(this.payload.endDateTime[0]).format(
        'YYYY-MM-DD hh:mm:ss'
      )
      this.payload.startDateTime = moment(this.payload.startDateTime[0]).format(
        'YYYY-MM-DD hh:mm:ss'
      )
      addContractTemplateData(this.payload).then(res => {
        this.$notify({
          message: res.data,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
.searchButton {
  display: flex;
  justify-content: flex-end;
  height: 60px;
}

.searchButton div {
  margin-left: 30px;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 42px;
}
</style>
