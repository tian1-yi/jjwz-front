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
                  placeholder="请输入物资名称进行搜索...">
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
        <el-button type="primary" icon="el-icon-plus" @click="showAddMaterial">添加仓库</el-button>
      </div>
    </div>
    <div>
      <el-table
          :data="materials"
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
            prop="name"
            label="物资名称"
            width="260">
        </el-table-column>
        <el-table-column
            prop="btName"
            label="大类别"
            width="200">
        </el-table-column>
        <el-table-column
            prop="stName"
            label="小类别"
            width="200">
        </el-table-column>
        <el-table-column
            prop="meName"
            label="计量单位"
            width="150">
        </el-table-column>
        <el-table-column
            prop="price"
            label="价格"
            width="150">
        </el-table-column>
        <el-table-column
            prop="size"
            label="尺寸"
            width="200">
        </el-table-column>
        <el-table-column
            prop="remark"
            label="备注"
            width="200">
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
          title="添加物资"
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleClose">

        <div>
          <el-form ref="material" :model="material">
            <el-row>
              <el-col :span="6">
                <el-form-item label="物资名称：" prop="name">
                  <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                            v-model="material.name" placeholder="请输入物资名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="尺寸：" prop="size">
                  <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                            v-model="material.size" placeholder="请输入尺寸"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="价格：" prop="price">
                  <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                            v-model="material.price" placeholder="请输入参考价格"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="6">
                  <el-form-item label="请选择计量单位：" prop="measures">
                    <el-select v-model="material.measureId" placeholder="请选择用户角色" style="width: 230px;" >
                      <el-option
                          v-for="(r,index) in measures"
                          :key="index"
                          :label="r.name"
                          :value="r.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="请选择大类别：" prop="bigId">
                  <el-select v-model="material.bigId" placeholder="请选择大类别" style="width: 250px;" @change="selectBigId">
                    <el-option
                        v-for="(r,index) in bigTypes"
                        :key="r.id"
                        :label="r.name"
                        :value="r.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="请选择小类别：" prop="smallId">
                  <el-select v-model="material.smallId" placeholder="请选择小类别" style="width: 250px;" >
                    <el-option
                        v-for="(r,index) in smallTypes"
                        :key="r.id"
                        :label="r.name"
                        :value="r.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注：" prop="remark">
                  <el-input size="" prefix-icon="el-icon-edit"
                            v-model="material.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMaterial">确 定</el-button>
        </span>
      </el-dialog>


    </div>
  </div>
</template>

<script>
export default {
  name: "BasicInfo",
  mounted() {
    this.intiMaterials()
  },
  data() {
    return {
      name: '',
      materials: [],
      material: {
        name: '',
        size: '',
        price: 0,
        smallId: '',
        measureId: '',
        remark: '',
        bigId: ''
      },
      currentPage: 1,
      size: 10,
      dialogVisible: false,
      measures: [],
      bigTypes: [],
      smallTypes: []
    }
  },
  methods: {
    addMaterial() {
      this.postRequest('/material/add', this.material).then(resp => {
      })
      this.dialogVisible = false;
      this.intiMaterials()
    },
    selectBigId() {
      this.getRequest('/smalltype/getByBig?bigId=' + this.material.bigId).then(resp => {
        if (resp) {
          console.log(resp)
          this.smallTypes = resp;
        }
      })
    },
    intiMaterials() {
      this.getRequest('/material/basic/?currentPage=' + this.currentPage + '&size=' + this.size + '&name=' + this.name).then(resp => {
        if (resp) {
          console.log(resp.data)
          this.materials = resp.data;
          this.total = resp.total;
        }
      })
    },
    showAddMaterial() {
      this.getRequest('/measure/all').then(resp => {
        if (resp) {
          console.log(resp)
          this.measures = resp;
        }
      })
      this.getRequest('/bigtype/all').then(resp => {
        if (resp) {
          console.log(resp)
          this.bigTypes = resp;
        }
      })
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>