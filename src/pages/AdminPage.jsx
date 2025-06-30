// import React from 'react'; // トップレベルでインポート済み
// useAuthは上で定義されているため、ここではimportはしません。

export function AdminPage() {
    const { currentUser } = useAuth();
    return (
        <Layout>
            <div className="p-6 bg-[#2c2f33] rounded-lg shadow-xl min-h-[calc(100vh-64px-48px)]">
                <h2 className="text-3xl font-bold mb-6 text-red-400">管理者ポータル</h2>
                <p className="text-lg text-gray-300">
                    {currentUser ? `${currentUser.email}さん、` : 'ゲストさん、'}
                    ここは管理者のみがアクセスできるページです。ユーザー管理やシステム設定を行います。
                </p>
                <div className="mt-4 bg-[#36393f] p-4 rounded-md">
                    <h3 className="text-xl font-semibold mb-2">ユーザー管理</h3>
                    <p className="text-gray-400">ユーザー情報の閲覧、編集、権限変更。</p>
                    <p className="text-sm text-red-300 mt-2">（現在のバッジタイプ: {currentUser?.badgeType || 'N/A'}）</p>
                </div>
            </div>
        </Layout>
    );
}