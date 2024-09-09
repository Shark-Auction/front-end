enum ProductCondition {
  NOTUSE = "Chưa qua sử dụng",
  HIGHNEW = "Mới, chưa mở hàng",
  AVERAGENEW = "Mới, đã mở hàng",
  LOWNEW = "Mới, đã sử dụng",
  OLD = "Cũ",
}
export const selectItems = Object.keys(ProductCondition).map(key => ({
  value: key,
  label: ProductCondition[key as keyof typeof ProductCondition], // Get the value of the enum
}));