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
			var compcode = this.getView().byId("BUKRS").getValue();
			var plant = this.getView().byId("WERKS").getValue();
			var curr = this.getView().byId("WAERS").getValue();
			if (compcode === "") {
				MessageBox.warning("Please select Company Code");
				return true;
			} else if (plant === "") {
				MessageBox.warning("Please select plant");
				return true;
			} else if (curr === "") {
				MessageBox.warning("Please select currency under Control Data");
				return true;
			}

			this.getView().getModel().setDeferredGroups(["changeGroup"]);
			this.changeEntity();

			// this.getView().getModel().submitChanges({
			// 	groupId: "changeGroup",
			// 	success: function(oData, oResponse) {
			// 			sap.m.MessageBox.alert("Order Updated");
			// 	},
			// 	error: function(oError, oResponse) {

			// 		sap.m.MessageBox.alert("Failure");
			// 	}
			// });

		},

		onAfterRendering: function(oEvent) {
			var oModel = this.getView().getModel();
			oModel.attachMetadataLoaded(this.changeEntity.bind(this));
		},

		changeEntity: function(oEvent) {
			if (this.getView().byId("ORDER").getValue() === "") {
				return;
			}
			var oModelData = {};
			//oModelData.OrderType = this.getView().byId("AUART").getValue();
			oModelData.Order = this.getView().byId("ORDER").getValue();
			//oModelData.Description = this.getView().byId("AUFTEXT").getValue();
			oModelData.CompanyCode = this.getView().byId("BUKRS").getValue();
			oModelData.BusinessArea = this.getView().byId("GSBER").getValue();
			oModelData.Plant = this.getView().byId("WERKS").getValue();
			oModelData.ProfitCenter = this.getView().byId("PRCTR").getValue();
			oModelData.ResponsibleCCTR = this.getView().byId("KOSTL").getValue();
			oModelData.UserResponsible = this.getView().byId("BNAME").getValue();
			oModelData.WBSElement = this.getView().byId("PSPNR").getValue();
			oModelData.RequestCCTR = this.getView().byId("REQUESTCCTR").getValue();
			oModelData.RequestCode = this.getView().byId("REQCOD").getValue();
			oModelData.RequestOrder = this.getView().byId("AUFNR").getValue();
			// oModelData.SystemStatus = this.getView().byId().getValue();
			// oModelData.UserStatus = this.getView().byId().getValue();
			// oModelData.StatusNumber = this.getView().byId().getValue();
			oModelData.Currency = this.getView().byId("WAERS").getValue();
			// oModelData.OrderCategory = this.getView().byId().getValue();
			oModelData.ActPosCCTR = this.getView().byId("ACTPOSCCTR").getValue();
			// oModelData.StatisOrder = this.getView().byId().getValue();
			// oModelData.PlanIntegOrder = this.getView().byId().getValue();
			oModelData.ResultAnalysisKey = this.getView().byId("ABGSL").getValue();
			oModelData.CostingSheet = this.getView().byId("KALSM").getValue();
			oModelData.OverheadKey = this.getView().byId("ZSCHL").getValue();
			oModelData.InterestProfile = this.getView().byId("ZSCHM").getValue();
			oModelData.SettleCostElem = this.getView().byId("KSTAR").getValue();
			oModelData.CostCenter = this.getView().byId("COSTCENTER").getValue();
			oModelData.GLAccount = this.getView().byId("SAKNR").getValue();
			// oModelData.Applicant = this.getView().byId().getValue();
			// oModelData.Telephone1 = this.getView().byId().getValue();
			// oModelData.PersonResponsible = this.getView().byId().getValue();
			// oModelData.Telephone2 = this.getView().byId().getValue();
			// oModelData.EstimatedCost = this.getView().byId().getValue();
			oModelData.ProcessGroup = this.getView().byId("ABKRS").getValue();
			// oModelData.ApplicationDate = this.getView().byId().getValue();
			// oModelData.Department = this.getView().byId().getValue();
			// oModelData.WorkStart = this.getView().byId().getValue();
			// oModelData.EndWork = this.getView().byId().getValue();
			oModelData.InvestProfile = this.getView().byId("IVPRO").getValue();
			oModelData.Scale = this.getView().byId("SIZECL").getValue();
			oModelData.InvestReason = this.getView().byId("IZWEK").getValue();
			oModelData.EnvirInvestment = this.getView().byId("UMWKZ").getValue();
			oModelData.InvestProgram = this.getView().byId("PRNAM").getValue();
			// oModelData.PositionID = this.getView().byId().getValue();
			oModelData.AssetClass = this.getView().byId("ANLKL").getValue();
			// oModelData.CapitalDate = this.getView().byId().getValue();

			this.getView().getModel().setRefreshAfterChange(false);

			var oModel = this.getView().getModel();
			oModel.update("/InternalOrderSet('" + oModelData.Order + "')", oModelData, {
				method: "PUT",
				success: function(oData, oResponse) { /*Changed oData to oModelData*/
					sap.m.MessageBox.alert("Order Updated");
				},
				error: function(oError, oResponse) {
					sap.m.MessageBox.alert("Failure");
				}
			});

		},

		handleCancel: function(oEvent) {
             var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.confirm(
				"Are you sure you don't want to change?", {
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {
                      if(sap.m.MessageBox.Action.YES === oAction){
                      		window.history.go(-1);
                      }
					}
				});
			return true;
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
				var view = this.getView();
				view.addDependent(this._valueHelpDialog);
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

		onMasterData: function(evt) {
			var orderNumber = this.getView().byId("ORDER");
			orderNumber = orderNumber.getValue();
			this.toggleIconTabVisibility(orderNumber);
			//Below logic is the path to GET the details of particular set of data for particular order number
			this.getView().bindElement({
				path: "/InternalOrderSet('" + orderNumber + "')"
			});
		}

	});

});