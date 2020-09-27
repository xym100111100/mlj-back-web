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
        <el-button
          v-waves
          style="float: right; padding: 3px 10px"
          type="text"
          @click="confirmAdd(item.data, item.data[index], 'formDataRef')"
          >保存</el-button
        >
      </div>
      <!--form -- table组件 -->
      <el-form :model="item" ref="formDataRef">
        <el-table
          :data="item.data"
          stripe
          style="width: 100%;"
          max-height="770"
        >
          <el-table-column
            prop="periodValue"
            label="期数"
            align="center"
            width="120"
            fixed
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.periodValue'"
                :rules="rules.periodValue"
              >
                <el-input
                  v-model.number="scope.row.periodValue"
                  placeholder="期数"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.periodValue }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="productType"
            label="产品类型"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.productType'"
                :rules="rules.productType"
              >
                <el-input
                  v-model="scope.row.productType"
                  placeholder="产品类型"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.productType }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="repayType"
            label="还款方式"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.repayType'"
                :rules="rules.repayType"
              >
                <el-input
                  v-model="scope.row.repayType"
                  placeholder="还款方式"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.repayType }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="overdueType"
            label="罚息类型"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.overdueType'"
                :rules="rules.overdueType"
              >
                <el-input
                  v-model="scope.row.overdueType"
                  placeholder="罚息类型"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.overdueType }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="periodType"
            label="期限类型"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.periodType'"
                :rules="rules.periodType"
              >
                <el-input
                  v-model="scope.row.periodType"
                  placeholder="期限类型"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.periodType }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="periodUnit"
            label="期限周期"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.periodUnit'"
                :rules="rules.periodUnit"
              >
                <el-input
                  v-model="scope.row.periodUnit"
                  placeholder="期限周期"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.periodUnit }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="dayFeeRate"
            label="日利息具体值"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.dayFeeRate'"
                :rules="rules.dayFeeRate"
              >
                <el-input
                  v-model="scope.row.dayFeeRate"
                  placeholder="日利息具体值"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.dayFeeRate }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="monthFeeRate"
            label="月利息具体值"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.monthFeeRate'"
                :rules="rules.monthFeeRate"
              >
                <el-input
                  v-model="scope.row.monthFeeRate"
                  placeholder="月利息具体值"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.monthFeeRate }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="compositeInterestRate"
            label="综合利率"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.compositeInterestRate'"
                :rules="rules.compositeInterestRate"
              >
                <el-input
                  v-model="scope.row.compositeInterestRate"
                  placeholder="综合利率"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.compositeInterestRate }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="overdueRate"
            label="罚息比例"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.overdueRate'"
                :rules="rules.overdueRate"
              >
                <el-input
                  v-model="scope.row.overdueRate"
                  placeholder="罚息比例"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.overdueRate }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="feeRate"
            label="利年化率"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.feeRate'"
                :rules="rules.feeRate"
              >
                <el-input
                  v-model="scope.row.feeRate"
                  placeholder="利年化率"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.feeRate }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="depositRatio"
            label="保证金比例"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.depositRatio'"
                :rules="rules.depositRatio"
              >
                <el-input
                  v-model="scope.row.depositRatio"
                  placeholder="保证金比例"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.depositRatio }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="serviceTariff"
            label="服务费率"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.serviceTariff'"
                :rules="rules.serviceTariff"
              >
                <el-input
                  v-model.number="scope.row.serviceTariff"
                  placeholder="服务费率"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.serviceTariff }}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            fixed="right"
            label="操作"
            min-width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.edit"
                type="success"
                size="medium"
                @click="confirmAdd(item.data, scope.row, 'formDataRef')"
              >
                <i class="el-icon-check" aria-hidden="true">完成</i>
              </el-button>

              <div v-else>
                <el-button
                  type="primary"
                  size="mini"
                  @click="editData(scope.row)"
                >
                  <i class="el-icon-edit" aria-hidden="true">编辑</i>
                </el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="rateDeleteOpt(item.data, scope.$index)"
                >
                  <i class="el-icon-delete" aria-hidden="true">删除</i>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
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
      tableData: [],
      // 校验
      rules: {
        repayType: [{ required: true, message: '请输入还款方式' }],
        productType: [{ required: true, message: '请输入产品类型' }],
        periodType: [{ required: true, message: '请输入期限类型' }],
        periodUnit: [{ required: true, message: '请输入期限周期' }],
        dayFeeRate: [{ required: true, message: '请输入日利息具体值' }],
        monthFeeRate: [{ required: true, message: '请输入日利息具体值' }],
        compositeInterestRate: [{ required: true, message: '请输入综合利率' }],
        overdueRate: [{ required: true, message: '请输入罚息比例' }],
        overdueType: [{ required: true, message: '请输入罚息类型' }],
        periodValue: [{ required: true, message: '请输入期限具体值' }],
        feeRate: [{ required: true, message: '请输入利年化率' }],
        depositRatio: [{ required: true, message: '请输入保证金比例' }],
        serviceTariff: [
          { required: true, message: '请输入服务费率' },
          {
            type: 'float',
            message: `请输入浮点数`,
            trigger: 'blur'
          }
        ]
      },
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
        repayType: '',
        productType: '',
        periodType: '',
        periodUnit: '',
        dayFeeRate: '',
        monthFeeRate: '',
        compositeInterestRate: '',
        overdueRate: '',
        overdueType: '',
        periodValue: '',
        feeRate: '',
        depositRatio: '',
        serviceTariff: '',
        edit: true
      })
    },
    //点击完成 -- 确认添加
    confirmAdd(val, row, formDataRef) {
      this.$refs[formDataRef][0].validate(valid => {
        if (valid) {
          addRateTemplateData(val).then(res => {
            if (res.code == 0) {
              row.edit = false
              this.$notify({
                message: res.msg,
                type: 'success'
              })
            }
          })
        }
      })
    },
    //修改
    editData(row, index) {
      row.edit = true
    },
    //删除
    rateDeleteOpt(item, i) {
      if (item.length !== 1) {
        // 点击删除
        item.splice(i, 1)
        console.log('111')
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
            this.tableData.push(item2)
          })
        })
        this.allRateData = res.data
      })
    },
    // 点击新增费率模板
    newTemplate() {
      this.allRateData.unshift({
        type: '',
        data: [
          {
            repayType: '',
            productType: '',
            periodType: '',
            periodUnit: '',
            dayFeeRate: '',
            monthFeeRate: '',
            compositeInterestRate: '',
            overdueRate: '',
            overdueType: '',
            periodValue: '',
            feeRate: '',
            depositRatio: '',
            serviceTariff: '',
            edit: true
          }
        ]
      })
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
.el-input {
  text-align: center;
}
.el-card {
  margin-bottom: 30px;
}
</style>
