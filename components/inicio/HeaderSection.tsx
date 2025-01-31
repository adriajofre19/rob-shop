"use client";

import Image from "next/image";
import { ShoppingBag, Package } from "lucide-react";

export default function HeaderSection() {
  return (
    <section className="relative h-[70vh]">
      {/* Background Image */}
      <Image
        src="https://img.freepik.com/fotos-premium/bolsas-plastico-colores-usados-transparentes_67651-2178.jpg"
        alt="NiDEES - Artesanía Sostenible"
        fill
        className="object-cover"
        priority
      />
      
      {/* Text Content */}
      <div className="absolute top-12 left-12 max-w-lg z-10">
        <h1 className="text-4xl font-light mb-4 text-black">NiDEES</h1>
        <h2 className="text-xl mb-4 text-black">Artesania creada amb bosses de plàstic reciclades ♻️</h2>
        <div className="space-y-2">
          <p className="text-black/80 leading-relaxed">
            Som emprenedors amb l&apos;objectiu de reduir el nostre impacte mediambiental.
          </p>
          <p className="text-black/80 leading-relaxed">
            Reutilitzem artesanalment les bosses de plàstic per convertir-les en dissenys únics i allargar la seva vida.
          </p>
          <p className="text-black/80 leading-relaxed">
            Per un món millor!
          </p>
        </div>
      </div>

      {/* Bag Transformation Illustration */}
      <div className="absolute bottom-8 right-12 flex items-center space-x-4 text-black">
        <Package className="h-12 w-12" />
        <span className="text-3xl font-light">+</span>
        <Package className="h-12 w-12" />
        <span className="text-3xl font-light">=</span>
        <div className="relative">
          <ShoppingBag className="h-14 w-14" />
        </div>
      </div>
    </section>
  );
}