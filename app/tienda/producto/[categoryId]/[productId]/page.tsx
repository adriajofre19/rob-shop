import { Suspense } from "react";
import productsData from "@/data/products.json";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";

export function generateStaticParams() {
  return productsData.categories.flatMap((category) =>
    category.products.map((product) => ({
      categoryId: category.id,
      productId: product.id,
    }))
  );
}

export default function ProductPage({ 
  params 
}: { 
  params: { categoryId: string; productId: string } 
}) {
  const category = productsData.categories.find((c) => c.id === params.categoryId);
  const product = category?.products.find((p) => p.id === params.productId);

  if (!category || !product) {
    notFound();
  }

  // Combine main image with additional images
  const allImages = [product.image, ...product.additionalImages || []];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Suspense fallback={<div>Loading gallery...</div>}>
          <ProductGallery images={allImages} productName={product.name} />
        </Suspense>
        <ProductInfo product={product} category={category} />
      </div>
    </div>
  );
}