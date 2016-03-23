/**
 * Ext.ux.IconCombo Extension Class
 * 
 * @class Ext.ux.IconCombo
 * @extends Ext.form.ComboBox
 * @constructor
 * @param {Object} config Configuration options
 */
Ext.ux.IconCombo = function(config) {
	// call parent constructor
	Ext.ux.IconCombo.superclass.constructor.call(this, config);
	this.tpl = config.tpl || '<tpl for="."><div class="x-combo-list-item">'
			+ '<table><tbody><tr>' + '<td>' + '<img style="width:120;height:12;" src="{'
			+ this.iconClsField + '}"/></td>' + '<td>{'
			+ this.displayField + '}</td>' + '</tr></tbody></table>'
			+ '</div></tpl>';
	this.on({
		render : {
			scope : this,
			fn : function() {
				var wrap = this.el.up("div.x-form-field-wrap");
				this.wrap.applyStyles({
					position : "relative"
				});
				this.el.addClass("x-icon-combo-input");
				this.flag = Ext.DomHelper.append(wrap, {
					tag : "div",
					style : "position:absolute"
				});
			}
		}
	});
};
// end of Ext.ux.IconCombo constructor
// extend
Ext.extend(Ext.ux.IconCombo, Ext.form.ComboBox, {
	setIconCls : function() {
		var rec = this.store.query(this.valueField, this.getValue()).itemAt(0);
		if (rec) {
			this.flag.className = "x-icon-combo-icon ";
			this.flag.style.backgroundImage = "url("+rec.get(this.iconClsField)+")";
		}
	},
	setValue : function(value) {
		Ext.ux.IconCombo.superclass.setValue.call(this, value);
		this.setIconCls();
	}
});