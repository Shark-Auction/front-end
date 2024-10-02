export interface DeliveryRequestReceiver {
  payment_type_id: number;
  service_type_id: number;
  to_name: string;
  to_phone: string;
  to_address: string;
  to_ward_code: string;
  to_district_id: number;
  productID: number;
}

export interface DeliveryDetailSeller {
  from_name: string;
  from_phone: string;
  from_address: string;
  from_ward_name: string;
  from_district_name: string;
  from_province_name: string;
  productID: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  note: string;
}
