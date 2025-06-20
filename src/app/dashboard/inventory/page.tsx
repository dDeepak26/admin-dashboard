import InventoryClient from "@/components/inventory/inventoryClient";
import { authOptions } from "@/lib/authOptions"
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";



export default async function InventoryPage() {

    const session: Session | null = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }

    return (
        <InventoryClient
            role={session.user.role || ""}
        />
    )
}