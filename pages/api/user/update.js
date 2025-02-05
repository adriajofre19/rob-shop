import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req, res) {
    if (req.method !== "PUT") {
        res.setHeader("Allow", ["PUT"]);
        return res.status(405).json({ error: `Mètode ${req.method} no permès` });
    }

    try {

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "No autoritzat" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            return res.status(404).json({ error: "Usuari no trobat" });
        }

        const { name, email, phone } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: "Tots els camps són obligatoris" });
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                name,
                email,
                phone
            },
        });

        res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Error en la actualización:", error);
        return res.status(500).json({ error: "Error actualitzant l'usuari", details: error.message });
    }
}
