import { db } from "../../db.js";

export const resolvers = {
  Query: {
    products: () => db.products,
    product: (parent: any, args: { productId: string }, context: any) => {
      const result = db.products.find((pd) => pd.id === args.productId);
      return result;
    },
    categories: () => db.categories,
    category: (parent: any, args: { categoryId: string }, context: any) => {
      const result = db.categories.find(
        (category) => category.id === args.categoryId
      );
      return result;
    },
  },
  Product: {
    category: ({ categoryId }, args, context) => {
      //   console.log(parent.categoryId, args, context);
      const result = db.categories.find(
        (category) => category.id === categoryId
      );
      return result;
    },
    reviews: ({ id }, args, context) => {
      const reviews = db.reviews.filter((review) => review.productId === id);
      return reviews;
    },
  },
  Category: {
    products: (parent, args, context) => {
      const result = db.products.filter(
        (product) => parent.id === product.categoryId
      );
      return result;
    },
  },
};
