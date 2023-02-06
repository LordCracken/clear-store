interface Product {
  id: UniqueID;
  name: string;
  author: string;
  image: ImageURL;
  description: string;
  price: number;
  tags: string[];
}

export default Product;
