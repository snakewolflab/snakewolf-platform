import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { Layout } from '../../components/Layout';
// Badgeコンポーネントはここでは直接使用しないため削除しています。
// import { Badge } from '../../components/Badge';

export function EmailSettingsPage() {
    const { currentUser, isAuthReady } = useAuth(); // dbは直接使用しないため削除

    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [showReauthModal, setShowReauthModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const [emailChangeMessage, setEmailChangeMessage] = useState('');

    useEffect(() => {
        // 認証準備完了時にローディングを終了し、現在のメールアドレスを設定
        if (isAuthReady) {
            setLoading(false);
            if (currentUser) {
                setNewEmail(currentUser.email || '');
            } else {
                setEmailChangeMessage('ログインしてください。');
            }
        }
    }, [isAuthReady, currentUser]);

    // メールアドレス変更の開始
    const handleChangeEmail = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setEmailChangeMessage('ユーザーがログインしていません。');
            return;
        }

        if (newEmail === currentUser.email) {
            setEmailChangeMessage('新しいメールアドレスが現在のメールアドレスと同じです。');
            return;
        }

        setShowReauthModal(true); // 再認証モーダルを表示
        setEmailChangeMessage(''); // メッセージをクリア
    };

    // 再認証とメールアドレスの更新
    const handleReauthenticateAndChangeEmail = async () => {
        if (!currentUser) {
            setEmailChangeMessage('ユーザーがログインしていません。');
            return;
        }

        if (!currentPassword) {
            setEmailChangeMessage('パスワードを入力してください。');
            return;
        }

        setLoading(true);
        setEmailChangeMessage('');

        try {
            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
            await reauthenticateWithCredential(currentUser, credential);
            await updateEmail(currentUser, newEmail);

            setEmailChangeMessage('メールアドレスが正常に更新されました！');
            setShowReauthModal(false);
            setCurrentPassword(''); // パスワードフィールドをクリア
        } catch (error) {
            console.error("Error reauthenticating or updating email:", error);
            if (error.code === 'auth/wrong-password') {
                setEmailChangeMessage('パスワードが間違っています。');
            } else if (error.code === 'auth/invalid-email') {
                setEmailChangeMessage('無効なメールアドレスです。');
            } else if (error.code === 'auth/requires-recent-login') {
                setEmailChangeMessage('セキュリティのため、再度ログインしてください。');
                // 必要であれば、ここでログアウト処理などを促す
            } else if (error.code === 'auth/email-already-in-use') {
                setEmailChangeMessage('このメールアドレスは既に使用されています。');
            }
            else {
                setEmailChangeMessage(`メールアドレスの更新に失敗しました: ${error.message}`);
            }
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

    if (!currentUser) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-screen bg-[#2c2f33] text-[#fdfcfd]">
                    <p className="text-xl">{emailChangeMessage}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                    メールアドレス設定
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
                            {/* <Badge badgeType={currentUser.badgeType} /> */}
                        </div>
                        <p className="text-gray-400 text-sm">UID: {currentUser.uid}</p>
                    </div>
                </div>

                {emailChangeMessage && (
                    <p className={`text-center mb-4 ${emailChangeMessage.includes('成功') ? 'text-green-400' : 'text-red-400'}`}>
                        {emailChangeMessage}
                    </p>
                )}

                <form onSubmit={handleChangeEmail} className="space-y-4">
                    <div>
                        <label htmlFor="currentEmail" className="block text-gray-300 text-sm font-bold mb-2">
                            現在のメールアドレス:
                        </label>
                        <input
                            type="email"
                            id="currentEmail"
                            value={currentUser.email || 'N/A'}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 cursor-not-allowed"
                            disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="newEmail" className="block text-gray-300 text-sm font-bold mb-2">
                            新しいメールアドレス:
                        </label>
                        <input
                            type="email"
                            id="newEmail"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="新しいメールアドレスを入力"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-semibold transition-colors duration-200"
                        disabled={loading}
                    >
                        メールアドレスを変更
                    </button>
                </form>

                {showReauthModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm text-center">
                            <h3 className="text-xl font-bold mb-4 text-white">メールアドレス変更のために再認証してください</h3>
                            <p className="text-gray-300 mb-4">セキュリティのため、現在のパスワードを入力してください。</p>
                            <input
                                type="password"
                                placeholder="現在のパスワード"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 mb-4"
                                required
                            />
                            {emailChangeMessage && (
                                <p className={`text-center mb-4 ${emailChangeMessage.includes('成功') ? 'text-green-400' : 'text-red-400'}`}>
                                    {emailChangeMessage}
                                </p>
                            )}
                            <div className="flex justify-around">
                                <button
                                    onClick={handleReauthenticateAndChangeEmail}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300"
                                    disabled={loading}
                                >
                                    {loading ? '認証中...' : '認証して変更'}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowReauthModal(false);
                                        setCurrentPassword('');
                                        setEmailChangeMessage('');
                                    }}
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-all duration-300"
                                >
                                    キャンセル
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}