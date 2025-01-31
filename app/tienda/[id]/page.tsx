import Image from "next/image";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-emerald-600 mb-6">{product.price}€</p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Añadir al Carrito
              </Button>
            </div>
            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold mb-4">Detalles del producto</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Material: Plástico reciclado</li>
                <li>• Hecho a mano</li>
                <li>• Producto sostenible</li>
                <li>• Diseño único</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}