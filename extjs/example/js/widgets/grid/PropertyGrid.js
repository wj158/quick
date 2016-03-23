var PropertyGrid = function() {
    PropertyGrid.superclass.constructor.call(this, {
		renderTo  : 'propertyGrid',   //指定组件渲染目的对象
		width     : 400,
		autoHeight: true,
		/**
		 * 指定属性及默认值
		 */
		source : {
			"名称" : "属性表格",
			"编码" : "PropertyGrid",
			"宽度" : 300,
			"高度" : 400,
			"自动滚动" : true,
			"允许折叠" : true
		},
        viewConfig : {
			// 自动的调整列宽
            forceFit : true,
			// 预留给滚动条的空白位置
            scrollOffset : 2
        },
		tbar : [{
			text    : "设置默认值",
			scope   : this,
			handler : function () {
				this.setSource({
					"名称" : "属性表格",
					"编码" : "PropertyGrid",
					"宽度" : 300,
					"高度" : 400,
					"自动滚动" : true,
					"允许折叠" : true
	            });
			}
		}, '-', {
			text    : "得到设置值",
			scope   : this,
			handler : function () {
				var values = "";
				var source = this.getSource();
				for(var i in source) {
					values += i + "=" + source[i] + "<br>";
				}
				Ext.Msg.alert("提示",values);
			}
		}, '-', {
			text    : "增加属性",
			scope   : this,
			handler : function () {
				// 先判断新增加的属性是否存在
				var flag = this.store.find('name',"新属性");
				if (flag != -1) {
					Ext.Msg.alert("提示", "此属性已经存在");
				} else {
					this.store.add(new Ext.grid.PropertyRecord({
						name : "新属性",
						value: "我是新属性"
					}));
				}
			}
		}]
	});
};

Ext.extend(PropertyGrid, Ext.grid.PropertyGrid);
/** 初始化组件 */
new PropertyGrid();