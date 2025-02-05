"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemsCount } = useCart();
  const { user, logout } = useAuth();
  const [authuser, setAuthUser] = useState(null);

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);


  const getUser = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userauth: { id: user.id } }),
      });

      const data = await response.json();
      setAuthUser(data);
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };



  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img src="/logo.png" alt="NiDEES" className="h-8" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tienda" className="text-gray-700 hover:text-emerald-600">
              PRODUCTES
            </Link>
            <Link href="/sobre-nosotros" className="text-gray-700 hover:text-emerald-600">
              NOSALTRES
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-emerald-600">
              CONTACTE
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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-gray-700 items-center">
                    <Link href="/perfil">El meu perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Tancar sessió
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700">
                  Iniciar sessió
                </Button>
              </Link>
            )}
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
            {user ? (
              <>
                <div className="px-3 py-2 text-gray-700">
                  {user.name}
                </div>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700"
                >
                  Tancar sessió
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 text-emerald-600 hover:text-emerald-700"
              >
                Iniciar sessió
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}