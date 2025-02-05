import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'Tots els camps són obligatoris' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Les contrasenyes no coincideixen' });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Aquest correu electrònic ja està registrat' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return res.status(201).json({
            message: 'Usuari registrat correctament',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
}