/********************************************
 * 玉琴蝶园之ExtJs例子资料
 * 作者：迷蝶
 * 创建时间：2010-05-18
 * 联系方式：
 * 		E-Mail：leader1212@sina.com.cn
 * 		  CSDN：http://hi.csdn.net/leadergg
 * 说明：如需直接使用本站的例子代码，请保留此说明
 * 
 ******************************************/
var CodeWindow = function(config){
    if (!config.url) config.url = "common/blank.js";
    if (!config.title) config.title = "源代码";
    CodeWindow.superclass.constructor.call(this, {
        title: config.title,
        width: 920,
        height: 400,
		modal : true,
        bodyCfg: {
            tag: 'textarea',
            readonly: true
        },
        closeAction: 'close',
        bodyStyle: {
            backgroundColor: 'white',
            margin: '0px',
            border: '0px none'
        },
        listeners: {
            render: function(w){
				var myMask = new Ext.LoadMask(Ext.getBody(), {   
                    msg : "正在请求数据……"  
                });
                // 此处处理方式很不妥。暂时如此
				if(!config.annotate) {
					Ext.Ajax.request({
					    url: "common/annotate.js",
					    success: function(r){
							w.body.dom.value = r.responseText;
							Ext.Ajax.request({
							    url: config.url,
							    success: function(r){
									w.body.dom.value += "\n"+r.responseText;
									myMask.hide();
							    }
							});
					    }
					});
				} else {
					Ext.Ajax.request({
					    url: config.url,
					    success: function(r){
							w.body.dom.value += "\n"+r.responseText;
							myMask.hide();
					    }
					});
				}
            }
        }
    });
}
Ext.extend(CodeWindow, Ext.Window);

/****** 简单Grid，以本地数组数据作为数据源 *******/
var SimpleGridExmple = function() {
	//定义数据
	var data = [
	     ["00001","male","张三","05级三班",'88'],
	     ["00002","male","李四","05级四班",'58'],
	     ["00003","female","王五","06级一班",'78'],
	     ["00004","male","小张","06级三班",'98'],
	     ["00006","male","小李","05级一班",'68']
	];
    SimpleGridExmple.superclass.constructor.call(this, {
		title     : '简单Grid - 数组数据作为数据源',
		autoScroll: true,
		width     : '100%', //grid的宽度，如果用像素值就直接用数字，百分比则用'99%'
		autoHeight: true,
		enableDragDrop   : true, // 激活GridPanel行的拖动
		autoExpandColumn : 'id', //用此列填充宽度
		/** proxy告诉我们从哪里获得数据，reader告诉我们如何解析这个数据。
		 * Ext.data.MemoryProxy将内存中的数据data作为参数传递
		 * Ext.data.ArrayReader专门用来解析数组,并且告诉我们它会按照定义的规范进行解析，
		 * 每行按顺序读取四个数据，第一个叫id，第二个叫sex，第三个叫name，第四个descn。
		 * 这些是跟cm定义中的dataIndex对应的。这样cm就知道哪列应该显示那条数据了。
		 */
	    ds        : new Ext.data.Store({
			// 用于访问数据对象。
			proxy : new Ext.data.MemoryProxy(data),
			/**
			 * 数据列映射关系
			 * name   ：在cm中的名称
			 * mapping：指定数组下标
			 */
			reader: new Ext.data.ArrayReader({}, [
				{name: "id",mapping: 0},
				{name: "sex",mapping: 1},
				{name: "name",mapping: 2},
				{name: "class",mapping: 3},
				{name: "scroll",mapping: 4}
			]),
			autoLoad : true // 自动加载数据
		}),
		/** 
		 * 列定义，即定义表头ColumnModel，可以通过width来设置宽
		 * header   ：表头
		 * dataIndex： 对应数据索引项
		 * sortable ： 是否此列进行排序
		 * width    ：设置此列宽度
		 * fixed    ：此列宽度是否固定
		 * resizable：此列宽度是否可以改变
		 */
	    cm       : new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(), //自动行号
		    {id:"id",header:"学号",width:50,dataIndex:"id",fixed: true,sortable : true},
		    {header:"姓名",dataIndex:"name",sortable : true,resizable:false},
			{header:"成绩",dataIndex:"scroll",sortable : true},
		    {header:"性别",dataIndex:"sex",sortable : true},
		    {header:"班级",dataIndex:"class",sortable : true}
		])
	});
};

Ext.extend(SimpleGridExmple, Ext.grid.GridPanel);