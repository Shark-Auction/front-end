export const getImageProduct = (imageUrl: string) => {
  return `http://api.sharkauction.online/uploads/product/${imageUrl}`;
};

export const getImageCategory = (imageUrl: string) => {
  return `http://api.sharkauction.online/uploads/category/${imageUrl}`;
};

export const getImageBlog = (imageUrl: string) => {
  return `http://api.sharkauction.online/uploads/blogs/${imageUrl}`;
};

export const getImageFE = (imageUrl: string) => {
  return `http://api.sharkauction.online/imagefe/${imageUrl}`;
};
