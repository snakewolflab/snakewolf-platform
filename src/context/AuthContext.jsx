import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db, appId } from '../firebase';

// AuthContextの定義
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false); // 認証状態の初期化が完了したかを示すフラグ

    useEffect(() => {
        // Firebase認証状態の変更を監視
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                console.log("User signed in:", user.email, "UID:", user.uid);
                // ユーザーデータ（バッジタイプ、自己紹介など）をFirestoreから取得または初期設定
                const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile/${user.uid}`);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    // 既存のユーザーデータがある場合、それをcurrentUserにマージ
                    setCurrentUser(prev => ({ ...prev, ...userDocSnap.data() }));
                } else {
                    // 新規ユーザーの場合、またはデータがない場合は初期データを設定
                    await setDoc(userDocRef, { badgeType: 'none', selfIntro: '' }, { merge: true });
                    setCurrentUser(prev => ({ ...prev, badgeType: 'none', selfIntro: '' }));
                }
            } else {
                // ユーザーがログアウトした場合
                setCurrentUser(null);
                console.log("User signed out.");
            }
            setIsAuthReady(true); // 認証状態の初期化が完了
        });

        // Canvas環境の__initial_auth_tokenを自動的に使用してサインインを試みる
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
        if (initialAuthToken && !currentUser) { // currentUserがまだセットされていない場合のみ試行
             signInWithCustomToken(auth, initialAuthToken)
                .then(() => console.log("Signed in with custom token."))
                .catch(error => {
                    console.error("Custom token sign-in failed:", error);
                    // カスタムトークン認証に失敗した場合、匿名サインインを試みる
                    signInAnonymously(auth)
                        .then(() => console.log("Signed in anonymously due to custom token failure."))
                        .catch(anonError => console.error("Anonymous sign-in failed:", anonError));
                });
        } else if (!initialAuthToken && !currentUser) {
            // カスタムトークンがない場合、匿名サインインを試みる
            signInAnonymously(auth)
                .then(() => console.log("Signed in anonymously."))
                .catch(anonError => console.error("Anonymous sign-in failed:", anonError));
        }

        return () => unsubscribe(); // コンポーネントのアンマウント時にリスナーを解除
    }, [currentUser]); // currentUserを依存配列に追加して、トークン認証とユーザー状態の同期を図る

    // メールとパスワードでサインイン
    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            console.error("Sign in failed:", error.message);
            return { success: false, error: error.message };
        }
    };

    // メールとパスワードで新規登録
    const signUp = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Firestoreに初期ユーザーデータを作成
            const userDocRef = doc(db, `artifacts/${appId}/users/${userCredential.user.uid}/profile/${userCredential.user.uid}`);
            await setDoc(userDocRef, { badgeType: 'none', selfIntro: '' }); // 初期バッジは'none'
            return { success: true };
        } catch (error) {
            console.error("Sign up failed:", error.message);
            return { success: false, error: error.message };
        }
    };

    // ユーザーをサインアウト
    const signOutUser = async () => {
        try {
            await signOut(auth);
            window.location.pathname = '/auth'; // ログアウト後に認証ページへリダイレクト
        } catch (error) {
            console.error("Sign out failed:", error.message);
        }
    };

    // ユーザーの権限を取得する関数（簡易的なロール判定）
    const getUserRoles = useCallback(() => {
        if (!currentUser) return {};
        const roles = {};
        // バッジタイプに基づいて簡易的なロールを付与
        if (currentUser.badgeType === 'official' || currentUser.badgeType === 'company') {
            roles.admin = true;
            roles.developer = true;
            roles.creator = true;
            roles.operator = true;
        } else if (currentUser.badgeType === 'education') {
            roles.developer = true;
            roles.creator = true;
        } else if (currentUser.badgeType === 'common') {
            roles.creator = true;
        }
        return roles;
    }, [currentUser]);

    const value = {
        currentUser,
        isAuthReady,
        signIn,
        signUp,
        signOutUser,
        getUserRoles,
        db // FirestoreインスタンスをContext経由で提供
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext); // 他のコンポーネントからAuthContextを利用するためのカスタムフック
