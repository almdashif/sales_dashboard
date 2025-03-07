import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-screen">
            {/* Sidebar Left Side Area*/}
            <div className="h-screen sticky top-0">
                <Sidebar />
            </div>

            {/* Right Side Area */}
            <main className="flex-1 p-4 overflow-auto">
                {children}
            </main>
        </div>
    );
}
