import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Layout } from '../../components/Layout';
import { Badge } from '../../components/Badge'; // Badgeコンポーネントが不要な場合は削除可能

export function LinkSettingsPage() {
    const { currentUser, isAuthReady } = useAuth(); // dbはここでは直接使用しないため削除
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // ロード状態の管理のみ
    useEffect(() => {
        if (isAuthReady) {
            setLoading(false);
            if (!currentUser) {
                setMessage('ログインしてください。');
            }
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
                    リンクされたアカウント・アプリケーション
                </h2>
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8">
                    <img
                        src={currentUser.photoURL || `https://placehold.co/120x120/737373/ffffff?text=${(currentUser.displayName && currentUser.displayName.length > 0) ? currentUser.displayName[0].toUpperCase() : '?'}`}
                        alt="Profile Avatar"
                        className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg"
                    />
                    <div>
                        <div className="text-2xl font-semibold mb-1 flex items-center">
                            {currentUser.displayName || '名無し'}
                            {/* BadgeコンポーネントはcurrentUserにbadgeTypeがない場合、または表示しない場合は削除可能 */}
                            <Badge badgeType={currentUser.badgeType} />
                        </div>
                        <p className="text-gray-400 text-sm">UID: {currentUser.uid}</p>
                    </div>
                </div>

                <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center justify-between">
                        Google
                        <span className="text-green-400">リンク済み</span>
                    </li>
                    <li className="flex items-center justify-between">
                        Facebook
                        <span className="text-red-400">未リンク</span>
                    </li>
                    <li className="flex items-center justify-between">
                        Twitter
                        <span className="text-red-400">未リンク</span>
                    </li>
                </ul>
            </div>
        </Layout>
    );
}