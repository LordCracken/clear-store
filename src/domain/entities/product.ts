export class Product {
  readonly id: UniqueID;
  readonly name: string;
  readonly author: string;
  readonly image: ImageURL;
  readonly price: number;

  constructor(id: UniqueID, name: string, author: string, image: ImageURL, price: number) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.image = image;
    this.price = price;
  }
}
