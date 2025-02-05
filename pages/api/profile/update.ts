import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Mètode no permès" });
    }

    const { id, name, email, phone } = req.body;

    if (!id || !name || !email) {
        return res.status(400).json({ error: "Falten dades obligatòries" });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email, phone },
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error actualitzant usuari:", error);
        return res.status(500).json({ error: "Error del servidor" });
    }
}
