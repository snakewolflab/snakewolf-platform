import React, { useState, useEffect } from 'react'; // useStateとuseEffectを追加
// 以下のインポートは、実際のファイル分割環境で必要になります。
import { useAuth } from '../context/AuthContext';
import {
    FaHome, FaUser, FaPlayCircle, FaCog, FaCrown, FaCode, FaMicrophoneAlt, FaLifeRing, FaQuestionCircle, FaSignOutAlt
} from 'react-icons/fa'; // Skypack CDNから直接インポート

export function SideBar() {
    // useAuthはAuthContext.jsxでエクスポートされており、この概念的な単一ファイル構造では
    // グローバルにアクセス可能であると仮定します。
    const { currentUser, signOutUser, getUserRoles } = useAuth();
    const userRoles = getUserRoles();
    const currentPath = window.location.pathname;

    // アイコンの読み込み状態を管理するstate
    const [iconsLoaded, setIconsLoaded] = useState(false);

    // アイコンが読み込まれたことをシミュレートするuseEffect
    // 実際のアプリケーションでは、フォントやSVGのロードイベントを監視することが望ましいですが、
    // ここでは簡略化のためタイマーを使用します。
    useEffect(() => {
        const timer = setTimeout(() => {
            setIconsLoaded(true);
        }, 300); // 例えば300ms後にアイコンがロードされたと仮定

        return () => clearTimeout(timer);
    }, []);

    const navItems = [
        { path: '/dashboard', icon: FaHome, label: 'ダッシュボード' },
        { path: '/profile', icon: FaUser, label: 'プロフィール' },
        { path: '/platform', icon: FaPlayCircle, label: '配信プラットフォーム' },
        { path: '/settings', icon: FaCog, label: '設定' },
        { path: '/qa-help', icon: FaQuestionCircle, label: 'Q&A/ヘルプ' },
    ];

    const portalItems = [
        { path: '/admin', icon: FaCrown, label: '管理者ポータル', roles: ['admin'] },
        { path: '/developer', icon: FaCode, label: 'デベロッパーポータル', roles: ['developer'] },
        { path: '/creator', icon: FaMicrophoneAlt, label: '配信者ポータル', roles: ['creator'] },
        { path: '/support', icon: FaLifeRing, label: 'サポートセンターポータル', roles: ['operator'] },
    ];

    const isPathActive = (path) => currentPath === path ? 'bg-indigo-600/50' : 'hover:bg-gray-700';

    return (
        <div className="flex flex-col bg-[#202225] w-20 min-h-screen py-4 items-center shadow-lg rounded-r-xl">
            <div className="text-white text-2xl font-bold mb-8">
                SW
            </div>
            {navItems.map((item) => (
                <a
                    key={item.path}
                    href={item.path}
                    className={`relative flex items-center justify-center w-14 h-14 my-2 rounded-full transition-colors duration-200 ${isPathActive(item.path)} group`}
                >
                    {/* アイコンがロードされるまで、またはロード中にフォールバックを表示 */}
                    {iconsLoaded ? <item.icon className="text-white text-2xl" /> : <div className="w-6 h-6 bg-gray-600 rounded-full animate-pulse"></div>}
                    <span className="absolute left-full ml-4 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        {item.label}
                    </span>
                </a>
            ))}

            {currentUser && (
                <div className="border-t border-gray-700 w-full my-4 pt-4 flex flex-col items-center">
                    {portalItems.map((item) => (
                        item.roles.some(role => userRoles[role]) && (
                            <a
                                key={item.path}
                                href={item.path}
                                className={`relative flex items-center justify-center w-14 h-14 my-2 rounded-full transition-colors duration-200 ${isPathActive(item.path)} group`}
                            >
                                {/* アイコンがロードされるまで、またはロード中にフォールバックを表示 */}
                                {iconsLoaded ? <item.icon className="text-white text-2xl" /> : <div className="w-6 h-6 bg-gray-600 rounded-full animate-pulse"></div>}
                                <span className="absolute left-full ml-4 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                                    {item.label}
                                </span>
                            </a>
                        )
                    ))}
                     <button
                        onClick={signOutUser}
                        className="relative flex items-center justify-center w-14 h-14 my-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 group"
                    >
                        {/* ログアウトアイコンにも同様の処理を適用 */}
                        {iconsLoaded ? <FaSignOutAlt className="text-2xl" /> : <div className="w-6 h-6 bg-gray-600 rounded-full animate-pulse"></div>}
                        <span className="absolute left-full ml-4 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            ログアウト
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}
