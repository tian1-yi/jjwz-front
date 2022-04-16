<template>
  <div>
    <div style="display: flex;justify-content: space-between">
      <div style="margin-top: 10px;">
        <el-input style="width: 300px;margin-right: 10px;"
                  prefix-icon="el-icon-search"
                  v-model="name"
                  @keydown.enter.native="initWarehouses"
                  clearable
                  @clear="initWarehouses"
                  placeholder="请输入仓库名称进行搜索...">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="initWarehouses"
        >搜索
        </el-button>
        <!-- 28-3 @click="showAdvanceSearchVisible = !showAdvanceSearchVisible" -->
        <!-- 28-5 判断图标样式 :class="showAdvanceSearchVisible?'fa fa-angle-double-up':'fa fa-angle-double-down'"-->
        <el-button type="primary">
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
        <el-button type="primary" icon="el-icon-plus" @click="showAddWarehouse">添加仓库</el-button>
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
      <div style="display: flex;justify-content: flex-end">
        <el-pagination
            background
            @current-change="currentChange"
            @size-change="sizeChange"
            layout="sizes, prev, pager, next, jumper, ->, total"
            :total="total">
        </el-pagination>
      </div>
      <el-dialog
          title="添加仓库"
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleClose">
        <div>
          <el-form ref="warehouse" :model="warehouse">
            <el-row>
              <el-col :span="6">
                <el-form-item label="仓库名称：" prop="name">
                  <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                            v-model="warehouse.name" placeholder="请输入仓库名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="邮编：" prop="postcode">
                  <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                            v-model="warehouse.postcode" placeholder="请输入仓库邮编"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手机号码：" prop="phone">
                  <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                            v-model="warehouse.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="管理员：" prop="adminId">
                  <el-dropdown trigger="click" @command="handleCommand">
                    <el-input size="" prefix-icon="el-icon-edit" style="width: 230px" v-model="adminName"
                              placeholder="请输入管理员名字"></el-input>
                    <el-dropdown-menu slot="dropdown" style="width: 230px">
                      <el-dropdown-item v-for="a in admins"
                                        :command="a">{{ a.name }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form-item>

              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系地址：" prop="address">
                  <el-input size="" prefix-icon="el-icon-location" style="width: 560px"
                            v-model="warehouse.address" placeholder="请输入联系地址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="请选择省份：" prop="provinceId">
                  <el-select v-model="provinceId" placeholder="请选择省份" style="width: 250px;" @change="selectProvince">
                    <el-option
                        v-for="(r,index) in provinces"
                        :key="r.id"
                        :label="r.name"
                        :value="r.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="请选择所属市：" prop="cityId">
                  <el-select v-model="cityId" placeholder="请选择所属市" style="width: 250px;" @change="selectCity">
                    <el-option
                        v-for="(r,index) in citys"
                        :key="index"
                        :label="r.name"
                        :value="r.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="请选择所属县：" prop="countyId">
                  <el-select v-model="countyId" placeholder="请选择所属县" style="width: 250px;" @change="selectCounty">
                    <el-option
                        v-for="(r,index) in coutys"
                        :key="index"
                        :label="r.name"
                        :value="r.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人：" prop="title">
                  <el-input size="" prefix-icon="el-icon-location" style="width: 560px"
                            v-model="warehouse.title" placeholder="请输入联系人"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWarehouse">确 定</el-button>
        </span>
      </el-dialog>


    </div>
  </div>
</template>

<script>
export default {
  name: "BasicWarehouse",
  data() {
    return {
      warehouses: [],
      total: 0,
      currentPage: 1,
      admins: [],
      size: 10,
      title: '',
      name: '',
      dialogVisible: false,
      warehouse: {
        name: '',
        postcode: '',
        phone: '',
        adminId: '',
        countyId: '',
        address: '',
        title: ''
      },
      citys: [],
      coutys: [],
      provinces: [],
      adminId: '',
      adminName: '',
      provinceId: '',
      cityId: '',
      countyId: ''
    }
  },
  mounted() {
    this.initWarehouses()
  },
  methods: {
    addWarehouse() {
      console.log(this.warehouse)
      this.postRequest('/warehouse/add', this.warehouse).then(resp => {
      })

    },
    selectCounty(countyId) {
      this.warehouse.countyId = countyId
    },
    selectCity(cityId) {
      this.cityId = cityId
      this.getRequest('/county/countys/?cityId=' + this.cityId).then(resp => {
        if (resp) {
          this.coutys = resp
        }
      })
      this.dialogVisible = false
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleCommand(command) {
      this.warehouse.adminId = command.id
      this.adminName = command.name
      console.log(this.warehouse.adminId)
    },
    selectProvince(provinceId) {
      this.provinceId = provinceId
      this.getRequest('/city/citys/?provinceId=' + this.provinceId).then(resp => {
        if (resp) {
          this.citys = resp
        }
      })
    },
    chooseAdmin(id) {
      this.adminId = id
      console.log(1)
    },
    showAddWarehouse() {
      this.getRequest('/adminName/?name=' + '').then(resp => {
        if (resp) {
          this.admins = resp
        }
      })
      this.getRequest('/province/provinces').then(resp => {
        if (resp) {
          this.provinces = resp
        }
      })
      this.dialogVisible = true
    },
    sizeChange(size) {
      this.size = size;
      this.initWarehouses()
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.initWarehouses()
    },
    initWarehouses() {
      console.log(this.name)
      this.getRequest('/warehouse/basic/?currentPage=' + this.currentPage + '&size=' + this.size + '&title=' + this.title + '&name=' + this.name).then(resp => {
        if (resp) {
          this.warehouses = resp.data;
          this.total = resp.total;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>