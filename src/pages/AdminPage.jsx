import React from 'react';
// 以下のインポートは、実際のファイル分割環境で必要になります。
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export function AdminPage() {
    // LayoutとuseAuthは上で定義されているため、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
    const { currentUser } = useAuth();
    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6 text-red-400">管理者ポータル</h2>
                <p className="text-lg text-gray-300">
                    {currentUser ? `${currentUser.displayName}さん、` : 'ゲストさん、'}
                    ここは管理者のみがアクセスできるページです。ユーザー管理やシステム設定を行います。
                </p>
                <div className="mt-4 bg-[#36393f] p-4 rounded-md">
                    <h3 className="text-xl font-semibold mb-2">ユーザー管理</h3>
                    <p className="text-gray-400">ユーザー情報の閲覧、編集、権限変更。</p>
                    <p className="text-sm text-red-300 mt-2">（現在のバッジタイプ: {currentUser?.badgeType || 'N/A'}）</p>
                </div>
            </div>
        </Layout>
    );
}
