import React from 'react'; // トップレベルでインポート済み
// useAuthは上で定義されているため、ここではimportはしません。
import { Layout } from '../components/Layout';

export function CreatorPage() {
    const { currentUser } = useAuth();
    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6 text-green-400">配信者ポータル</h2>
                <p className="text-lg text-gray-300">
                    {currentUser ? `${currentUser.email}さん、` : 'ゲストさん、'}
                    ここは配信者向けのページです。配信設定や分析を行います。
                </p>
                <div className="mt-4 bg-[#36393f] p-4 rounded-md">
                    <h3 className="text-xl font-semibold mb-2">配信キー管理</h3>
                    <p className="text-gray-400">あなたの配信キーを管理。</p>
                </div>
            </div>
        </Layout>
    );
}