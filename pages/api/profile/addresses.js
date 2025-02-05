import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: `Mètode ${req.method} no permès` });
    }

    try {
        const { userauth } = req.body;

        if (!userauth?.id) {
            return res.status(400).json({ error: "ID d'usuari requerit" });
        }

        // Buscar todas las adrecas del usuario
        const addresses = await prisma.adresses.findMany({
            where: { id: userauth.id },

        })

        if (!user) {
            return res.status(404).json({ error: "Usuari no trobat" });
        }

        return res.status(200).json(addresses);
    } catch (error) {
        console.error("Error obtenint la informació de l'usuari:", error);
        return res.status(500).json({ error: "Error obtenint la informació de l'usuari" });
    }
}
