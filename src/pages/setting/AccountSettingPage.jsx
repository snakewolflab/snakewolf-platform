import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc as firestoreDoc, getDoc as getFirestoreDoc, updateDoc as updateFirestoreDoc } from 'firebase/firestore';
import { Layout } from '../../components/Layout';
import { appId } from '../../firebase';
import { Badge } from '../../components/Badge';

export function AccountSettingsPage() {
    const { currentUser, isAuthReady, db } = useAuth();
    const [statusMessage, setStatusMessage] = useState('');

    // ユーザープロフィールの状態
    const [displayName, setDisplayName] = useState('');
    const [selfIntro, setSelfIntro] = useState('');
    const [badgeType, setBadgeType] = useState('none');
    const [language, setLanguage] = useState('ja');
    const [nationality, setNationality] = useState('');
    const [iconUrl, setIconUrl] = useState('');

    // UIメッセージとローディング状態
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (isAuthReady && currentUser && db) {
                try {
                    setLoading(true);
                    const userDocRef = firestoreDoc(db, `artifacts/${appId}/users/${currentUser.uid}/profile/${currentUser.uid}`);
                    const userDocSnap = await getFirestoreDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const data = userDocSnap.data();
                        setDisplayName(data.displayName || currentUser.displayName || '');
                        setSelfIntro(data.selfIntro || '');
                        setBadgeType(data.badgeType || 'none');
                        setLanguage(data.language || 'ja');
                        setNationality(data.nationality || '');
                        setIconUrl(data.iconUrl || '');
                    } else {
                        setDisplayName(currentUser.displayName || '');
                        setSelfIntro('');
                        setBadgeType('none');
                        setLanguage('ja');
                        setNationality('');
                        setIconUrl('');
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setMessage('ユーザーデータの読み込みに失敗しました。');
                } finally {
                    setLoading(false);
                }
            } else if (isAuthReady && !currentUser) {
                setLoading(false);
                setMessage('ログインしてください。');
            }
        };

        fetchUserData();
    }, [isAuthReady, currentUser, db]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!currentUser || !db) {
            setMessage('ユーザーがログインしていません。');
            return;
        }

        try {
            setLoading(true);
            const userDocRef = firestoreDoc(db, `artifacts/${appId}/users/${currentUser.uid}/profile/${currentUser.uid}`);
            await updateFirestoreDoc(userDocRef, {
                displayName: displayName,
                selfIntro: selfIntro,
                badgeType: badgeType,
                language: language,
                nationality: nationality,
                iconUrl: iconUrl,
            });
            setMessage('プロフィールが正常に更新されました！');
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage('プロフィールの更新に失敗しました。');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-screen bg-[#2c2f33] text-[#fdfcfd]">
                    <p className="text-xl">読み込み中...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                    プロフィール設定
                </h2>
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-8">
                    <img
                        src={iconUrl || `https://placehold.co/120x120/737373/ffffff?text=${(displayName && displayName.length > 0) ? displayName[0].toUpperCase() : '?'}`}
                        alt="Profile Avatar"
                        className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg"
                    />
                    <div>
                        <div className="text-2xl font-semibold mb-1 flex items-center">
                            {displayName}
                            <Badge badgeType={badgeType} />
                        </div>
                        <p className="text-gray-400 text-sm">UID: {currentUser.uid}</p>
                    </div>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                        <label htmlFor="iconUrl" className="block text-gray-300 text-sm font-bold mb-2">
                            アイコンURL:
                        </label>
                        <input
                            type="url"
                            id="iconUrl"
                            value={iconUrl}
                            onChange={(e) => setIconUrl(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="アイコンURLを入力してください"
                        />
                    </div>
                    <div>
                        <label htmlFor="displayName" className="block text-gray-300 text-sm font-bold mb-2">
                            表示名:
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="表示名を入力してください"
                        />
                    </div>
                    <div>
                        <label htmlFor="selfIntro" className="block text-gray-300 text-sm font-bold mb-2">
                            自己紹介:
                        </label>
                        <textarea
                            id="selfIntro"
                            value={selfIntro}
                            onChange={(e) => setSelfIntro(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                            placeholder="自己紹介を入力してください..."
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="badgeType" className="block text-gray-300 text-sm font-bold mb-2">
                            バッジタイプ:
                        </label>
                        <select
                            id="badgeType"
                            value={badgeType}
                            onChange={(e) => setBadgeType(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="none">なし</option>
                            <option value="bronze">ブロンズ</option>
                            <option value="silver">シルバー</option>
                            <option value="gold">ゴールド</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="language" className="block text-gray-300 text-sm font-bold mb-2">
                            言語:
                        </label>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="ja">日本語</option>
                            <option value="en">English</option>
                            <option value="zh">中文</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="nationality" className="block text-gray-300 text-sm font-bold mb-2">
                            国籍:
                        </label>
                        <input
                            type="text"
                            id="nationality"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="国籍を入力してください"
                        />
                    </div>
                    {message && <p className="text-sm text-green-500">{message}</p>}
                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-semibold transition-colors duration-200"
                        disabled={loading}
                    >
                        {loading ? '保存中...' : 'プロフィールを保存'}
                    </button>
                </form>
            </div>
        </Layout>
    );
}