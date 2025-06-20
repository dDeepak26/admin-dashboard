import CategoryClient from "@/components/category/categoryClient";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export default async function CategoryPage() {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }

    return (
        <CategoryClient role={session.user.role || ""} />
    );
}
