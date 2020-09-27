<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        v-waves
        type="primary"
        icon="el-icon-edit"
        @click="newTemplate()"
        >新增费率模板</el-button
      >

      <!-- 保存按钮 -->
      <el-button type="primary" @click="confirmAdd">保存</el-button>
    </div>
    <!-- card 组件 -->
    <el-card class="box-card" v-for="(item, index) in allRateData" :key="index">
      <div slot="header" class="clearfix">
        <el-input
          style="width:200px "
          v-if="item.data[0].edit"
          v-model="item.type"
        ></el-input>
        <span v-else>{{ item.type }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="addRateListData(item)"
          >添加费率</el-button
        >
      </div>
      <!--form -- table组件 -->
      <el-row type="flex">
        <el-col>
          <div class="grid-content bg-purple">期数</div>
        </el-col>
        <!-- <el-col>
          <div class="grid-content bg-purple">产品类型</div>
        </el-col> -->
        <el-col>
          <div class="grid-content bg-purple">还款方式</div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple">罚息类型</div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple">期限类型</div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple">期限周期</div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple">日利率(%..)</div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple">月利率(%..)</div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple">综合利率(%..)</div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple">罚息利率(%..)</div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple">年利率(%..)</div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple">保证金利率(%..)</div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple">服务费利率(%..)</div>
        </el-col>
        <!-- 操作区域 -->
        <el-col>
          <div class="grid-content bg-purple ">删除</div>
        </el-col>
      </el-row>

      <!-- 下面是列表的数据 -->
      <el-row type="flex" v-for="(item2, index2) in item.data" :key="index2">
        <el-col>
          <div v-if="item2.edit" class="grid-content">
            <el-input
              v-model="item2.periodValue"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
          </div>
          <div v-else class="grid-content">
            {{ item2.periodValue }}
          </div>
        </el-col>
        <!-- 产品类型 -->
        <!-- <el-col>
          <div class="grid-content">
            <el-input v-model="item2.productType"></el-input>
          </div>
        </el-col> -->
        <!-- 还款方式 -->
        <el-col>
          <div class="grid-content">
            <el-input v-model="item2.repayType"></el-input>
          </div>
        </el-col>
        <!-- 罚息类型 -->
        <el-col>
          <div class="grid-content">
            <el-input v-model="item2.overdueType"></el-input>
          </div>
        </el-col>
        <!-- 期限类型 -->
        <el-col>
          <div class="grid-content">
            <el-input v-model="item2.periodType"></el-input>
          </div>
        </el-col>
        <!-- 期限周期 -->
        <el-col>
          <div class="grid-content">
            <el-input
              v-model.number="item2.periodUnit"
              oninput="this.value = this.value.replace(/[^\d.]/g,'');"
            ></el-input>
          </div>
        </el-col>
        <!--  日利息具体值-->
        <el-col>
          <div class="grid-content">
            <el-input
              v-model="item2.dayFeeRate"
              oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
            ></el-input>
          </div>
        </el-col>

        <!-- 月利息具体值  -->
        <el-col>
          <div class="grid-content">
            <el-input
              v-model="item2.monthFeeRate"
              oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
            ></el-input>
          </div>
        </el-col>
        <!-- 综合利率 -->
        <el-col>
          <div class="grid-content">
            <el-input
              v-model="item2.compositeInterestRate"
              oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
            ></el-input>
          </div>
        </el-col>
        <!-- 罚息比例 -->
        <el-col>
          <div class="grid-content">
            <el-input
              v-model="item2.overdueRate"
              oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
            ></el-input>
          </div>
        </el-col>
        <!-- 利年化率 -->
        <el-col>
          <div class="grid-content">
            <el-input
              v-model="item2.feeRate"
              oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
            ></el-input>
          </div>
        </el-col>
        <!-- 保证金费率 -->
        <el-col>
          <div class="grid-content">
            <el-input
              v-model="item2.depositRatio"
              oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
            ></el-input>
          </div>
        </el-col>
        <!-- 服务费率 -->
        <el-col>
          <div class="grid-content">
            <el-input
              v-model="item2.serviceTariff"
              oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
            ></el-input>
          </div>
        </el-col>

        <el-col>
          <div class="grid-content">
            <el-button type="danger" @click="rateDeleteOpt(item.data, index2)"
              >删除</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import {
  getRateTemplateListData,
  rateDeleteData,
  addRateTemplateData,
  deleteRateTemplateData // 删除费率模板
} from '@/api/rate'
export default {
  name: 'rate',
  directives: {
    waves
  },
  data() {
    return {
      //是否是旧数据，用来判断是否展示input
      edit: false,

      // 费率表单数据
      allRateData: []
    }
  },
  created() {
    this.getRateTemplate()
  },
  methods: {
    //添加费率  操作
    addRateListData(item) {
      item.data.push({
        ...item.data[0],
        repayType: 'A',
        productType: '',
        periodType: 'M',
        periodUnit: '1',
        dayFeeRate: '0.03',
        monthFeeRate: '1',
        compositeInterestRate: '20.4',
        overdueRate: '36',
        overdueType: '1',
        periodValue: '',
        feeRate: '12',
        depositRatio: '45',
        serviceTariff: '8.4',
        edit: true
      })
    },
    //点击完成 -- 确认添加
    confirmAdd() {
      let payload = []
      let check = true
      // 校验是否是合法数字
      let re = /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/
      this.allRateData.map(item => {
        item.data.map(item2 => {
          if (
            !item.type ||
            !item2.periodValue ||
            !item2.repayType ||
            !item2.overdueType ||
            !item2.periodType ||
            !item2.periodUnit ||
            !item2.dayFeeRate ||
            !item2.monthFeeRate ||
            !item2.compositeInterestRate ||
            !item2.overdueRate ||
            !item2.feeRate ||
            !item2.depositRatio ||
            !item2.serviceTariff ||
            !re.test(item2.periodValue) ||
            !re.test(item2.dayFeeRate) ||
            !re.test(item2.monthFeeRate) ||
            !re.test(item2.feeRate) ||
            !re.test(item2.overdueRate) ||
            !re.test(item2.compositeInterestRate) ||
            !re.test(item2.depositRatio) ||
            !re.test(item2.serviceTariff)
          ) {
            check = false
          } else {
            item2.productType = item.type
          }
          payload.push(item2)
        })
      })

      if (!check) {
        this.$message({
          message: '不可以存在0或者空数值',
          type: 'warning',
          duration: 2000
        })
        return
      }
      console.log(payload)
      addRateTemplateData(payload).then(res => {
        if (res.code === 0) {
          this.getRateTemplate()
          this.$notify({
            message: res.msg,
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    //删除
    rateDeleteOpt(item, i) {
      console.log(item)
      if (item.length !== 1) {
        // 点击删除
        item.splice(i, 1)
      } else {
        this.$confirm('此操作将永久删除该费率模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 确定操作
            deleteRateTemplateData({ productType: item[0].productType }).then(
              res => {
                if (res.code == 0) {
                  // 刷新
                  this.getRateTemplate()
                  this.$notify({
                    type: 'success',
                    message: res.data
                  })
                }
              }
            )
          })
          .catch(() => {
            // 取消操作
            this.$notify({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 获取费率模板
    getRateTemplate() {
      getRateTemplateListData().then(res => {
        // 加上是否原始数据字段
        res.data.map(item => {
          item.data.map(item2 => {
            item2.edit = false
          })
        })
        this.allRateData = res.data
        console.log(this.allRateData)
      })
    },
    // 点击新增费率模板
    newTemplate() {
      this.allRateData.unshift({
        type: '',
        data: [
          {
            repayType: 'A',
            productType: '',
            periodType: 'M',
            periodUnit: '1',
            dayFeeRate: '0.03',
            monthFeeRate: '1',
            compositeInterestRate: '20.4',
            overdueRate: '36',
            overdueType: '1',
            periodValue: '',
            feeRate: '12',
            depositRatio: '45',
            serviceTariff: '8.4',
            edit: true
          }
        ]
      })
    },
    number() {
      this.famount = this.famount.replace(/[^\.\d]/g, '')
      this.famount = this.famount.replace('.', '')
    }
  }
}
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

.block {
  text-align: center;
}

.el-image {
  border: solid 1px #dcd9d9;
  height: 230px;
  width: 230px;
}
.upload-btn {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
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
  padding-left: 10px;
  max-height: 42px;
  line-height: 42px;
  overflow: hidden;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.isRequired {
  color: red;
}

.el-icon-circle-close {
  color: white;
}
.el-card {
  margin-bottom: 30px;
}
</style>
