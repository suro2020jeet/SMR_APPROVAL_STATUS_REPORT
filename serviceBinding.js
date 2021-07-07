function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZPR_APPROVAL_STATUS_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}