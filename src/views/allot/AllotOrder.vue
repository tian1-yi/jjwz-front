<template>
  <div>
    <div style="display: flex;justify-content: space-between">
      <div style="margin-top: 10px;">
        <el-input style="width: 300px;margin-right: 10px;"
                  prefix-icon="el-icon-search"
                  v-model="name"
                  @keydown.enter.native=""
                  clearable
                  @clear=""
                  placeholder="请输入仓库名称进行搜索...">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click=""
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
        <el-button type="primary" icon="el-icon-plus" @click="showAddPurchase">添加调拨订单</el-button>
      </div>
    </div>
    <div>
      <el-table
          :data="purchaseOrders"
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
            prop="cname"
            label="所属县"
            width="100">
        </el-table-column>
        <el-table-column
            prop="ciname"
            label="所属市"
            width="100">
        </el-table-column>
        <el-table-column
            prop="pname"
            label="所属省"
            width="100">
        </el-table-column>
        <el-table-column
            prop="sname"
            label="表单状态"
            width="200">
        </el-table-column>
        <el-table-column
            prop="concat"
            label="联系人"
            width="100">
        </el-table-column>
        <el-table-column
            prop="fax"
            label="传真"
            width="150">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="联系电话"
            width="150">
        </el-table-column>
        <el-table-column
            prop="postcode"
            label="邮编"
            width="100">
        </el-table-column>
        <el-table-column
            prop="address"
            label="详细地址"
            width="250">
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
          title="添加调拨订单"
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleClose">
        <div>
          <el-form ref="warehouse" :model="purchase">
            <el-row style="padding-bottom: 10px">
              <strong>
                调拨单位
              </strong>

            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="邮编：" prop="postcode">
                  <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                            v-model="purchase.postcode" placeholder="请输入仓库邮编"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手机号码：" prop="phone">
                  <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                            v-model="purchase.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系地址：" prop="address">
                  <el-input size="" prefix-icon="el-icon-location" style="width: 560px"
                            v-model="purchase.address" placeholder="请输入联系地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="联系人：" prop="concat">
                  <el-input size="" prefix-icon="el-icon-location" style="width: 260px"
                            v-model="purchase.concat" placeholder="请输入联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
              <el-col :span="6">
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
              <el-col :span="6">
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
              <el-col :span="6">
                <el-form-item label="传真：" prop="fax">
                  <el-input size="" prefix-icon="el-icon-location" style="width: 260px"
                            v-model="purchase.fax" placeholder="请输入传真"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="备注：" prop="remark">
                  <el-input size="" prefix-icon="el-icon-location" style="width: 900px"
                            v-model="purchase.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div style="padding-bottom: 20px; display: flex;justify-content: space-between">
                <div>
                  <strong>
                    添加物资
                  </strong>
                </div>

                <div>
                  <el-button type="primary" @click="addMete">
                    增加物资
                  </el-button>
                </div>
              </div>


            </el-row>

            <el-row v-for="(oprationMaterial, index) in purchase.operationMaterials" :key="index">
              <el-col :span="6">
                <el-form-item label="请选择大类别：" prop="bigId">
                  <el-select v-model="bigIds[index]" placeholder="请选择大类别" style="width: 250px;"
                             @change="selectBigId(index)">
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
                  <el-select v-model="smallids[index]" placeholder="请选择小类别" style="width: 250px;"
                             @change="selectSmallId(index)">
                    <el-option
                        v-for="(r,index) in smallTypes[index]"
                        :key="r.id"
                        :label="r.name"
                        :value="r.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="请选择物资：" prop="materialId">
                  <el-select v-model="materialId[index]" placeholder="请选择物资" style="width: 250px;"
                             @change="selectMaterialId(index)">
                    <el-option
                        v-for="(r,index) in materiales[index]"
                        :key="r"
                        :label="r.name"
                        :value="r">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="0" prop="name">
                  <div>

                  </div>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="物资名称：" prop="name">
                  <div>
                    {{ materialId.at(index).name }}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="尺寸：" prop="size">
                  <div>
                    {{ materialId.at(index).size }}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="参考价格：" prop="price">
                  <div>
                    {{ materialId.at(index).price }}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="计量单位：" prop="material">
                  <div>
                    {{ materialId.at(index).material }}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="数量：" prop="count">
                  <el-input size="" prefix-icon="el-icon-location" style="width: 150px"
                            v-model="purchase.operationMaterials[index].count" placeholder="请输入数量"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="价格：" prop="price">
                  <el-input size="" prefix-icon="el-icon-location" style="width: 150px"
                            v-model="purchase.operationMaterials[index].price" placeholder="请输入购买价格"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOperation">确 定</el-button>
        </span>
      </el-dialog>


    </div>
  </div>
</template>

<script>
export default {
  name: "AllotOrder",
  data() {
    return {
      purchaseOrders: [],
      bigTypes: [],
      bigIds: [],
      smallids: [],
      provinceId: '',
      cityId: '',
      countyId: '',
      citys: [],
      coutys: [],
      provinces: [],
      dialogVisible: false,
      purchases: [],
      materialId: [{}],
      purchase: {
        phone: '',
        countyId: '',
        postcode: '',
        address: '',
        concat: '',
        fax: '',
        operationMaterials: [
          {
            bigId: '',
            smallId: '',
            materialId: '',
            count: '',
            smallTypes: [],
            price: '',
            name: '',
            material: '',
            size: '',
            materialInfo:
                {
                  materialId: 0,
                  count: '0',
                  price: '0'
                }

          }
        ]
      },
      smallTypes: [{}],
      total: 0,
      materiales: [[
        {}
      ]],
      selectMaterial: [
        {}
      ],
      currentPage: 1,
      size: 10
    }
  },
  mounted() {
    this.initPruchaseOrder()
  },
  methods: {
    initPruchaseOrder() {
      this.getRequest('/operation-info/getAllAllot/?currentPage=' + this.currentPage + '&size=' + this.size).then(resp => {
        if (resp) {
          console.log(resp)
          this.purchaseOrders = resp.data;
          this.total = resp.total;
        }
      })
      console.log(this.purchaseOrders)
    },
    addOperation() {
      var i = 0
      for (var j = 0; j < this.purchase.operationMaterials.length; j ++) {
        console.log(this.materialId[j])
        this.purchase.operationMaterials[j].materialId = this.materialId[j].id
      }
      console.log(this.purchase)

      this.postRequest('/operation-info/addAllot', this.purchase).then(resp => {
      })
    },
    addMete() {
      this.purchase.operationMaterials.push({
        bigId: '',
        smallId: '',
        materialId: '',
        count: '',
        smallTypes: [],
        price: '',
        name: '',
        size: '',
        materialInfo:
            {
              materialId: '',
              count: '0',
              price: '0'
            }
      })
      this.materialId.push({})
    },
    selectMaterialId(index) {
      // console.log(this.materiales[index])
      // console.log(this.materialId)
      // console.log()
      // this.selectMaterial[index] = this.materiales[index][this.materialId[index]]
      // console.log(this.selectMaterial)
      console.log(this.materialId)
    },
    selectSmallId(index) {
      console.log(this.smallids)
      this.getRequest('/material/getBySmallId?smallId=' + this.smallids[index]).then(resp => {
        if (resp) {
          console.log(this.materiales)
          console.log(resp)
          this.materiales[index] = resp;
        }
      })
      console.log(this.materiales)
    },
    selectBigId(index) {
      console.log(this.bigIds)
      console.log(index)
      this.getRequest('/smalltype/getByBig?bigId=' + this.bigIds[index]).then(resp => {
        if (resp) {
          console.log(resp)
          this.smallTypes[index] = resp;
        }
      })
    },
    showAddPurchase() {
      this.dialogVisible = true
      this.getRequest('/province/provinces').then(resp => {
        if (resp) {
          this.provinces = resp
        }
      })
      this.getRequest('/bigtype/all').then(resp => {
        if (resp) {
          this.bigTypes = resp;
        }
      })
    },
    selectProvince(provinceId) {
      this.provinceId = provinceId
      this.getRequest('/city/citys/?provinceId=' + this.provinceId).then(resp => {
        if (resp) {
          this.citys = resp
        }
      })
    },
    selectCounty(countyId) {
      this.purchase.countyId = countyId
    },
    selectCity(cityId) {
      this.cityId = cityId
      this.getRequest('/county/countys/?cityId=' + this.cityId).then(resp => {
        if (resp) {
          this.coutys = resp
        }
      })
    },
  }
}
</script>

<style scoped>

</style>