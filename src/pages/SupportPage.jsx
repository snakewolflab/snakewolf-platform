import React from 'react';
// 以下のインポートは、実際のファイル分割環境で必要になりますが、
// この概念的な単一ファイル構造ではグローバルにアクセス可能であると仮定します。
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export function SupportPage() {
    // LayoutとuseAuthは上で定義されているため、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
    const { currentUser } = useAuth();
    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6 text-blue-400">サポートセンターポータル</h2>
                <p className="text-lg text-gray-300">
                    {currentUser ? `${currentUser.displayName}さん、` : 'ゲストさん、'}
                    ここはサポートオペレーター向けのページです。ユーザーからの問い合わせを管理します。
                </p>
                 <div className="mt-4 bg-[#36393f] p-4 rounded-md">
                    <h3 className="text-xl font-semibold mb-2">チケット一覧</h3>
                    <p className="text-gray-400">未対応の問い合わせチケットを確認。</p>
                </div>
            </div>
        </Layout>
    );
}
