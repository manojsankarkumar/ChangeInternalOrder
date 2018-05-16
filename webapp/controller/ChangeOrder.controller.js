sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"ChangeInternalOrder/model/formatter"
], function(Controller, MessageBox, formatter) {
	"use strict";

	return Controller.extend("ChangeInternalOrder.controller.ChangeOrder", {
		formatter: formatter,
		onInit: function(oEvent) {
			this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");

			var oIconTab = this.getView().byId("idIconTabBarNoIcons");
			oIconTab.setVisible(false);
		},

		handleSave: function(oEvent) {
		},

		handleCancel: function(oEvent) {

		},

		ValueHelp: function(oEvent) {
			this.inputId = oEvent.getSource().getId();
			var output = this.inputId.split("--");
			var fieldname = output[1];
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"ChangeInternalOrder.fragments.ValueHelp",
					this.getView().getController()
				);
				this.getView().addDependent(this._valueHelpDialog);
			}
			var fil = new sap.ui.model.Filter("FieldID", sap.ui.model.FilterOperator.EQ, fieldname);
			this._valueHelpDialog.getBinding("items").filter([fil]);

			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			this._valueHelpDialog.setTitle(formatter.getValueHelpTitle(resourceBundle, fieldname));
			this._valueHelpDialog.open();
		},

		//Close the project dialog box
		_handleValueHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.getView().byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
			}
			var output = this.inputId.split("--");
			var fieldname = output[2];
			if (fieldname === 'ORDER') {
				this.toggleIconTabVisibility(oSelectedItem.getTitle());
			}
			//	evt.sap.ui.getCore().byId("items");
		},

		toggleIconTabVisibility: function(value) {
			var a = value.length;
			var oIconTab = this.getView().byId("idIconTabBarNoIcons");
			if (a > 0) {
				oIconTab.setVisible(true);
			} else {
				oIconTab.setVisible(false);
			}
		},

	//	orderTypeUpdate: function(evt) {
			// var a = evt.getParameters();
			// a = a.value;
			// this.toggleIconTabVisibility(a);
//		},
		
		onMasterData: function(evt){
			var a = this.getView().byId("ORDER");
			a = a.getValue();
			this.toggleIconTabVisibility(a);
			
			this.getView().setBindingContext({Path:"/InternalOrderSet" });
		}

	});

});