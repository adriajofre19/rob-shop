"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, CreditCard, MapPin, Lock } from "lucide-react";
import { AddressForm } from "@/components/profile/address-form";
import { PaymentMethodForm } from "@/components/profile/payment-form";
import { PersonalInfoForm } from "@/components/profile/personal-info-form";
import { SecurityForm } from "@/components/profile/security-form";

export default function ProfilePage() {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else {
            getUser();
        }
    }, [user, router]);

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

            if (!response.ok) {
                console.error("Error obteniendo usuario:", await response.json());
                return;
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-light mb-8">El Meu Perfil</h1>

            <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <TabsTrigger value="personal" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden md:inline">Informació Personal</span>
                    </TabsTrigger>
                    <TabsTrigger value="addresses" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="hidden md:inline">Adreces</span>
                    </TabsTrigger>
                    <TabsTrigger value="payment" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span className="hidden md:inline">Mètodes de Pagament</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span className="hidden md:inline">Seguretat</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informació Personal</CardTitle>
                            <CardDescription>
                                Actualitza la teva informació personal
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PersonalInfoForm user={data || user} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="addresses">
                    <Card>
                        <CardHeader>
                            <CardTitle>Les Meves Adreces</CardTitle>
                            <CardDescription>
                                Gestiona les teves adreces d&apos;enviament
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AddressForm />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payment">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mètodes de Pagament</CardTitle>
                            <CardDescription>
                                Gestiona els teus mètodes de pagament
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PaymentMethodForm />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Seguretat</CardTitle>
                            <CardDescription>
                                Gestiona la teva contrasenya i seguretat del compte
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SecurityForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
