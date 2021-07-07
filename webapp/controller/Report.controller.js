sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("com.smr.ApprovalStatusReport.controller.Report", {
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel({
				busy: true
			}), "viewModel");
			this.getOwnerComponent().getModel().read("/GET_Detail_DataSet", {
				success: function (oData) {
					this.getView().getModel("viewModel").setProperty("/busy", false);
					this.getView().getModel("viewModel").setProperty("/results", oData.results);
				}.bind(this),
				error: function (oData) {
					this.getView().getModel().setProperty("/busy", false);
				}.bind(this)
			});

		},
		onSearch: function (oEvent) {
			debugger;
			var ar = [];
			for (var i = 0; i < oEvent.getParameter("selectionSet").length; i++) {
				if (oEvent.getParameter("selectionSet")[i].getMetadata()._sClassName == "sap.m.ComboBox") {
					if (oEvent.getParameter("selectionSet")[i].getRequired()) {
						if (oEvent.getParameter("selectionSet")[i].getValue() == "") {
							return sap.m.MessageToast.show(oEvent.getParameter("selectionSet")[i].getName() + " is required...");
						} else {
							ar.push(new sap.ui.model.Filter({
								path: oEvent.getParameter("selectionSet")[i].getName(),
								operator: sap.ui.model.FilterOperator.EQ,
								value1: oEvent.getParameter("selectionSet")[i].getValue()
							}));
						}
					} else {
						if (oEvent.getParameter("selectionSet")[i].getValue() != "") {
							ar.push(new sap.ui.model.Filter({
								path: oEvent.getParameter("selectionSet")[i].getName(),
								operator: sap.ui.model.FilterOperator.EQ,
								value1: oEvent.getParameter("selectionSet")[i].getValue()
							}));
						}
					}
				}
				// if (oEvent.getParameter("selectionSet")[i].getMetadata()._sClassName == "sap.m.CheckBox") {
				// 	if (oEvent.getParameter("selectionSet")[i].getValue()) {
				// 		ar.push("Yes");
				// 	} else {
				// 		ar.push("No");
				// 	}
				// }
			}
			this.byId("table").getBinding("items").filter([new sap.ui.model.Filter(ar, true)], "Application");
		}
	});
});