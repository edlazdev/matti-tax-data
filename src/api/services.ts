/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "./httpClient";
import services from "./methods";

import { ServicesAppType } from "@/interfaces";

const ServiceApp: ServicesAppType = {
  getCfdiTaxData: (data) => {
    return http.post(
      services.getCfdiTaxData,
      {
        cif_pdf: data,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  createTaxData: (data) => {
    return http.post(services.createTaxData, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deleteTaxDataByRfc: (rfc: string) => {
    return http.delete(`${services.deleteTaxDataByRfc}${rfc}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  updateTaxDataByRfc: (rfc: string, payload) => {
    return http.patch(`${services.updateTaxDataByRfc}${rfc}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getTaxDataByUser: (id: string) => {
    return http.get(`${services.getTaxDataByUser}${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  defaultTaxDataByRfc: (rfc: string) => {
    return http.post(`${services.defaultTaxDataByRfc}${rfc}`, null, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  downloadCfdi: async (rfc: string) => {
    return await http
      .get(`${services.downloadCfdi}${rfc}`, {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      })
      .then(async (response) => {
        console.log("🚀 ~ .then ~ response:", response);
        // await ServiceApp.DownloadFile(response, rfc, "pdf");
      });
  },
  getBusinessByCampusId: (id: string) => {
    return http.get(`${services.getBusinessByCampusId}${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  uploadTaxData: (data: any) => {
    return http.post(
      services.uploadTaxData,
      {
        cif_pdf: data,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  getTaxDataParentsByStudentId: (id: string) => {
    return http.get(`${services.getTaxDataParentsByStudentId}${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getCFDI: () => {
    return http.get(`${services.getCFDI}?limit=${100}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getTaxRegime: () => {
    return http.get(`${services.getTaxRegime}?limit=${100}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  uploadCerts: (cer, key, pass, campus_id: string) => {
    return http.post(
      `${services.uploadCerts}?campus_id=${campus_id}&password=${pass}`,
      {
        cert_file: cer,
        key_file: key,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};

export default ServiceApp;
