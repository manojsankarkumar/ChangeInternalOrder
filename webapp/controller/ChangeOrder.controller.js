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
			// var compcode = this.getView().byId("BUKRS").getValue();
			// var plant = this.getView().byId("WERKS").getValue();
			// var curr = this.getView().byId("WAERS").getValue();
			// if (compcode === "") {
			// 	sap.m.MessageBox.alert("Please select Company Code");
			// 	return true;
			// } else if (plant === "") {
			// 	sap.m.MessageBox.alert("Please select plant");
			// 	return true;
			// } else if (curr === "") {
			// 	sap.m.MessageBox.alert("Please select currency under Control Data");
			// 	return true;
			// }

			// this.getView().getModel().setDeferredGroups(["changeGroup"]);
			// this.changeEntity();

			// this.getView().getModel().submitChanges({
			// 	groupId: "changeGroup",
			// 	success: function(oData, oResponse) {
			// 		var data = oData.__batchResponses[0];
			// 		data = data.__changeResponses[0];
			// 		data = data.data;
			// 		var order = data.Order;
			// 		if (order === "") {
			// 			sap.m.MessageBox.alert(data.Message);
			// 		} else {
			// 			sap.m.MessageBox.alert(order + "Order Changed");
			// 		}
			// 	},
			// 	error: function(oError, oResponse) {

			// 		sap.m.MessageBox.alert("Failure");
			// 	}
			// });

		},

		onAfterRendering: function(oEvent) {
			// var oModel = this.getView().getModel();
			// oModel.attachMetadataLoaded(this.changeEntity.bind(this));
		},
		
		changeEntity: function(oEvent) {

			// var oContext = this.getView().getModel().createEntry("/InternalOrderSet", {
			// 	"groupId": "changeGroup",
			// 	properties: {
			// 		"OrderType": this.getView().byId("AUART"),
			// 		"Description": this.getView().byId("AUFTEXT"),
			// 		"CompanyCode": this.getView().byId("BUKRS"),
			// 		"BusinessArea": this.getView().byId("GSBER"),
			// 		"Plant": this.getView().byId("WERKS"),
			// 		"ProfitCenter": this.getView().byId("PRCTR"),
			// 		"ResponsibleCCTR": this.getView().byId("KOSTL"),
			// 		"UserResponsible": this.getView().byId("BNAME"),
			// 		"WBSElement": this.getView().byId("PSPNR"),
			// 		"RequestCCTR": this.getView().byId("REQUESTCCTR"),
			// 		"RequestCode": this.getView().byId("REQCOD"),
			// 		"RequestOrder": this.getView().byId("AUFNR"),
			// 		// "SystemStatus": this.getView().byId(),
			// 		// "UserStatus": this.getView().byId(),
			// 		//   "StatusNumber": this.getView().byId(),
			// 		"Currency": this.getView().byId("WAERS"),
			// 		//     "OrderCategory": this.getView().byId(),
			// 		"ActPosCCTR": this.getView().byId("ACTPOSCCTR"),
			// 		//    "StatisOrder": this.getView().byId(),
			// 		//    "PlanIntegOrder": this.getView().byId(),
			// 		"ResultAnalysisKey": this.getView().byId("ABGSL"),
			// 		"CostingSheet": this.getView().byId("KALSM"),
			// 		"OverheadKey": this.getView().byId("ZSCHL"),
			// 		"InterestProfile": this.getView().byId("ZSCHM"),
			// 		"SettleCostElem": this.getView().byId("KSTAR"),
			// 		"CostCenter": this.getView().byId("COSTCENTER"),
			// 		"GLAccount": this.getView().byId("SAKNR"),
			// 		// "Applicant": this.getView().byId(),
			// 		// "Telephone1": this.getView().byId(),
			// 		// "PersonResponsible": this.getView().byId(),
			// 		// "Telephone2": this.getView().byId(),
			// 		// "EstimatedCost": this.getView().byId(),
			// 		"ProcessGroup": this.getView().byId("ABKRS"),
			// 		// "ApplicationDate": this.getView().byId(),
			// 		// "Department": this.getView().byId(),
			// 		// "WorkStart": this.getView().byId(),
			// 		// "EndWork": this.getView().byId(),
			// 		"InvestProfile": this.getView().byId("IVPRO"),
			// 		"Scale": this.getView().byId("SIZECL"),
			// 		"InvestReason": this.getView().byId("IZWEK"),
			// 		"EnvirInvestment": this.getView().byId("UMWKZ"),
			// 		"InvestProgram": this.getView().byId("PRNAM"),
			// 		// "PositionID": this.getView().byId(),
			// 		"AssetClass": this.getView().byId("ANLKL")
			// 			// "CapitalDate": this.getView().byId(),

			// 	}
			// });
			// this.getView().getModel().setRefreshAfterChange(false);
			// this.getView().setBindingContext(oContext);
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

		onMasterData: function(evt){
			var orderNumber = this.getView().byId("ORDER");
			orderNumber = orderNumber.getValue();
			this.toggleIconTabVisibility(orderNumber);
//Below logic is the path to GET the details of particular set of data for particular order number
			this.getView().bindElement({path:"/InternalOrderSet('" +  orderNumber + "')"  });
		}

	});

});