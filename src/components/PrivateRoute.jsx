import React, { useContext } from 'react';
// 以下のインポートは、実際のファイル分割環境で必要になります。
import { AuthContext } from '../context/AuthContext'; 

export function PrivateRoute({ children }) {
    // AuthContextはAuthContext.jsxでエクスポートされており、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
    const { currentUser, isAuthReady } = useContext(AuthContext);

    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#262a2f] text-[#fdfcfd]">
                <div className="text-xl">認証情報を読み込み中...</div>
            </div>
        );
    }

    if (!currentUser) {
        window.location.pathname = '/auth'; // 未認証なら認証ページへリダイレクト
        return null;
    }

    return children;
}
