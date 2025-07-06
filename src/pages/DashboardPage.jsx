import React from 'react';
// 以下のインポートは、実際のファイル分割環境で必要になりますが、
// この概念的な単一ファイル構造ではグローバルにアクセス可能であると仮定します。
import { Layout } from '../components/Layout';
import { Badge } from '../components/Badge';
import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
    // Layout, Badge, useAuthは上で定義されているため、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
    const { currentUser } = useAuth();
    const userId = currentUser?.uid || crypto.randomUUID();

    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                    ようこそ、{currentUser ? currentUser.displayName : 'ゲスト'}さん！
                    {currentUser && <Badge badgeType={currentUser.badgeType} />}
                </h2>
                <div className="text-lg mb-4">
                    <p className="text-gray-300">ここでは、最新のアクティビティやあなたへのおすすめコンテンツが表示されます。</p>
                </div>
                 <div className="bg-[#36393f] p-4 rounded-md mb-4">
                    <h3 className="text-xl font-semibold mb-2">あなたのユーザーID (公開用):</h3>
                    <p className="font-mono text-gray-200 break-all">{userId}</p>
                    <p className="text-sm text-gray-400 mt-2">このIDは他のユーザーと共有できます。</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <img src="https://placehold.co/300x180/737373/ffffff?text=LIVE+Stream" alt="Live Stream" className="w-full h-auto rounded-md mb-2"/>
                        <h3 className="text-xl font-semibold text-white">スネークワールド探検！</h3>
                        <p className="text-gray-400 text-sm">配信者: PythonKing <Badge badgeType="common" /></p>
                        <p className="text-red-400 text-xs mt-1">🔴 LIVE</p>
                    </div>
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <img src="https://placehold.co/300x180/737373/ffffff?text=ARCHIVE" alt="Archive" className="w-full h-auto rounded-md mb-2"/>
                        <h3 className="text-xl font-semibold text-white">過去のウルフハント</h3>
                        <p className="text-gray-400 text-sm">配信者: AlphaWolf <Badge badgeType="official" /></p>
                        <p className="text-gray-500 text-xs mt-1">アーカイブ</p>
                    </div>
                     <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">おすすめコンテンツ</h3>
                        <p className="text-gray-400">あなたの興味に合わせたコンテンツが表示されます。</p>
                        <ul className="mt-2 text-gray-300">
                            <li><a href="#" className="text-blue-400 hover:underline">RPGゲーム攻略法</a></li>
                            <li><a href="#" className="text-blue-400 hover:underline">最新PCデバイスレビュー</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
