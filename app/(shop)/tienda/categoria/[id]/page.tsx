"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import productsData from "@/data/products.json";
import { notFound } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = productsData.categories.find((c) => c.id === params.id);
  const { addItem } = useCart();

  if (!category) {
    notFound();
  }

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <Link
          href="/tienda"
          className="text-sm text-gray-600 hover:text-emerald-600 mb-4 inline-block"
        >
          ← Volver a colecciones
        </Link>
        <h1 className="text-4xl font-light mb-4">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.products.map((product) => (
          <div key={product.id} className="flex flex-col">
            <Link
              href={`/tienda/producto/${category.id}/${product.id}`}
              className="group flex-1"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-emerald-600">{product.price}€</span>
                    <span className="text-sm text-emerald-600 group-hover:underline">
                      Ver Detalles →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Button
              onClick={(e) => handleAddToCart(product, e)}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Añadir al Carrito
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}