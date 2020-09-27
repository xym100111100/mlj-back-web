<template>
  <div>
    <el-dialog
      class="common-dialog"
      title="通讯录"
      :visible.sync="dialogStatus.dialogVisible"
      width="1350px"
      fullscreen
      @close="closeDialog"
    >
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>通讯录明细</span>
          </div>
          <el-table :data="clientContactsList" style="width: 100%">
            <el-table-column prop="contactsName" label="姓名">
            </el-table-column>
            <el-table-column prop="contactsCell" label="电话" >
            </el-table-column>
            <el-table-column prop="kinship" label="与客户关系"> </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
getClientContactListData
} from '@/api/client'

export default {
  name: 'LoanInfoDialog',
  data() {
    return {
      clientContactsList: [],
      dialogStatus: {
        dialogVisible: true
      },
    }
  },
  created() {
    getClientContactListData({clientNo:this.$route.query.clientNo}).then(res=>{
      this.clientContactsList = res.data
    })
  },
  methods: {
    closeDialog() {
      window.close()
    }
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  font-size: 13px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
  font-weight: 700;
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

.el-row {
}
.el-col {
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
  height: 42px;
  line-height: 42px;
  padding-left: 10px;
  overflow: hidden;
  font-size: 13px;
}
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}
.row-bg {
  background-color: #f9fafc;
}

.img-box {
  text-align: center;
  max-height: 387px;
}
.el-image {
  border: solid 1px #dcd9d9;
  height: 230px;
  width: 230px;
}
</style>
