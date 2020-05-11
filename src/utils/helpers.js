import url from "./URL";

export function flattenProducts(data) {
  return data.map((item) => {
    //cloudinary
    //let image = item.image.url;
    //no delpoyment
    let image = `${url}${item.image.url}`;
    return { ...item, image };
  });
}

// helper functions
export function featuredProducts(data) {
  return data.filter((item) => {
    return item.featured === true;
  });
}
