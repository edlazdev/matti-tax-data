/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IconButtonProps {
  iconClass: string;
  onClick: () => void;
}

export interface User {
  id: string;
  username: string;
  country: string;
  groups: any[];
  roles: any[];
  exp: number;
  sub: string;
}

export interface TaxData {
  id: string;
  user_id: string;
  name: string;
  rfc: string;
  email: string;
  tax_regime: string;
  cfdi_id: string;
  cfdi_description: null;
  zip_code: string;
  street: null;
  suburb: null;
  municipality: null;
  state: null;
  verified: boolean;
  selected: boolean;
  status: string;
  document_type: null;
  city: null;
  department_code: null;
  municipality_code: null;
}

export interface TaxDataUploadCert {
  business_name: string;
  rfc: string;
  status: string;
  tax_regime: string;
  tax_regime_description: string;
  zip_code: string;
}

export interface Cfdi {
  id: string;
  cfdi_id: string;
  description: string;
  person_type_natural: string;
  person_type_moral: string;
  cfdi_date: Date;
  due_date: Date;
  receiver_tax_regime: string;
  selected: boolean;
}

export interface Regime {
  id: string;
  tax_regime_id: string;
  description: string;
  person_type_natural: string;
  person_type_moral: string;
  tax_regime_date: Date;
  due_date: Date;
  selected: boolean;
}
