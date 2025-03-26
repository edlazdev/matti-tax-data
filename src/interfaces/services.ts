/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ServicesAppType {
  createTaxData: (data: any) => Promise<any>;
  deleteTaxDataByRfc: (rfc: string) => Promise<any>;
  updateTaxDataByRfc: (rfc: string, payload: any) => Promise<any>;
  getTaxDataByUser: (id: string) => Promise<any>;
  defaultTaxDataByRfc: (rfc: string) => Promise<any>;
  downloadCfdi: (rfc: string) => Promise<void>;
  getBusinessByCampusId: (id: string) => Promise<any>;
  uploadTaxData: (data: any) => Promise<any>;
  getTaxDataParentsByStudentId: (id: string) => Promise<any>;
  getCFDI: () => Promise<any>;
  getTaxRegime: () => Promise<any>;
  getCfdiTaxData: (data: any) => Promise<any>;
  uploadCerts: (
    cer: File,
    key: File,
    pass: string,
    campus_id: string
  ) => Promise<any>;
}

