import Sidebar from "@/components/side-bar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
