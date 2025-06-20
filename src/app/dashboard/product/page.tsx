import ProductClient from "@/components/product/productClient";
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";



export default async function ProductPage() {

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }

    return (
        <ProductClient
            role={session?.user?.role || ""}
        />
    )
}