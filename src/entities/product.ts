interface Product {
  id: UniqueID;
  name: string;
  image: ImageURL;
  description: string;
  price: number;
  tags: string[];
}

export default Product;
