<template>
  <div>
    <div style="display: flex;justify-content: space-between">
      <div style="margin-top: 10px;">
        <el-input style="width: 300px;margin-right: 10px;"
                  prefix-icon="el-icon-search"
                  placeholder="请输入员工名进行搜索...">
        </el-input>
        <el-button type="primary" icon="el-icon-search"
                   >搜索
        </el-button>
        <!-- 28-3 @click="showAdvanceSearchVisible = !showAdvanceSearchVisible" -->
        <!-- 28-5 判断图标样式 :class="showAdvanceSearchVisible?'fa fa-angle-double-up':'fa fa-angle-double-down'"-->
        <el-button type="primary" >
          <i class="fa fa-angle-double-up"
             aria-hidden="true"></i>高级搜索
        </el-button>
      </div>
      <div>
        <el-button type="success">
          <i class="fa fa-level-up" aria-hidden="true"></i>
          导入数据
        </el-button>
        <el-button type="success">
          <i class="fa fa-level-down" aria-hidden="true"></i>
          导出数据
        </el-button>
        <el-button type="primary" icon="el-icon-plus">添加员工</el-button>
      </div>
    </div>
    <div>
        <el-table
            :data="warehouses"
            stripe
            border
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55"/>
          <el-table-column
              prop="id"
              label="ID"
              width="80">
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              width="260">
          </el-table-column>
          <el-table-column
              prop="postcode"
              label="邮编"
              width="100">
          </el-table-column>
          <el-table-column
              prop="phone"
              label="电话"
              width="150">
          </el-table-column>
          <el-table-column
              prop="name"
              label="名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="title"
              label="联系人"
              width="180">
          </el-table-column>
          <el-table-column
              prop="county.name"
              label="所属县"
              width="100">
          </el-table-column>
          <el-table-column
              prop="city.name"
              label="所属市"
              width="100">
          </el-table-column>
          <el-table-column
              prop="province.name"
              label="所属省"
              width="100">
          </el-table-column>
          <el-table-column
              prop="admin.id"
              label="管理员ID"
              width="100">
          </el-table-column>
          <el-table-column
              prop="admin.name"
              label="管理员姓名"
              width="180">
          </el-table-column>
          <el-table-column
              label="操作"
              fixed="right"
              width="300">
            <template slot-scope="scope">
              <!-- 25-4 给编辑按钮绑定点击事件 @click="showEmpView(scope.row)" -->
              <el-button style="padding: 3px;" size="mini" @click="showEmpView(scope.row)">编辑</el-button>
              <el-button style="padding: 3px;" size="mini" type="primary" plain>查看高级资料</el-button>
              <!-- 24-1 删除员工 @click="deleteEmp(scope.row)" -->
              <el-button style="padding: 3px;" size="mini" type="danger" @click="deleteEmp(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

    </div>
  </div>
</template>

<script>
export default {
  name: "BasicWarehouse",
  data() {
    return {
      warehouses: []
    }
  },
  mounted() {
    this.initWarehouses()
  },
  methods: {
    initWarehouses() {
      this.getRequest('/warehouse/basic').then(resp => {
        if (resp) {
          this.warehouses = resp;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>