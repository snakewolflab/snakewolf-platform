import React from 'react';
// 以下のインポートは、実際のファイル分割環境で必要になりますが、
// この概念的な単一ファイル構造ではグローバルにアクセス可能であると仮定します。
import { Layout } from '../components/Layout';

export function QAHCPage() {
    // Layoutは上で定義されているため、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6">Q&Aスペース / ヘルプセンター</h2>
                <p className="text-lg text-gray-300">
                    よくある質問の検索や、コミュニティでの質問投稿ができます。
                </p>
                <div className="mt-8 space-y-4">
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">検索</h3>
                        <input type="text" placeholder="キーワードで検索..." className="w-full p-3 rounded-md bg-[#262a2f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
                        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">検索</button>
                    </div>
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">よくある質問</h3>
                        <ul className="list-disc list-inside text-gray-400 space-y-1">
                            <li>アカウントの作成方法</li>
                            <li>配信を開始するには？</li>
                            <li>パスワードをリセットするには？</li>
                        </ul>
                        <button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md">全て見る</button>
                    </div>
                     <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">コミュニティフォーラム</h3>
                        <p className="text-gray-400">他のユーザーに質問したり、回答を探したりできます。</p>
                        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">質問を投稿する</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
