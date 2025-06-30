import { SideBar } from "./Sidebar";

export function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#262a2f] text-[#fdfcfd] font-['M_PLUS_Rounded_1c']">
            <SideBar />
            <main className="flex-1 p-8 overflow-auto rounded-l-xl">
                {children}
            </main>
        </div>
    );
}