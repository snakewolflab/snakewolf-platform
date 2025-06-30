import React from 'react'; // トップレベルでインポート済み
import { Layout } from '../components/Layout';

export function SettingsPage() {
    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6">設定</h2>
                <p className="text-lg text-gray-300">
                    アカウント設定、プライバシー設定、通知設定などをここで行います。
                    クッキー管理システム（Googleタグマネージャー連携）は今後の実装にご期待ください。
                </p>
                <div className="mt-8 space-y-4">
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">アカウント情報</h3>
                        <p className="text-gray-400">メールアドレス、パスワードなどの変更。</p>
                        <button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md">アカウントを管理</button>
                    </div>
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">プライバシー設定</h3>
                        <p className="text-gray-400">データ利用やクッキーの同意設定。</p>
                        <button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md">プライバシー設定へ</button>
                    </div>
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">KWS連携設定</h3>
                        <p className="text-gray-400">外部KWSサービスとの連携を管理します。</p>
                        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">KWSを認証する</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}