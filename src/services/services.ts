/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "../config/axios";
import services from "./methods";

interface ServiceAppType {
  createTaxData: (data: any) => Promise<any>;
  deleteTaxDataByRfc: (rfc: string) => Promise<any>;
  updateTaxDataByRfc: (rfc: string, payload: any) => Promise<any>;
  getTaxDataByUser: (id: string) => Promise<any>;
  defaultTaxDataByRfc: (rfc: string) => Promise<any>;
  downloadCfdi: (rfc: string) => Promise<void>;
  getBusinessByCampusId: (id: string) => Promise<any>;
  uploadTaxData: (data: any) => Promise<any>;
  getTaxDataParentsByStudentId: (id: string) => Promise<any>;
  getListOfCFDI: () => Promise<any>;
  getListOfTaxRegimen: () => Promise<any>;
  uploadCerts: (
    cer: File,
    key: File,
    pass: string,
    campus_id: string
  ) => Promise<any>;
}

const ServiceApp: ServiceAppType = {
  createTaxData: (data) => {
    const token = localStorage.getItem("token");
    return http.post(services.createTaxData, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  deleteTaxDataByRfc: (rfc) => {
    const token = localStorage.getItem("token");
    return http.delete(`${services.deleteTaxDataByRfc}${rfc}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  updateTaxDataByRfc: (rfc, payload) => {
    const token = localStorage.getItem("token");
    return http.patch(`${services.updateTaxDataByRfc}${rfc}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getTaxDataByUser: (id) => {
    const token = localStorage.getItem("token");
    return http.get(`${services.getTaxDataByUser}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  defaultTaxDataByRfc: (rfc) => {
    const token = localStorage.getItem("token");
    return http.post(`${services.defaultTaxDataByRfc}${rfc}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  downloadCfdi: async (rfc) => {
    const token = localStorage.getItem("token");
    return await http
      .get(`${services.downloadCfdi}${rfc}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      })
      .then(async (response) => {
        console.log("🚀 ~ .then ~ response:", response)
        // await ServiceApp.DownloadFile(response, rfc, "pdf");
      });
  },
  getBusinessByCampusId: (id) => {
    const token = localStorage.getItem("token");
    return http.get(`${services.getBusinessByCampusId}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  uploadTaxData: (data) => {
    const token = localStorage.getItem("token");
    return http.post(
      services.uploadTaxData,
      {
        cif_pdf: data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  getTaxDataParentsByStudentId: (id) => {
    const token = localStorage.getItem("token");
    return http.get(`${services.getTaxDataParentsByStudentId}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getListOfCFDI: () => {
    const token = localStorage.getItem("token");
    return http.get(`${services.getListOfCFDI}?limit=${100}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getListOfTaxRegimen: () => {
    const token = localStorage.getItem("token");
    return http.get(`${services.getListOfTaxRegimen}?limit=${100}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  uploadCerts: (cer, key, pass, campus_id) => {
    const token = localStorage.getItem("token");
    return http.post(
      `${services.uploadCerts}?campus_id=${campus_id}&password=${pass}`,
      {
        cert_file: cer,
        key_file: key,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};

export default ServiceApp;
