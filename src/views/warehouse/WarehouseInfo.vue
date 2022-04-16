<template>
  <div>
    <div style="padding-top: 10px">
      <el-form ref="warehouse" :model="warehouse">
        <el-row>
          <el-col :span="6">
            <el-form-item label="仓库名称：" prop="name">
              {{ warehouse.name }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮编：" prop="postcode">
              {{ warehouse.postcode }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码：" prop="phone">
              {{ warehouse.phone }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="管理员：" prop="adminId">
              {{ warehouse.adminName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系地址：" prop="address">
              {{ warehouse.address }}
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="所属省份：" prop="provinceId">
              {{ warehouse.provinceName }}
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="所属市：" prop="cityId">
              {{ warehouse.cityName }}
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="所属县：" prop="countyId">
              {{ warehouse.countyName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人：" prop="title">
              {{ warehouse.title }}
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
    <div>
      <el-collapse v-model="activeName" accordion @change="change">
        <el-collapse-item :title="b.name" :name="b.id" v-for="(b, index) in bigTypes" :key="index">

            <el-table :data="smallTypes" @expand-change="show" >
              <el-table-column type="expand" >
                <template slot-scope="props" @click="show(props)">
                  <el-form ref="materials" v-for="(r, index) in materials">
                    <el-card>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="名称：" prop="name">
                            <el-input size="" prefix-icon="el-icon-edit" style="width: 230px" readonly
                                      v-model="r.name" placeholder="请输入名称" ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="库存数：" prop="count">
                            <el-input size="" prefix-icon="el-icon-edit" style="width: 230px" readonly
                                      v-model="r.count" placeholder="" ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="规格：" prop="size">
                            <el-input size="" prefix-icon="el-icon-edit" style="width: 230px" readonly
                                      v-model="r.size" placeholder="" ></el-input>
                          </el-form-item>
                        </el-col>

                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="参考价格：" prop="wprice">
                            <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                                      v-model="r.wprice" placeholder="参考价格" ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="库存最大值：" prop="max">
                            <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                                      v-model="r.max" placeholder="库存最大值" ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="库存最小值：" prop="min">
                            <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                                      v-model="r.min" placeholder="库存最大值" ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">

                            <el-button type="primary" @click="update(r)">修改</el-button>

                        </el-col>
                      </el-row>
                    </el-card>


                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                  prop="name"
                  >
              </el-table-column>
            </el-table>


        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "WarehouseInfo",
  mounted() {
    this.initWarehouse()
    this.initBigTypes()
  },
  data() {
    return {
      warehouse: {
        name: '11',
        postcode: '',
        phone: '',
        adminId: '',
        countyId: '',
        address: '',
        title: '',
        adminName: '',
        provinceName: '',
        cityName: '',
        countyName: ''
      },
      activeName: -1,
      bigTypes: [],
      smallTypes: [],
      materials: [],
    }
  },
  methods: {
    update(r) {
      console.log(r)
      this.postRequest("/warehouse-material/update", r).then(resp => {

      })
    },

    show(props) {
      console.log(props)
      this.getRequest("/warehouse-material/get?smallId=" + props.id).then(resp => {
        console.log(resp)
        if (resp) {
          this.materials = resp
          console.log(111)
          console.log(this.materials)
        }
        console.log(resp)
      })
    },
    change(val) {
      console.log(val)
      this.getSmallTypes(val)
    },
    change2(val) {
      console.log(val)
    },
    getSmallTypes(big) {
      this.getRequest("/smalltype/getByBig?bigId=" + big).then(resp => {
        if (resp) {
          this.smallTypes = resp
        }
        console.log(resp)
      })
    },
    initWarehouse() {
      this.getRequest("/warehouse/get").then(resp => {
        if (resp) {
          this.warehouse = resp
        }
      })
    },
    initBigTypes() {
      this.getRequest("/bigtype/all").then(resp => {
        if (resp) {
          this.bigTypes = resp
          console.log(resp)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>