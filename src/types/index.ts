export interface Category {
    id: string;
    name: string;
  }
  
  export interface Listing {
    id: string;
    title: string;
    description: string;
    price: number;
    categoryId: string;
    imageUrl: string;
  }