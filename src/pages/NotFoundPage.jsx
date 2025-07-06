import React from 'react';
// 以下のインポートは、実際のファイル分割環境で必要になります。
import { Layout } from '../components/Layout';

export function NotFoundPage() {
    // Layoutは上で定義されているため、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-6xl font-bold text-red-500 mb-4">404</h2>
                <p className="text-xl text-gray-300 mb-6">ページが見つかりません。</p>
                <a href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-semibold transition-colors duration-200">
                    ダッシュボードへ戻る
                </a>
            </div>
        </Layout>
    );
}
