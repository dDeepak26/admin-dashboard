import InventoryClient from "@/components/inventory/inventoryClient";
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";



export default async function InventoryPage() {

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }

    return (
        <InventoryClient
            role={(session?.user as any)?.role || ""}
        />
    )
}