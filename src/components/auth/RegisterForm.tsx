"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "admin",
    });

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) router.push("/");
        else alert("Registration failed");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create a new account</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="mail@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Role</Label>
                        <RadioGroup
                            value={formData.role}
                            onValueChange={(value) =>
                                setFormData({ ...formData, role: value })
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="master" id="master" />
                                <Label htmlFor="master">Master</Label>
                                <RadioGroupItem value="admin" id="admin" />
                                <Label htmlFor="admin">Admin</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full">
                        Register
                    </Button>

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline underline-offset-4">
                            Sign In
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
