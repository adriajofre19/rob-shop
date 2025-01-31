export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Bolso Ecológico",
    description: "Bolso artesanal hecho con bolsas recicladas tejidas a mano. Cada pieza es única y está creada con cuidado y atención al detalle. Perfecto para uso diario mientras contribuyes al medio ambiente.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c",
    category: "Bolsos"
  },
  {
    id: 2,
    name: "Estuche Multiusos",
    description: "Estuche versátil creado a partir de plástico reciclado. Ideal para guardar artículos de papelería, cosméticos o accesorios. Su diseño resistente y práctico lo hace perfecto para el uso diario.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
    category: "Accesorios"
  },
  {
    id: 3,
    name: "Cesta Decorativa",
    description: "Cesta tejida con bolsas de plástico recicladas. Una pieza decorativa única que combina funcionalidad y sostenibilidad. Perfecta para organizar cualquier espacio de tu hogar.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2",
    category: "Hogar"
  },
  {
    id: 4,
    name: "Monedero Reciclado",
    description: "Monedero compacto y elegante elaborado con plástico reciclado. Diseño práctico con varios compartimentos para organizar tus tarjetas y efectivo.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    category: "Accesorios"
  },
  {
    id: 5,
    name: "Bolso de Playa",
    description: "Amplio bolso de playa tejido con bolsas recicladas. Resistente al agua y perfecto para días de playa o piscina. Incluye bolsillo interior.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16",
    category: "Bolsos"
  },
  {
    id: 6,
    name: "Organizador de Escritorio",
    description: "Organizador modular para escritorio hecho con plástico reciclado. Perfecto para mantener tu espacio de trabajo ordenado y contribuir al medio ambiente.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8",
    category: "Hogar"
  }
];