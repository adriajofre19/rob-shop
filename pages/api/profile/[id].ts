import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // Assegura't de tenir configurada la instància de Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "ID d'usuari invàlid" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, name: true, email: true, phone: true },
        });

        if (!user) {
            return res.status(404).json({ error: "Usuari no trobat" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error carregant usuari:", error);
        return res.status(500).json({ error: "Error del servidor" });
    }
}
