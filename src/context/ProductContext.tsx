"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: string;
  images: string[];
  category: "saree" | "dress";
  description: string;
}

export interface ContactInfo {
  whatsapp: string;
  phone: string;
}

interface ProductContextType {
  products: Product[];
  contactInfo: ContactInfo;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateContactInfo: (info: ContactInfo) => void;
}

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Royal Kanchipuram Silk",
    price: "₹25,000",
    images: ["/images/saree1.png", "/images/saree2.png", "/images/saree1.png"],
    category: "saree",
    description: "Elegant pink and gold Kanchipuram silk saree suitable for weddings.",
  },
  {
    id: "2",
    name: "Emerald Banarasi",
    price: "₹18,500",
    images: ["/images/saree2.png", "/images/saree1.png", "/images/saree2.png"],
    category: "saree",
    description: "Vibrant emerald green Banarasi silk with silver zari work.",
  },
  {
    id: "3",
    name: "Contemporary Silk Fusion",
    price: "₹12,000",
    images: ["/images/dress1.png", "/images/saree1.png"],
    category: "dress",
    description: "Modern fusion dress crafted from premium silk.",
  },
  {
    id: "4",
    name: "Midnight Blue Mysore Silk",
    price: "₹15,000",
    images: ["/images/saree1.png", "/images/saree2.png"],
    category: "saree",
    description: "Deep midnight blue Mysore silk with gold borders.",
  },
];

const defaultContactInfo: ContactInfo = {
  whatsapp: "919876543210",
  phone: "+919876543210",
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);

  useEffect(() => {
    // Load from local storage or use default
    const storedProducts = localStorage.getItem("brindhalaya_products");
    if (storedProducts) {
      try {
        const parsed = JSON.parse(storedProducts);
        // Migration: Convert single image to images array if needed
        const migrated = parsed.map((p: any) => {
          let product = p;
          // Migration: Convert single image to images array if needed
          if (product.image && !product.images) {
            product = { ...product, images: [product.image], image: undefined };
          }

          // Sync images for default products to ensure they get the new gallery
          const defaultProduct = defaultProducts.find(dp => dp.id === product.id);
          if (defaultProduct) {
            return { ...product, images: defaultProduct.images };
          }

          return product;
        });
        setProducts(migrated);
      } catch (e) {
        console.error("Failed to parse products", e);
        setProducts(defaultProducts);
      }
    } else {
      setProducts(defaultProducts);
    }

    const storedContact = localStorage.getItem("brindhalaya_contact");
    if (storedContact) {
      setContactInfo(JSON.parse(storedContact));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("brindhalaya_products", JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem("brindhalaya_contact", JSON.stringify(contactInfo));
  }, [contactInfo]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
  };

  return (
    <ProductContext.Provider value={{ products, contactInfo, addProduct, updateProduct, deleteProduct, updateContactInfo }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
