const apiUrl = import.meta.env.VITE_REACT_API_ENDPOINT;

const services = {
  //TAX-DATA
  createTaxData: apiUrl + "/tax_data/api/v100/user_tax_data", //POST
  deleteTaxDataByRfc: apiUrl + "/tax_data/api/v100/user_tax_data/", //DELETE rfc
  updateTaxDataByRfc: apiUrl + "/tax_data/api/v100/user_tax_data/", //PATCH rfc
  getTaxDataByUser: apiUrl + "/tax_data/api/v100/user_tax_data/by_user_id/", //GET userId
  defaultTaxDataByRfc: apiUrl + "/tax_data/api/v100/user_tax_data/selected/", //POST rfc
  downloadCfdi: apiUrl + "/tax_data/api/v100/cfdi/download/", //GET rfc
  getCfdiTaxData: apiUrl + `/tax_data/api/v100/get_cfdi_data/cif_pdf`,

  // CAMPUS TAX DATA
  getBusinessByCampusId: apiUrl + `/tax_data/api/v100/business/campus/`, //GET

  // STUDENTS TAX DATA
  getTaxDataParentsByStudentId:
    apiUrl + `/tax_data/api/v100/user_tax_data/student/`, //GET id

  //UTILS
  getCFDI: apiUrl + "/tax_data/api/v100/cfdi", //GET
  getTaxRegime: apiUrl + "/tax_data/api/v100/tax_regime", //GET
  uploadTaxData: apiUrl + `/tax_data/api/v100/get_cfdi_data/cif_pdf`, //POST

  //DOCUMENTS TAX DATA
  uploadCerts: apiUrl + `/tax_data/api/v100/business/upload_certs/`, //POST
};

export default services;
