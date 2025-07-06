import React from 'react';
// 以下のインポートは、実際のファイル分割環境で必要になります。
import { SideBar } from './SideBar';

export function Layout({ children }) {
    // SideBarは上で定義されているため、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
    return (
        <div className="flex min-h-screen bg-[#262a2f] text-[#fdfcfd] font-['M_PLUS_Rounded_1c']">
            <SideBar />
            <main className="flex-1 p-8 overflow-auto rounded-l-xl">
                {children}
            </main>
        </div>
    );
}
