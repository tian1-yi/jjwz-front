<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="权限组" name="PositionMana"><PositionMana/></el-tab-pane>
      <el-tab-pane label="奖惩规则" name="EcMana"><PosMana/></el-tab-pane>
    </el-tabs>
  </div>
</template>



<script>
import PositionMana from "@/components/system/PositionMana";
import PosMana from "@/components/system/PosMana";
export default {
  name: "SystemBasic",
  components:{
    PositionMana,
    PosMana
  },
  data() {
    return {
      activeName: 'PositionMana' // 激活项
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>