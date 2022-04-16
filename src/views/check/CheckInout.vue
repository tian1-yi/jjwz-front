<template>
  <div>
    <div style="display: flex;justify-content: space-between">

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

            <el-button v-if="(scope.row.statusId == 3)" style="padding: 3px;" size="mini" @click="ratify(scope.row)">入库</el-button>
            <el-button v-if="(scope.row.statusId == 3)" style="padding: 3px;" size="mini" @click="back(scope.row)">回退</el-button>
            <el-button v-if="(scope.row.statusId == 4)" style="padding: 3px;" size="mini" @click="ratify(scope.row)">出库</el-button>
            <el-button v-if="(scope.row.statusId == 4)" style="padding: 3px;" size="mini" @click="back(scope.row)">回退</el-button>

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


    </div>
  </div>
</template>

<script>
export default {
  name: "CheckInout",
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
    back(scope) {

    },
    ratify(scope) {
      console.log(scope)
      this.getRequest('/operation-info/check/?id=' + scope.id + '&statusId=' + scope.statusId).then(resp => {
        if (resp) {

        }
      })
      this.initPruchaseOrder()
    },
    initPruchaseOrder() {
      this.getRequest('/operation-info/getForVeritfy/?currentPage=' + this.currentPage + '&size=' + this.size).then(resp => {
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