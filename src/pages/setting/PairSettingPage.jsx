import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc as firestoreDoc, getDoc as getFirestoreDoc, updateDoc as updateFirestoreDoc } from 'firebase/firestore';
import { Layout } from '../../components/Layout';
import { appId } from '../../firebase';

export function PairSettingsPage() {
    const { currentUser, isAuthReady, db } = useAuth();
    const [parentalPin, setParentalPin] = useState('');
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
                        setParentalPin(data.parentalPin || '');
                    } else {
                        setParentalPin('');
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

    const handleUpdateParentalPin = async (e) => {
        e.preventDefault();
        if (!currentUser || !db) {
            setMessage('ユーザーがログインしていません。');
            return;
        }

        try {
            setLoading(true);
            const userDocRef = firestoreDoc(db, `artifacts/${appId}/users/${currentUser.uid}/profile/${currentUser.uid}`);
            await updateFirestoreDoc(userDocRef, {
                parentalPin: parentalPin,
            });
            setMessage('PINコードが正常に更新されました！');
        } catch (error) {
            console.error("Error updating parental PIN:", error);
            setMessage('PINコードの更新に失敗しました。');
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
                    ペアレンタルコントロール設定
                </h2>

                <form onSubmit={handleUpdateParentalPin} className="space-y-4">
                    <div>
                        <label htmlFor="parentalPin" className="block text-gray-300 text-sm font-bold mb-2">
                            PINコードを設定:
                        </label>
                        <input
                            type="password"
                            id="parentalPin"
                            value={parentalPin}
                            onChange={(e) => setParentalPin(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="4桁のPINコード (例: 1234)"
                            maxLength="4"
                        />
                    </div>
                    {message && <p className="text-sm text-green-500">{message}</p>}
                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-semibold transition-colors duration-200"
                        disabled={loading}
                    >
                        {loading ? '保存中...' : 'PINコードを保存'}
                    </button>
                </form>
            </div>
        </Layout>
    );
}