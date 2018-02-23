$(function () {
    $("#jqGrid").jqGrid({
        url: '../spbond/list',
        datatype: "json",
        colModel: [
			{ label: '客户名称', name: 'userName', index: 'user_name', width: 80 }, 			
			{ label: '合同号', name: 'contractNum', index: 'contract_num', width: 80 }, 			
			{ label: '保证人姓名', name: 'bondName', index: 'bond_name', width: 80 }, 			
			{ label: '保证人手机号码', name: 'bondPhone', index: 'bond_phone', width: 80 }, 			
			{ label: '保证人身份证号码', name: 'bondIdNo', index: 'bond_id_no', width: 80 }, 			
			{ label: '担保人状态:0:失效,1:正常', name: 'bondState', index: 'bond_state', width: 80 }, 			
			{ label: '担保人新增人', name: 'bondAddName', index: 'bond_add_name', width: 80 }, 			
			{ label: '担保人更新人', name: 'bondUpdateName', index: 'bond_update_name', width: 80 }, 			
			{ label: '担保人增加机构', name: 'bondAddDepart', index: 'bond_add_depart', width: 80 }, 			
			{ label: '添加时间', name: 'addTime', index: 'add_time', width: 80 }, 			
			{ label: '修改时间', name: 'updateTime', index: 'update_time', width: 80 },
			{ label: '操作', name: 'handle',  formatter: function(value, options, row){
                        '<button class="layui-btn layui-btn-small" id="detailBtn">申请详情</button>'
                }}
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: false,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
            userName:null,
            contractNum:null,
            sysUserName:null,
            state:null,
		},
		showList: true,
		title: null,
		spBond: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.spBond = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.spBond.id == null ? "../spbond/save" : "../spbond/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.spBond),
			    success: function(r){
			    	if(r.code === 0){
						alert(r, function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../spbond/delete",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert(r, function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(id){
			$.get("../spbond/info/"+id, function(r){
                if(r.code == 0){
                    vm.spBond = r.spBond;
                }else{
                    alert(r.msg);
                }
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{
                    'userName': vm.q.userName,
                    'contractNum': vm.q.contractNum,
                    'sysUserName': vm.q.sysUserName,
					'orgName':$("#orgName").val(),
                    'bapName':$("#bapName").val(),
					'state':$("#state").val(),

                    'contractStartTime':$("#dataInput").val(),
                    'contractEndTime':$("#dataInput1").val()
				},
                page:page
            }).trigger("reloadGrid");
		}
	}
});