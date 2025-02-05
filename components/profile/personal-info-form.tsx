"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PersonalInfoFormProps {
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
    };
}

export function PersonalInfoForm({ user }: PersonalInfoFormProps) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone || "");
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Error: No s'ha trobat cap token d'autenticació.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/user/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, email, phone }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("✅ Dades actualitzades correctament!");
            } else {
                setMessage(`❌ Error: ${data.error || "No s'ha pogut actualitzar"}`);
            }
        } catch (error) {
            setMessage("❌ Error en la connexió amb el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                    Nom complet
                </label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                    Correu electrònic
                </label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                    Telèfon
                </label>
                <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: 666 666 666"
                />
            </div>

            {message && <p className="text-sm text-gray-700">{message}</p>}

            <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={loading}
            >
                {loading ? "Actualitzant..." : "Actualitzar Perfil"}
            </Button>
        </form>
    );
}
