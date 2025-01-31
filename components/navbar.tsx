"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemsCount } = useCart();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-emerald-600">NiDEES</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tienda" className="text-gray-700 hover:text-emerald-600">
              PRODUCTES
            </Link>
            <Link href="/sobre-nosotros" className="text-gray-700 hover:text-emerald-600">
              Sobre Nosotros
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-emerald-600">
              Contacto
            </Link>
            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemsCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link href="/carrito" className="mr-4">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemsCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-emerald-600"
            >
              Inicio
            </Link>
            <Link
              href="/tienda"
              className="block px-3 py-2 text-gray-700 hover:text-emerald-600"
            >
              Tienda
            </Link>
            <Link
              href="/sobre-nosotros"
              className="block px-3 py-2 text-gray-700 hover:text-emerald-600"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/contacto"
              className="block px-3 py-2 text-gray-700 hover:text-emerald-600"
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}