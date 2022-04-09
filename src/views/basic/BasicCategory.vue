<template>
  <div style="padding-top: 20px">
    <el-col :span="6">
      <div style="display: flex;justify-content: space-between">
        <el-button type="success">
          大类别
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="">添加类别</el-button>
      </div>
      <el-table
          :data="bigType"
          ref="multipleTable"
          stripe
          border
          @selection-change="handleSelectionChange"
          @select="selectChange"
          style="width: 100%">
        <el-table-column
            type="selection"
            :selectable="selectRow"
            width="55"/>
        <el-table-column
            prop="id"
            label="ID"
            width="80">
        </el-table-column>
        <el-table-column
            prop="name"
            label="name"
            width="80">
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            width="100">
          <template slot-scope="scope">
            <!-- 25-4 给编辑按钮绑定点击事件 @click="showEmpView(scope.row)" -->
            <el-button style="padding: 3px;" size="mini" @click="showEmpView(scope.row)">编辑</el-button>
            <el-button style="padding: 3px;" size="mini" type="danger" @click="deleteEmp(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="3">
      <el-button class="el-icon-arrow-right " style="font-size: 50px; left: 80px; top: 200px; position: relative" @click="initSmallType"/>
    </el-col>
    <el-col :span="8">
      <div style="display: flex;justify-content: space-between">
        <el-button type="success">
          小类别
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="">添加类别</el-button>
      </div>
      <el-table
          :data="smallType"
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
            label="name"
            width="260">
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            width="100">
          <template slot-scope="scope">
            <!-- 25-4 给编辑按钮绑定点击事件 @click="showEmpView(scope.row)" -->
            <el-button style="padding: 3px;" size="mini" @click="showEmpView(scope.row)">编辑</el-button>
            <el-button style="padding: 3px;" size="mini" type="danger" @click="deleteEmp(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="1">
    </el-col>
    <el-col :span="6" offset="1">
      <div style="display: flex;justify-content: space-between">
        <el-button type="success">
          计量单位
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="">添加计量单位</el-button>
      </div>
      <el-table
          :data="measures"
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
            label="name"
            width="180">
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            width="100">
          <template slot-scope="scope">
            <!-- 25-4 给编辑按钮绑定点击事件 @click="showEmpView(scope.row)" -->
            <el-button style="padding: 3px;" size="mini" @click="showEmpView(scope.row)">编辑</el-button>
            <el-button style="padding: 3px;" size="mini" type="danger" @click="deleteEmp(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "BasicCategory",
  data() {
    return {
      currentPage: 1,
      size: 10,
      measures: [],
      bigType: [],
      smallType: [],
      selectioned: '',
      scurrentPage: 1,
      ssize: 10
    }
  },
  mounted() {
    this.initBigType()
    this.initMeasures()
  },
  methods: {
    initMeasures() {
      this.getRequest('/measure/basic/?currentPage=' + this.currentPage + '&size=' + this.size).then(resp => {
        if (resp) {
          this.measures = resp.data;
          this.total = resp.total;
        }
      })
    },
    initBigType() {
      this.getRequest('/bigtype/basic/?currentPage=' + this.currentPage + '&size=' + this.size).then(resp => {
        if (resp) {
          this.bigType = resp.data;
          this.total = resp.total;
        }
      })
    },
    initSmallType() {
      this.getRequest('/smalltype/basic/?currentPage=' + this.scurrentPage + '&size=' + this.ssize + '&selectioned=' + this.selectioned.id).then(resp => {
        if (resp) {
          this.smallType = resp.data;
          this.total = resp.total;
        }
      })
    },
    selectChange(selection, row) {
      // console.log(index)
      // console.log(row)
      this.$refs.multipleTable.clearSelection();
      if (selection.lenth === 0) {
        return
      }
      if (row) {
        this.selectioned = row
        console.log(row)
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
      // this.$refs.multipleTable.toggleRowSelection(bigType[]);
    },
    indexMethod(index) {
      console.log(index)
    },
    selectRow(row, index) {
      // this.$refs.multipleTable.clearSelection();
      // this.$refs.multipleTable.toggleRowSelection();
      return true
    },
    handleSelectionChange(index) {
      // // this.$refs.multipleTable.clearSelection();
      // for (var item in this.bigType) {
      //   this.$refs.multipleTable.toggleRowSelection(item, false);
      // }
      // this.$refs.multipleTable.toggleRowSelection(index[0], true);
      // console.log(index)
    }

  }
}
</script>

<style scoped>

</style>