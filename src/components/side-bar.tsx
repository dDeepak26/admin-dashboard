"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    LayoutGrid,
    Boxes,
    Layers,
    LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
    return (
        <div className="h-screen w-64 border-r flex flex-col justify-between p-4 shadow-sm">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold px-2">Dashboard</h2>

                <nav className="flex flex-col space-y-1">
                    <Link href="/dashboard/product">
                        <Button variant="ghost" className="w-full justify-start">
                            <LayoutGrid className="mr-2 h-4 w-4" />
                            Product
                        </Button>
                    </Link>

                    <Link href="/dashboard/category">
                        <Button variant="ghost" className="w-full justify-start">
                            <Boxes className="mr-2 h-4 w-4" />
                            Category
                        </Button>
                    </Link>

                    <Link href="/dashboard/inventory">
                        <Button variant="ghost" className="w-full justify-start">
                            <Layers className="mr-2 h-4 w-4" />
                            Inventory
                        </Button>
                    </Link>
                </nav>
            </div>

            <div>
                <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
