<template>
  <div>
    <!-- 1、 -->

    <div style="display: flex;justify-content: space-between">
      <div style="margin-right: 150px;">

      </div>
      <div style="margin-top: 10px; ">
        <!-- 9、v-model="keywords" \ @click="doSearch">搜索 -->
        <el-input v-model="keywords" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                  style="width: 400px;margin-right: 10px;"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-button type="primary" icon="el-icon-pllus" @click="showAddPage">添加账号</el-button>
      </div>
    </div>

    <el-dialog
        :title="formTitle"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="80%">
      <div>
        <el-form ref="account" :model="account" :rules="adminRoles">
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名：" prop="name">
                <el-input size="" prefix-icon="el-icon-edit" style="width: 230px"
                          v-model="account.name" placeholder="请输入姓名" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别：" prop="sex">
                <el-radio-group v-model="account.sex" style="margin-top: 12px;">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="手机号码：" prop="phone">
                <el-input size="" prefix-icon="el-icon-mobile-phone" style="width: 230px"
                          v-model="account.phone" placeholder="请输入手机号码" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="住宅电话：" prop="telephone">
                <el-input size="" prefix-icon="el-icon-phone" style="width: 230px"
                          v-model="account.telephone" placeholder="请输入住宅电话" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="用户名：" prop="username">
                <el-input size="" prefix-icon="el-icon-user" style="width: 230px"
                          v-model="account.username" placeholder="请输入用户名" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="密码：" prop="password">
                <el-input size="" prefix-icon="el-icon-lock" style="width: 230px" type="password"
                          v-model="account.password" placeholder="请输入密码" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="确认密码：" prop="cpw">
                <el-input size="" prefix-icon="el-icon-circle-check" style="width: 230px" type="password"
                          v-model="account.cpw" placeholder="请输入密码" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否启用：" prop="enabled">
                <el-radio-group v-model="account.enabled" style="margin-top: 12px;">
                  <el-radio label="true">启用</el-radio>
                  <el-radio label="false">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系地址：" prop="address">
                <el-input size="" prefix-icon="el-icon-location" style="width: 560px"
                          v-model="account.address" placeholder="请输入联系地址" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：" prop="remark">
                <el-input size="" prefix-icon="el-icon-chat-line-square" style="width: 560px"
                          v-model="account.remark" placeholder="请输入备注" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="请选择用户角色：" prop="roles">
                <el-select v-model="account.roleIds" multiple placeholder="请选择用户角色" style="width: 230px;" >
                  <el-option
                      v-for="(r,index) in allRoles"
                      :key="index"
                      :label="r.nameZh"
                      :value="r.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属仓库：" prop="warehouseId">
                <el-popover
                  placement="bottom"
                  title="请选择所属仓库"
                  width="300"
                  trigger="manual"
                  v-model="wvisible">
                  <div class="device-tree">
                    <el-scrollbar style="height:100%">
                  <el-tree :data="allWarehouses" style="max-height: 300px;" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </el-scrollbar>
                  </div>
                  <div slot="reference" style="width: 150px;text-align: center; border: 1px solid #dedede; border-radius: 5px; cursor: pointer"
                       @click="showWarehouseView">
                      {{account.warehouseName}}
                  </div>
                </el-popover>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postAdmin">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 2、6、 -->
    <div class="admin-container">
      <el-card class="admin-card" v-for="(admin,index) in admins" :key="index">
        <div slot="header" class="clearfix">
          <span>{{ admin.name }}</span>
          <!-- 12、 @click="deleteAdmin(admin)" -->
          <el-button style="float: right; padding: 2px 2px; margin-left: 4px;" type="primary" icon="el-icon-edit" @click="updateAdmin(admin)"></el-button>
          <el-button style="float: right; padding: 3px 0;color:red;" type="text" icon="el-icon-delete"
                     @click="deleteAdmin(admin)"></el-button>
        </div>
        <div>
          <div class="img-container">
            <img :src="admin.userFace" :alt="admin.name" :title="admin.name" class="userFace-img">
          </div>
        </div>
        <div class="userinfo-container">
          <div>用户名：{{ admin.name }}</div>
          <div>手机号码：{{ admin.phone }}</div>
          <div>电话号码：{{ admin.telephone }}</div>
          <div>地址：{{ admin.address }}</div>
          <div>用户状态：
            <!-- 14、更新操作员 @change="enabledChange(admin)" -->
            <el-switch
                v-model="admin.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="enabledChange(admin)"
                active-text="启用"
                inactive-text="禁用">
            </el-switch>
          </div>
          <div>
            用户角色：
            <el-tag style="margin-right: 4px;" type="success" v-for="(role,index) in admin.roles" :key="index">
              {{ role.nameZh }}
            </el-tag>
            <!-- 16、更新操作员角色 弹出框、选择器、 -->
            <!-- 20、@show="showPop(admin)" -->
            <!-- 24、@hide="hidePop(admin)" hide 隐藏时触发-->
            <el-popover
                placement="right"
                title="角色列表"
                width="200"
                @show="showPop(admin)"
                @hide="hidePop(admin)"
                trigger="click">
              <!-- 17、更新操作员角色 下拉框 -->
              <!-- 22、v-model="selectedRoles" 存的是1个角色id，multiple 多选，显示已有角色 -->
              <el-select v-model="selectedRoles" multiple placeholder="请选择">
                <el-option
                    v-for="(r,index) in allRoles"
                    :key="index"
                    :label="r.nameZh"
                    :value="r.id">
                </el-option>
              </el-select>
              <!-- 3个点按钮 ... -->
              <el-button slot="reference" type="text" icon="el-icon-more"></el-button>
            </el-popover>
          </div>
          <div>备注：{{ admin.remark }}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "SystemAdmin",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.account.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    };
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      opType: null,
      formTitle: '',
      allWarehouses: [],
      wvisible: false,
      admins: [], // 3
      keywords: '', // 8、搜索关键字
      allRoles: [], // 18、更新操作员角色
      selectedRoles: [], // 23
      dialogVisible: false,
      account: {
        id: '',
        name: '',
        phone: '',
        telephone: '',
        address: '',
        username: '',
        password: '',
        cpw: '',
        userFace: '',
        enabled: null,
        sex: null,
        remark: '',
        roleIds: [],
        warehouseId: null,
        warehouseName: '请选择仓库'
      },
      adminRoles: {
        name: [{required: true, message: '请输入名字', trigger: 'blur'}],
        phone: [{required: true, message: '请输入手机号码', trigger: 'blur'}],
        telephone: [{required: true, message: '请输入联系电话', trigger: 'blur'}],
        address: [{required: true, message: '请输入地址', trigger: 'blur'}],
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        cpw: [{required: true, validator: validatePass, trigger: 'blur'}],
        // userFace: [{required: true, message: '请选择图像', trigger: 'blur'}],
        enabled: [{required: true, message: '请选择是否启用', trigger: 'blur'}],
        sex: [{required: true, message: '请选择性别', trigger: 'blur'}],
        warehouseId: [{required: true, message: '请选择仓库', trigger: 'blur'}],
      }
    }
  },
  mounted() {
    this.initAdmins() // 5
  },
  methods: {
    updateAdmin(admin){
      this.initForm()
      this.formTitle = '修改账号';
      this.opType = 1;
      this.dialogVisible = true;
      this.initAllRoles();
      this.getRequest(' /system/admin/getid/' + admin.id).then(resp => {
        if (resp) {
          console.log(resp)
          this.account.id = resp.id;
          this.account.name = resp.name;
          this.account.phone = resp.phone;
          this.account.telephone = resp.telephone;
          this.account.address = resp.address;
          this.account.username = resp.username;
          this.account.password = resp.password;
          this.account.cpw = '';
          this.account.userFace = resp.userFace;
          this.account.enabled = resp.enabled;
          this.account.sex = resp.sex;
          this.account.remark = resp.remark;
          for (let i = 0; i < resp.roles.length; i ++) {
            console.log(resp.roles[i].id)
            this.account.roleIds.push(resp.roles[i].id)
          }
          this.account.warehouseId = resp.warehouseId;
          this.account.warehouseName = resp.warehouse.name;
          // for (let i = 0; i < this.allWarehouses.length; i ++) {
          //   if (this.allWarehouses[i].)
          // }
        }
      })
      console.log("showupdate")
      console.log(this.account)
    },
    postAdmin() {
      console.log(this.account)
      if (this.opType === 0) {
        this.$refs['account'].validate(valid => {
          if (valid) {
            this.postRequest('/system/admin/add', this.account).then(resp => {
              if (resp) {

              }
            })
          }
        })
      } else {
        console.log("update")
        console.log(this.account)
        this.$refs['account'].validate(valid => {
          if (valid) {
            this.postRequest('/system/admin/update', this.account).then(resp => {
              if (resp) {

              }
            })
          }
        })
      }
      this.dialogVisible = false
      this.wvisible = false
      this.initAdmins()
      this.formTitle = ''
    },
    initForm() {
          this.account.id = '';
          this.account.name = '';
          this.account.phone = '';
          this.account.telephone = '';
          this.account.address = '';
          this.account.username = '';
          this.account.password = '';
          this.account.cpw = '';
          this.account.userFace = '';
          this.account.enabled = null;
          this.account.sex = null;
          this.account.remark = '';
          this.account.roleIds = [];
          this.account.warehouseId = null;
          this.account.warehouseName = '请选择仓库';
    },
    handleNodeClick(data) {
      if (data.address) {
        this.wvisible = !this.wvisible
        this.account.warehouseId = data.id
        this.account.warehouseName = data.name
      }

    },
    showWarehouseView() {
      this.wvisible = !this.wvisible;
    },
    showAddPage() {
      this.initForm()
      this.formTitle = '添加账号';
      this.dialogVisible = true;
      this.initAllRoles();
      this.opType = 0;
    },
    handleClose() {
      this.wvisible = false;
      this.dialogVisible = false;
    },
    // 25、更新操作员角色
    hidePop(admin) {
      let roles = []
      Object.assign(roles, admin.roles) // 拷贝对象
      let flag = false
      // 如果选中的角色 id 的长度和原来的不一样
      if (roles.length != this.selectedRoles.length) { // 用户对应角色id
        flag = true
      } else {
        // 角色 id 长度和原来的一样，但可能角色不一样
        // 先循环 admin.roles
        for (let i = 0; i < roles.length; i++) {
          let role = roles[i] // 用户对应的角色对象
          for (let j = 0; j < this.selectedRoles.length; j++) {
            let sr = this.selectedRoles[j]  // 拿到用户对应的角色对象的id
            if (role.id == sr) { // 角色一样
              roles.splice(i, 1) // 删除
              i--
              break
            }
          }
        }
        if (roles.length != 0) {
          flag = true
        }
      }
      if (flag) {
        // 拼接 url(参数为 adminId、角色 rids )
        let url = '/system/admin/role?adminId=' + admin.id;
        this.selectedRoles.forEach(sr => {
          url += '&rids=' + sr
        });
        this.putRequest(url).then(resp => {
          if (resp) {
            this.initAdmins()
          }
        });
      }
    },
    // 21、下拉框获取所有用户角色
    showPop(admin) {
      this.initAllRoles()
      let roles = admin.roles // 拿到整个数组
      this.selectedRoles = []
      roles.forEach(r => {
        this.selectedRoles.push(r.id) // r.id 相同的角色放进数组
      })
    },
    // 19、获取所有操作员
    initAllRoles() {
      this.getRequest(' /system/admin/roles').then(resp => {
        if (resp) {
          this.allRoles = resp
        }
      })
    },
    // 15、更新操作员
    enabledChange(admin) {
      this.putRequest('/system/admin/', admin).then(resp => {
        if (resp) {
          this.initAdmins()
        }
      })
    },
    // 13、删除操作员
    deleteAdmin(admin) {
      this.$confirm('此操作将永久删除该[' + admin.name + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/admin/' + admin.id).then(resp => {
          if (resp) {
            this.initAdmins()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 10 搜索
    doSearch() {
      this.initAdmins()
    },
    // 4、获取所有操作员；11、加参数关键字
    initAdmins() {
      this.getRequest('/system/admin/?keywords=' + this.keywords).then(resp => {
        if (resp) {
          this.admins = resp
        }
      })
      this.getRequest('/system/admin/allWarehouses').then(resp => {
        if (resp) {
          console.log(resp)
          console.log(resp)
          this.allWarehouses = resp
        }
      })
    }
  }
}
</script>

<style>
/* 7 */
.admin-container {
  margin-top: 10px;
  display: flex;
  justify-content: space-around; /* 在弹性盒对象的 <div> 元素中的各项周围留有空白：*/
  flex-wrap: wrap; /* 自动换行 */
}

.admin-card {
  width: 350px;
  margin-bottom: 20px;
}

.userFace-img {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}

/* 头像居中 */
.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.userinfo-container {
  font-size: 12px;
  color: #3e9ef5;
}
</style>
