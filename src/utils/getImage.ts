export const getImageProduct = (imageUrl: string) => {
  return `http://api.sharkauction.online/uploads/product/${imageUrl}`
}

export const getImageCategory = (imageUrl: string) => {
  return `http://api.sharkauction.online/uploads/category/${imageUrl}`
}