<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        v-waves
        type="primary"
        icon="el-icon-edit"
        @click="showForm('add')"
        >新增费率模板</el-button
      >
    </div>
    <!-- card 组件 -->
    <el-card class="box-card" v-for="(item, index) in allRateData" :key="index">
      <div slot="header" class="clearfix">
        <span>{{ item.type }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="addRateListData(item)"
          >添加费率</el-button
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
            prop="repayType"
            label="还款方式"
            width="150"
            align="center"
            fixed
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
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.overdueRate }}</span>
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
            prop="periodValue"
            label="期限具体值"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-form-item
                v-if="scope.row.edit"
                :prop="'data.' + scope.$index + '.periodValue'"
                :rules="rules.periodValue"
              >
                <el-input
                  v-model="scope.row.periodValue"
                  placeholder="期限具体值"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.periodValue }}</span>
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
                  v-model="scope.row.serviceTariff"
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
            min-width="150"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.edit"
                type="text"
                size="medium"
                @click="confirmAdd(scope.row, 'formData')"
              >
                <i class="el-icon-check" aria-hidden="true">完成</i>
              </el-button>
              <div v-else>
                <el-button
                  type="text"
                  size="medium"
                  @click="editData(scope.row)"
                >
                  <i class="el-icon-edit" aria-hidden="true">编辑</i>
                </el-button>
                <el-button
                  type="text"
                  size="medium"
                  @click="deleteData(item.data, scope.$index)"
                >
                  <i class="el-icon-delete" aria-hidden="true">删除</i>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>
    <!-- <el-button type="text">添加数据</el-button>
    <el-divider></el-divider> -->
    <!-- <el-button @click="submitData('formData')">提交 </el-button> -->
  </div>
</template>
<script>
import waves from '@/directive/waves'
import { getRateTemplateListData } from '@/api/rate'
export default {
  name: 'rate',
  directives: {
    waves
  },
  data() {
    return {
      tableData: [],
      // 校验规则
      rules: {
        name: {
          required: true,
          message: '请输入名字'
        },
        sex: {
          required: true,
          message: '请选择性别'
        }
      },
      // 费率表单数据
      allRateData: []
    }
  },
  created() {
    this.getRateTemplate()
  },
  methods: {
    //添加
    addRateListData(item) {
      item.data.push({
        ...item.data[0],
        edit: true
      })
    },
    //确认添加
    confirmAdd(row, formName) {
      row.edit = false
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     row.edit = false
      //   }
      // })
    },
    //修改
    editData(row, index) {
      row.edit = true
    },
    //删除
    deleteData(item, index) {
      item.splice(index, 1)
      // this.tableData.splice(index, 1)
    },
    submitData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.formData.tableData
          alert(JSON.stringify(data))
        }
      })
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

        console.log(this.allRateData)
      })
      // this.allRateData.forEach.map((item, index) => {
      //   console.log(item)
      // })
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
