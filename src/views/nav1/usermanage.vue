<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" v-on:click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column type="selection" width="55">
				</el-table-column>
                <el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="username" label="用户名" width="120" sortable>
				</el-table-column>
                <el-table-column prop="name" label="姓名" width="120" sortable>
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
				</el-table-column>
				<el-table-column prop="email" label="邮件" width="100" sortable>
				</el-table-column>
				<el-table-column prop="addr" label="地址" min-width="180" sortable>
				</el-table-column>
                <el-table-column label="操作" width="350" sortable>
                    <template slot-scope="scope">
                        <el-button size="small" @click="handlerole(scope.$index, scope.row)">绑定</el-button>
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
				</el-table-column>
			</el-table>
		</template>

        <!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="用户名" prop="username">
                                        <el-input v-model="addForm.username" auto-complete="off"></el-input>
                                </el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="邮箱">
			             <el-input v-model="addForm.email" auto-complete="off"></el-input>	
				</el-form-item>
				<el-form-item label="头像">
                                     <el-input v-model="addForm.avatar" auto-complete="off"></el-input>
                                </el-form-item>				
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

	</section>
</template>
<script>
	import { getUserListPage,addUser } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
                },
                users : [{'username':'sb'}],
                total : 0,
                page: 1,
                listLoading : false,
                sels: [],
                editFormVisible: false,
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message:'请输入名字', trigger: 'blur'}
                    ]
                },
                editForm: {
                    id: 0,
                    name: '',
                    sex: -1,
                    age:0,
                    birth:'',
                    addr:''
                },
                addFormVisible: false,
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message:'请输入名字', trigger: 'blur'}
                    ]
                },
                addForm: {
                    username: '',
                    name: '',
                    sex: -1,
                    email:'',
                    addr:'',
                    avatar:'',
                },
                roleVisble:false,
                RoleLoading:false,
                userdata:'',
                cities:'',
                roleForm:{
                    city: []
                }
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            handleCheckCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;

            },
			//获取用户列表
			getUsers: function () {
				let para = {
                    page : this.page,
					name:this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				 getUserListPage(para).then((res) => {
                    console.log('*******************************************')
                    console.log(res)
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
					//NProgress.done();
				});
            },
            handleAdd: function () {	
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: 1,
					email: '',	
					addr: '',
					avatar: ''
				};
			},
            handleDel: function(index,row){
                this.$confirm('确认删除?',{type:'warning'}).then(() => {
                    this.listLoading = true;
                    let para = {id:row.id};
                    removeUser(para.id).then((res) => {
                        this.listLoading = false;

                    })
                })
            },
            addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							console.log(para)	
						//	para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
		},
		mounted() {
			this.getUsers();
		}
	};

</script>

<style scoped>

</style>