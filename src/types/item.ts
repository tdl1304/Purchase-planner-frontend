export type Item = {
  _id?: string;
  title: string;
  store: string;
  person: string;
  price: string;
  imageURL?: string;
  createdAt?: Date;
  published?: boolean;
  purchased?: boolean;
};
