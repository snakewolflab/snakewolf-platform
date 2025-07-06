import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Layout } from '../../components/Layout';
// Badgeコンポーネントはここでは直接使用しないため、必要に応じて削除してください。
import { Badge } from '../../components/Badge';

export function SecuritySettingsPage() {
    const { currentUser, isAuthReady } = useAuth(); // dbは直接使用しないため削除
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // 2段階認証の状態 (ダミー)
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    // ログイン履歴 (ダミーデータ)
    const [loginHistory, setLoginHistory] = useState([
        { date: '2025/07/01 10:30', device: 'Windows PC', location: '東京' },
        { date: '2025/06/28 15:00', device: 'iPhone', location: '大阪' },
        { date: '2025/06/25 09:15', device: 'Android Tablet', location: '福岡' },
    ]);

    useEffect(() => {
        // 認証準備完了時にローディングを終了
        if (isAuthReady) {
            setLoading(false);
            if (!currentUser) {
                setMessage('ログインしてください。');
            }
            // ここでcurrentUserから2段階認証の実際の状態を読み込むロジックを追加できます
            // 例: setTwoFactorEnabled(currentUser.twoFactorEnabled || false);
        }
    }, [isAuthReady, currentUser]);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-screen bg-[#2c2f33] text-[#fdfcfd]">
                    <p className="text-xl">読み込み中...</p>
                </div>
            </Layout>
        );
    }

    if (!currentUser) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-screen bg-[#2c2f33] text-[#fdfcfd]">
                    <p className="text-xl">{message}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                    セキュリティー設定
                </h2>
                {/* ユーザープロフィールの表示は、UIの整合性を保つために残しています。不要であれば削除可能。 */}
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8">
                    <img
                        src={currentUser.photoURL || `https://placehold.co/120x120/737373/ffffff?text=${(currentUser.displayName && currentUser.displayName.length > 0) ? currentUser.displayName[0].toUpperCase() : '?'}`}
                        alt="Profile Avatar"
                        className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg"
                    />
                    <div>
                        <div className="text-2xl font-semibold mb-1 flex items-center">
                            {currentUser.displayName || '名無し'}
                            {/* Badgeコンポーネントが不要な場合はこの行を削除 */}
                            <Badge badgeType={currentUser.badgeType} />
                        </div>
                        <p className="text-gray-400 text-sm">UID: {currentUser.uid}</p>
                    </div>
                </div>

                {/* ログイン履歴セクション */}
                <h3 className="text-2xl font-bold mb-4 mt-6">ログイン履歴</h3>
                <ul className="space-y-2 text-gray-300">
                    {loginHistory.map((entry, index) => (
                        <li key={index} className="flex justify-between items-center text-sm border-b border-gray-600 pb-2 last:border-b-0">
                            <span>{entry.date}</span>
                            <span>{entry.device}</span>
                            <span>{entry.location}</span>
                        </li>
                    ))}
                </ul>

                <p className="text-gray-300 mt-4">不明なログインがありましたか？</p>
                <p className="text-gray-300">次のステップを実行してください</p>
                <ul className="list-disc list-inside ml-4 text-gray-300">
                    <li><a href="/settings/logout" className="text-blue-400 hover:underline">全プラットフォームからログアウト</a>（※お時間がかかる恐れがあります）</li>
                    <li>パスワードを<a href="/settings/password" className="text-blue-400 hover:underline">リセット</a></li>
                </ul>

                <hr className="my-8 border-gray-600" />

                {/* 2段階認証セクション */}
                <h3 className="text-2xl font-bold mb-4">2段階認証</h3>
                <label htmlFor="twoFactorToggle" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="twoFactorToggle"
                            className="sr-only"
                            checked={twoFactorEnabled}
                            onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                            disabled // ダミー機能のため無効化
                        />
                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div
                            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${twoFactorEnabled ? 'translate-x-full bg-green-500' : ''}`}
                        ></div>
                    </div>
                    <div className="ml-3 text-gray-300 font-medium">
                        {twoFactorEnabled ? '有効' : '無効'}
                    </div>
                </label>
                <p className="text-gray-400 text-sm mt-2">（現在、2段階認証機能はダミーです。）</p>

                <hr className="my-8 border-gray-600" />

                <p className="text-gray-300">ペアレンタルコントロールの設定は<a href="/settings/pair" className="text-blue-400 hover:underline">こちらから</a></p>
                <p className="text-gray-300">パスワードの再設定は<a href="/settings/password" className="text-blue-400 hover:underline">こちらから</a></p>
            </div>
        </Layout>
    );
}