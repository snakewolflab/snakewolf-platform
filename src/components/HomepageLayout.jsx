import React from 'react';

export function HomepageLayout({ children }) {
    // SideBarは上で定義されているため、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
    return (
        <div className="flex min-h-screen h-full bg-[#262a2f] text-[#fdfcfd] font-['M_PLUS_Rounded_1c'] p-0">
            <main className="flex-1 overflow-auto rounded-l-xl p-0">
                {children}
            </main>
        </div>
    );
}
