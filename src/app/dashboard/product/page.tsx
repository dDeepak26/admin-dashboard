import ProductClient from "@/components/product/productClient";
import { authOptions } from "@/lib/authOptions"
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";



export default async function ProductPage() {

    const session: Session | null = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }

    return (
        <ProductClient
            role={session.user.role || ""}
        />
    )
}