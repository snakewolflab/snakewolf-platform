import React from 'react';
// 以下のインポートは、実際のファイル分割環境で必要になりますが、
// この概念的な単一ファイル構造ではグローバルにアクセス可能であると仮定します。
import { Layout } from '../components/Layout';
import { Badge } from '../components/Badge';

export function PlatformPage() {
    // LayoutとBadgeは上で定義されているため、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6">配信プラットフォーム</h2>
                <p className="text-lg text-gray-300">
                    ゲーム配信の視聴やインタラクションが楽しめます。
                    KWS連携は今後の実装にご期待ください。
                </p>
                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <img src="https://placehold.co/300x180/737373/ffffff?text=UPCOMING" alt="Upcoming Stream" className="w-full h-auto rounded-md mb-2"/>
                        <h3 className="text-xl font-semibold text-white">新作ゲーム先行プレイ</h3>
                        <p className="text-gray-400 text-sm">配信者: GameSensei <Badge badgeType="education" /></p>
                        <p className="text-blue-400 text-xs mt-1">次回配信予定</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
