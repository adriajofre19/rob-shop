import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Tots els camps són obligatoris' });
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ error: 'Correu electrònic o contrasenya incorrectes' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Correu electrònic o contrasenya incorrectes' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            user: userWithoutPassword,
            session: {
                access_token: token,
                expires_in: 7 * 24 * 60 * 60 // 7 days in seconds
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
}