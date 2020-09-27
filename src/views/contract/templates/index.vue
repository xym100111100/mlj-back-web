<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.contractName"
        placeholder="摸板名称"
        style="width: 200px;"
        class="filter-item"
      />

      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getList"
        >搜索</el-button
      >
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="goTinymcePage('add')"
        >添加</el-button
      >
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="模板编号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.contractTemplateNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品类型" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.productType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同类型" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ contractTypeFormat(row.contractType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.contractName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可用状态" align="center" width="95">
        <template slot-scope="{ row }">
          <span>{{ row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同开始时间" align="center" width="95">
        <template slot-scope="{ row }">
          <span>{{ row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同结束时间" align="center" width="95">
        <template slot-scope="{ row }">
          <span>{{ row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.modifiedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.memo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            type="primary"
            @click="goTinymcePage('edit', row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { contractTemplatesList } from '@/api/contract/templates'

import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'templates',
  components: {
    Pagination
  },
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,

      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        contractName: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    contractTypeFormat: function(val) {
      return this.$enumUtils.toMsg('ContractTypeEnmu', val)
    },
    getList() {
      this.listLoading = true
      contractTemplatesList(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    goTinymcePage(type, row) {
      this.$router.push({
        path: '/contract/tinymce',
        query:
          type === 'add' ? {} : { contractTemplateNo: row.contractTemplateNo }
      })
    }
  }
}
</script>
