enum DeliveryMethod {
  self_shipping = 'Tự giao hàng',
  plafrom_shipping = 'Nền tảng giao hàng'
}

export const selectDeliveryMethod = Object.keys(DeliveryMethod).map(key => ({
  value: key,
  label: DeliveryMethod[key as keyof typeof DeliveryMethod],
}));