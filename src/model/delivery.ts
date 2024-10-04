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

interface Receiver {
  id: number;
  full_name: string;
  user_name: string;
  phone_number: string;
  email: string;
  address: string;
  imageUrl: string | null;
  date_of_birth: string; // Consider using Date type for better type safety
  role_id: {
    id: number;
    name: string;
  };
  email_verified: boolean;
  is_active: boolean;
}

export interface Delivery {
  id: number;
  orderCode: string | null;
  receiver: Receiver;
  paymentTypeId: number;
  serviceTypeId: number;
  fromName: string | null;
  fromPhone: string | null;
  fromAddress: string | null;
  fromWardName: string | null;
  fromDistrictName: string | null;
  fromProvinceName: string | null;
  productId: number;
  sender: string | null;
  toName: string;
  toPhone: string;
  toAddress: string;
  toWardCode: string;
  toDistrictId: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  note: string | null;
  requiredNote: string;
  returnPhone: string | null;
  returnAddress: string | null;
  status: DeliveryStatusGHN;
  deliveryStatus: string | null;
}

export type DeliveryStatusGHN =
  | "RECEIVER_INFORMATION"
  | "SENDER_INFORMATION"
  | "WAITING_RECEIVING"
  | "READY_TO_PICK"
  | "PICKING"
  | "CANCEL"
  | "MONEY_COLLECT_PICKING"
  | "PICKED"
  | "STORING"
  | "TRANSPORTING"
  | "SORTING"
  | "DELIVERING"
  | "MONEY_COLLECT_DELIVERING"
  | "DELIVERED"
  | "DELIVERY_FAIL"
  | "WAITING_TO_RETURN"
  | "RETURN"
  | "RETURN_TRANSPORTING"
  | "RETURN_SORTING"
  | "RETURNING"
  | "RETURN_FAIL"
  | "RETURNED"
  | "EXCEPTION"
  | "DAMAGE"
  | "LOST";
