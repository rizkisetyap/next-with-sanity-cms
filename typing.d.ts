export interface PostI {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image?: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: {
    [key: string]: any;
    _type: string;
  }[];
}
