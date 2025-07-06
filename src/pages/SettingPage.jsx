import React, { useState, useEffect } from 'react';
// 以下のインポートは、実際のファイル分割環境で必要になりますが、
// この概念的な単一ファイル構造ではグローバルにアクセス可能であると仮定します。
import { useAuth } from '../context/AuthContext';
import { Layout } from '../components/Layout';

export function SettingsPage() {
    const { currentUser, isAuthReady } = useAuth(); // dbはここでは直接使用しないため削除

    // ロード状態の管理のみ
    useEffect(() => {
        if (isAuthReady) {
            if (!currentUser) {
                setMessage('ログインしてください。');
            }
        }
    }, [isAuthReady, currentUser]);
    // Layoutは上で定義されているため、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
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
                        <h3 className="text-xl font-semibold mb-2">プロフィール設定</h3>
                        <p className="text-gray-400">ディスプレイネームや国などの変更</p>
                        <a href="/settings/account"><button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md">プロフィールを管理</button></a>
                    </div>
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">メールアドレス設定</h3>
                        <p className="text-gray-400">メールアドレスの変更</p>
                        <a href="/settings/mail"><button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md">メールアドレスを管理</button></a>
                    </div>
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">セキュリティー管理</h3>
                        <p className="text-gray-400">セキュリティー設定の変更やログイン復歴など</p>
                        <a href="/settings/security"><button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md">セキュリティーを管理</button></a>
                    </div>
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">ペアレンタルコントロール設定</h3>
                        <p className="text-gray-400">ＰＩＮコードの変更</p>
                        <a href="/settings/pair"><button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md">ペアレンタルコントロールを管理</button></a>
                    </div>
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">リンクされたアカウント・アプリケーション設定</h3>
                        <p className="text-gray-400">アカウントをほかのアカウントやアプリケーションにリンク</p>
                        <a href="/settings/link"><button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md">リンクされたアカウント・アプリケーションを管理</button></a>
                    </div>
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">プライバシー設定</h3>
                        <p className="text-gray-400">データ利用やクッキーの同意設定。</p>
                        <a href="/settings/privacy"><button className="mt-3 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md">プライバシー設定へ</button></a>
                    </div>
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">KWS連携設定</h3>
                        <p className="text-gray-400">外部KWSサービスとの連携を管理します。</p>
                        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">KWSを認証する</button>
                    </div>
                    <div className="bg-[#36393f] p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">{currentUser.badgeType == "common" ? "認証済みアカウント" : currentUser.badgeType == "official" ? "認証済みアカウント" : currentUser.badgeType == "education" ? "認証済みアカウント" : currentUser.badgeType == "company" ? "認証済みアカウント" : "認証バッチを申請する"}</h3>
                        <p className="text-gray-400">{currentUser.badgeType == "common" ? "認証済みのためこの項目は使用できません" : currentUser.badgeType == "official" ? "認証済みのためこの項目は使用できません" : currentUser.badgeType == "education" ? "認証済みのためこの項目は使用できません" : currentUser.badgeType == "company" ? "認証済みのためこの項目は使用できません" : "認証バッチを申請することが可能です"}</p>
                        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">{currentUser.badgeType == "common" ? "利用不可" : currentUser.badgeType == "official" ? "利用不可" : currentUser.badgeType == "education" ? "利用不可" : currentUser.badgeType == "company" ? "利用不可" : "申請する"}</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
