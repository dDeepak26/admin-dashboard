import CategoryClient from "@/components/category/categoryClient";
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";



export default async function CategoryPage() {

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }

    return (
        <CategoryClient
            role={(session?.user as any)?.role || ""}
        />
    )
}