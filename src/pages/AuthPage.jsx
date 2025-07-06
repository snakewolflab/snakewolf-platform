import React, { useState, useEffect } from 'react';
// 以下のインポートは、実際のファイル分割環境で必要になります。
import { useAuth } from '../context/AuthContext';

export function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // useAuthはAuthContext.jsxでエクスポートされており、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
    const { signIn, signUp, currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            window.location.pathname = '/dashboard';
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        let result;
        if (isLogin) {
            result = await signIn(email, password);
        } else {
            result = await signUp(email, password);
        }

        if (!result.success) {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#262a2f] text-[#fdfcfd]">
            <div className="bg-[#2c2f33] p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-[#fdfcfd]">SnakeWolfPlatform</h1>
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`px-6 py-2 rounded-l-md font-semibold transition-all duration-200 ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        ログイン
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`px-6 py-2 rounded-r-md font-semibold transition-all duration-200 ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        新規登録
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">メールアドレス</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">パスワード</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-md bg-[#36393f] text-[#fdfcfd] border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-bold transition-colors duration-200"
                    >
                        {isLogin ? 'ログイン' : '新規登録'}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-400 mt-6">
                    <a href="#" className="hover:underline">パスワードを忘れた場合</a>
                </p>
            </div>
        </div>
    );
}
