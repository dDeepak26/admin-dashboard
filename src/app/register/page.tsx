import RegisterForm from "@/components/auth/RegisterForm";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard/product");
    }
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <RegisterForm />
            </div>
        </div>
    );
}
