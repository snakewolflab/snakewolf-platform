import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
// 以下のインポートは、実際のファイル分割環境で必要になりますが、
// この概念的な単一ファイル構造ではグローバルにアクセス可能であると仮定します。
import { Layout } from '../components/Layout';
import { Badge } from '../components/Badge';
import { useAuth } from '../context/AuthContext';
import { appId } from '../firebase';

export function ProfilePage() {
    // Layout, Badge, useAuth, appId, auth, db は上で定義されているため、
    // この概念的な単一ファイル構造ではグローバルにアクセス可能であると仮定します。
    const { currentUser, db } = useAuth();
    const [selfIntro, setSelfIntro] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        if (currentUser && currentUser.uid) {
            const userDocRef = doc(db, `artifacts/${appId}/users/${currentUser.uid}/profile/${currentUser.uid}`);
            getDoc(userDocRef)
                .then(docSnap => {
                    if (docSnap.exists() && docSnap.data().selfIntro) {
                        setSelfIntro(docSnap.data().selfIntro);
                    }
                })
                .catch(error => console.error("Error fetching profile:", error));
        }
    }, [currentUser, db]);

    const handleSaveProfile = async () => {
        if (!currentUser || !currentUser.uid) {
            setStatusMessage('エラー: ユーザーが認証されていません。');
            return;
        }
        try {
            const userDocRef = doc(db, `artifacts/${appId}/users/${currentUser.uid}/profile/${currentUser.uid}`);
            await updateDoc(userDocRef, { selfIntro });
            setStatusMessage('プロフィールを保存しました！');
            setTimeout(() => setStatusMessage(''), 3000);
        } catch (error) {
            console.error("Error saving profile:", error);
            setStatusMessage(`エラー: プロフィール保存に失敗しました (${error.message})`);
        }
    };

    if (!currentUser) {
        return (
            <Layout>
                <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl">
                    <p className="text-xl text-red-400">ユーザー情報が読み込めません。ログインしてください。</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                    プロフィール
                </h2>
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8">
                    <img
                        src={currentUser?.iconUrl || `https://placehold.co/120x120/737373/ffffff?text=${(currentUser?.displayName && currentUser.displayName.length > 0) ? currentUser.displayName[0].toUpperCase() : '?'}`}
                        alt="Profile Avatar"
                        className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg"
                    />
                    <div>
                        <p className="text-2xl font-semibold mb-1 flex items-center">
                            {currentUser.displayName}
                            <Badge badgeType={currentUser.badgeType} />
                        </p>
                        <p className="text-gray-400 text-sm">UID: {currentUser.uid}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">自己紹介</h3>
                    <textarea
                        className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                        placeholder="自己紹介文を入力してください..."
                        value={selfIntro}
                        onChange={(e) => setSelfIntro(e.target.value)}
                    ></textarea>
                    <button
                        onClick={handleSaveProfile}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-semibold transition-colors duration-200"
                    >
                        自己紹介を保存
                    </button>
                    {statusMessage && (
                        <p className={`mt-2 text-sm ${statusMessage.includes('エラー') ? 'text-red-400' : 'text-green-400'}`}>
                            {statusMessage}
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
