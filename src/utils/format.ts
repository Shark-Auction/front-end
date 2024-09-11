// utils/format.ts

import dayjs from "dayjs";

export const formatVND = (value: number | null): string => {
  if (value === null) return '';
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const parseVND = (value: string | null): number | null => {
  if (!value) return null;
  return parseFloat(value.replace(/[^\d]/g, ''));
};

export const formatDateHour = (data: any) => {
  return dayjs(data).format("DD-MM-YYYY HH:mm")
}