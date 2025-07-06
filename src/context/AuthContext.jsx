import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

// =====================================================================
// 実際のファイル分割環境では、以下の行でFirebaseインスタンスをインポートします。
import { auth, db, appId } from '../firebase';
//
// Canvas環境の制約により、auth, db, appId はこのコードブロックの外部（概念的な
// src/firebase.js）で初期化され、グローバルに利用可能であると仮定します。
// =====================================================================

// AuthContextの定義
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false); // 認証状態の初期化が完了したかを示すフラグ

    useEffect(() => {
        // Firebase認証状態の変更を監視
        // このリスナーはコンポーネントのマウント時に一度だけ設定されるべきです。
        // onAuthStateChangedは認証状態の変化を自動的に検知し、コールバックを実行します。
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                // ユーザーデータ（バッジタイプ、自己紹介、そして新しい'role'）をFirestoreから取得または初期設定
                const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile/${user.uid}`);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    // 既存のユーザーデータがある場合、それをcurrentUserにマージ
                    setCurrentUser(prev => ({ ...prev, ...userDocSnap.data() }));
                } else {
                    // 新規ユーザーの場合、またはデータがない場合は初期データを設定
                    // ここでデフォルトの'role'を'common'として設定します
                    await setDoc(userDocRef, { badgeType: 'none', selfIntro: '', role: 'common' }, { merge: true });
                    setCurrentUser(prev => ({ ...prev, badgeType: 'none', selfIntro: '', role: 'common' }));
                }
            } else {
                // ユーザーがログアウトした場合
                setCurrentUser(null);
                console.log("User signed out.");
            }
            setIsAuthReady(true); // 認証状態の初期化が完了
        });

        // Canvas環境の__initial_auth_tokenを自動的に使用してサインインを試みる
        // このロジックもコンポーネントのマウント時に一度だけ実行されるべきです。
        // onAuthStateChangedの初期コールバックが完了する前に実行される可能性があります。
        // onAuthStateChangedがユーザーを検出しない場合にのみ試行します。
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
        if (initialAuthToken) { // currentUserに依存しない
            // onAuthStateChangedが初期状態を報告するのを待ってからカスタムトークンを試すのがより安全ですが、
            // ここではシンプルにコンポーネントマウント時に一度だけ試行します。
            // Firebaseの内部で重複ログインは適切に処理されます。
            signInWithCustomToken(auth, initialAuthToken)
                .then(() => console.log("Signed in with custom token."))
                .catch(error => {
                    console.error("Custom token sign-in failed:", error);
                    // 匿名サインインは無効化されているため、ここでは何もしません。
                    // ユーザーは明示的にサインインする必要があります。
                });
        } else {
            console.log("No custom token available. User needs to sign in manually.");
        }

        return () => unsubscribe(); // コンポーネントのアンマウント時にリスナーを解除
    }, []); // 依存配列を空にする: コンポーネントのマウント時に一度だけ実行

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
            // 新規登録時にデフォルトの'role'を'common'として設定します
            await setDoc(doc(db, `artifacts/${appId}/users/${userCredential.user.uid}/profile/${userCredential.user.uid}`), {
                badgeType: 'none',
                selfIntro: '',
                role: 'common' // 新しくroleフィールドを追加
            });
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

    // ユーザーの権限を取得する関数（新しい'role'フィールドに基づいて判定）
    const getUserRoles = useCallback(() => {
        if (!currentUser || !currentUser.role) return { user: true }; // ロールが設定されていない場合はデフォルトで'user'権限
        const roles = { user: true }; // すべての認証済みユーザーは'user'権限を持つ

        switch (currentUser.role) {
            case 'admin':
                roles.admin = true;
                roles.developer = true;
                roles.creator = true;
                roles.operator = true;
                break;
            case 'developer':
                roles.developer = true;
                roles.creator = true;
                break;
            case 'creator':
                roles.creator = true;
                break;
            case 'operator':
                roles.operator = true;
                break;
            case 'common':
                // 'common'ロールはデフォルトの'user'権限のみ
                break;
            default:
                // 未知のロールの場合もデフォルトで'user'権限
                break;
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
