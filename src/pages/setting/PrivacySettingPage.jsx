import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // AuthContextから認証情報を取得
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore操作に必要な関数をインポート
import { getFirestore, doc as firestoreDoc, getDoc as getFirestoreDoc, setDoc as setFirestoreDoc } from 'firebase/firestore'; // setDocもインポート
import { Layout } from '../../components/Layout'; // レイアウトコンポーネントをインポート
import { appId } from '../../firebase';

// PrivacySettingsPageコンポーネント: ユーザーのプライバシー設定を行うページ
export function PrivacySettingsPage() {
    const { currentUser, isAuthReady, db } = useAuth(); // AuthContextから現在のユーザーとFirestoreインスタンスを取得

    // プライバシー設定の状態
    const [personalizedAds, setPersonalizedAds] = useState(false); // パーソナライズド広告
    const [dataCollection, setDataCollection] = useState(true); // データ収集
    const [profileVisibility, setProfileVisibility] = useState('public'); // プロフィール公開設定
    const [onlineStatusVisibility, setOnlineStatusVisibility] = useState(true); // オンラインステータス公開
    const [emailNotifications, setEmailNotifications] = useState(true); // メール通知

    // UIメッセージとローディング状態
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 認証準備完了かつユーザーが存在する場合にデータを読み込む
        const fetchPrivacySettings = async () => {
            if (isAuthReady && currentUser && db) {
                try {
                    setLoading(true);
                    const userDocRef = firestoreDoc(db, `artifacts/${appId}/users/${currentUser.uid}/privacy/${currentUser.uid}`);
                    const userDocSnap = await getFirestoreDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const data = userDocSnap.data();
                        setPersonalizedAds(data.personalizedAds || false);
                        setDataCollection(data.dataCollection || true);
                        setProfileVisibility(data.profileVisibility || 'public');
                        setOnlineStatusVisibility(data.onlineStatusVisibility || true);
                        setEmailNotifications(data.emailNotifications || true);
                    } else {
                        // ドキュメントが存在しない場合、デフォルト値を設定
                        setPersonalizedAds(false);
                        setDataCollection(true);
                        setProfileVisibility('public');
                        setOnlineStatusVisibility(true);
                        setEmailNotifications(true);
                        // ドキュメントが存在しない場合は、ここで初期ドキュメントを作成
                        // これにより、後続のupdateDoc（setDoc with merge:true）がエラーなく動作する
                        // ただし、setDoc with merge:trueを使う場合は、この初期作成は必須ではない
                        // console.log("Privacy settings document does not exist. Defaulting values.");
                    }
                } catch (error) {
                    console.error("Error fetching privacy settings:", error);
                    setMessage('【失敗】プライバシー設定の読み込みに失敗しました。');
                } finally {
                    setLoading(false);
                }
            } else if (isAuthReady && !currentUser) {
                setLoading(false);
                setMessage('【失敗】ログインしてください。');
            }
        };

        fetchPrivacySettings();
    }, [isAuthReady, currentUser, db]); // 依存配列にisAuthReady, currentUser, dbを追加

    // Googleタグマネージャー連携のためのuseEffect
    // dataCollectionの状態が変更されるたびにdataLayerに同意情報をプッシュします。
    useEffect(() => {
        // window.dataLayerが存在するか確認
        // Google Tag Managerのスクリプトは通常、index.htmlの<head>タグ内で初期化されます。
        // 例:
        // <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
        if (window.dataLayer) {
            // データ収集の同意状態に基づいてGTMに同意イベントを送信
            // consent_mode v2 の基本的な実装例
            window.dataLayer.push({
                event: 'consent_update',
                'gtm.allowlist': ['google', 'custom'], // 許可するタグのタイプ
                'gtm.blocklist': [], // ブロックするタグのタイプ
                'ad_storage': dataCollection ? 'granted' : 'denied',
                'analytics_storage': dataCollection ? 'granted' : 'denied',
                'personalization_storage': dataCollection ? 'granted' : 'denied',
                'functionality_storage': dataCollection ? 'granted' : 'denied',
                'security_storage': dataCollection ? 'granted' : 'denied',
                'wait_for_update': 500 // 同意更新を待つミリ秒
            });
            console.log(`GTM DataLayer: Consent updated to ${dataCollection ? 'granted' : 'denied'}`);
        } else {
            console.warn("Google Tag Manager dataLayer not found. Ensure GTM script is loaded in index.html.");
        }
    }, [dataCollection]); // dataCollectionが変更されたときに実行

    // プライバシー設定を更新する関数
    const handleUpdatePrivacySettings = async (e) => {
        e.preventDefault();
        if (!currentUser || !db) {
            setMessage('【失敗】ユーザーがログインしていません。');
            return;
        }

        try {
            setLoading(true);
            const userDocRef = firestoreDoc(db, `artifacts/${appId}/users/${currentUser.uid}/privacy/${currentUser.uid}`);
            // updateDocの代わりにsetDoc with merge: trueを使用
            await setFirestoreDoc(userDocRef, {
                personalizedAds: personalizedAds,
                dataCollection: dataCollection,
                profileVisibility: profileVisibility,
                onlineStatusVisibility: onlineStatusVisibility,
                emailNotifications: emailNotifications,
            }, { merge: true }); // merge: true を追加
            setMessage('【成功】プライバシー設定が正常に更新されました！');
        } catch (error) {
            console.error("Error updating privacy settings:", error);
            setMessage('【失敗】プライバシー設定の更新に失敗しました。');
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
                    プライバシー設定
                </h2>

                {message && (
                    <p className={`mb-4 ${message.includes('成功') ? 'text-green-400' : 'text-red-400'}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleUpdatePrivacySettings} className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-200">データ利用</h3>
                    <div className="flex items-center justify-between mb-4">
                        <label htmlFor="personalizedAds" className="text-gray-300 text-base">
                            パーソナライズド広告の表示
                        </label>
                        <label htmlFor="personalizedAds" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="personalizedAds"
                                    className="sr-only"
                                    checked={personalizedAds}
                                    onChange={() => setPersonalizedAds(!personalizedAds)}
                                />
                                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div
                                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${personalizedAds ? 'translate-x-full bg-green-500' : ''
                                        }`}
                                ></div>
                            </div>
                            <div className="ml-3 text-gray-300 font-medium">
                                {personalizedAds ? '有効' : '無効'}
                            </div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="dataCollection" className="text-gray-300 text-base">
                            データ収集と分析への同意
                        </label>
                        <label htmlFor="dataCollection" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="dataCollection"
                                    className="sr-only"
                                    checked={dataCollection}
                                    onChange={() => setDataCollection(!dataCollection)}
                                />
                                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div
                                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${dataCollection ? 'translate-x-full bg-green-500' : ''
                                        }`}
                                ></div>
                            </div>
                            <div className="ml-3 text-gray-300 font-medium">
                                {dataCollection ? '同意済み' : '拒否'}
                            </div>
                        </label>
                    </div>
                    {/* Googleタグマネージャー連携に関する注意書きを削除しました。 */}

                    <h3 className="text-xl font-semibold mb-4 text-gray-200">プロフィール公開設定</h3>
                    <div className="mb-4">
                        <label htmlFor="profileVisibility" className="block text-gray-300 text-sm font-bold mb-2">
                            プロフィールを公開する範囲:
                        </label>
                        <select
                            id="profileVisibility"
                            value={profileVisibility}
                            onChange={(e) => setProfileVisibility(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="public">全体に公開</option>
                            <option value="friends">友達のみ</option>
                            <option value="private">非公開</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="onlineStatusVisibility" className="text-gray-300 text-base">
                            オンラインステータスの表示
                        </label>
                        <label htmlFor="onlineStatusVisibility" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="onlineStatusVisibility"
                                    className="sr-only"
                                    checked={onlineStatusVisibility}
                                    onChange={() => setOnlineStatusVisibility(!onlineStatusVisibility)}
                                />
                                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div
                                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${onlineStatusVisibility ? 'translate-x-full bg-green-500' : ''
                                        }`}
                                ></div>
                            </div>
                            <div className="ml-3 text-gray-300 font-medium">
                                {onlineStatusVisibility ? '表示' : '非表示'}
                            </div>
                        </label>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-gray-200">コミュニケーション設定</h3>
                    <div className="flex items-center justify-between">
                        <label htmlFor="emailNotifications" className="text-gray-300 text-base">
                            メール通知を受け取る
                        </label>
                        <label htmlFor="emailNotifications" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="emailNotifications"
                                    className="sr-only"
                                    checked={emailNotifications}
                                    onChange={() => setEmailNotifications(!emailNotifications)}
                                />
                                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div
                                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${emailNotifications ? 'translate-x-full bg-green-500' : ''
                                        }`}
                                ></div>
                            </div>
                            <div className="ml-3 text-gray-300 font-medium">
                                {emailNotifications ? '有効' : '無効'}
                            </div>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-semibold transition-colors duration-200"
                        disabled={loading}
                    >
                        {loading ? '保存中...' : '設定を保存'}
                    </button>
                </form>
            </div>
        </Layout>
    );
}
