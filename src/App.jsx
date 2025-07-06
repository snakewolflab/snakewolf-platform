import React from 'react';
// 以下のインポートは、実際のファイル分割環境で必要になりますが、
// この概念的な単一ファイル構造ではグローバルにアクセス可能であると仮定します。
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { PlatformPage } from './pages/PlatformPage';
import { SettingsPage } from './pages/SettingPage';
import { AccountSettingsPage } from './pages/setting/AccountSettingPage';
import { EmailSettingsPage } from './pages/setting/EmailSettingPage';
import { SecuritySettingsPage } from './pages/setting/SecuritySettingPage';
import { PairSettingsPage } from './pages/setting/PairSettingPage';
import { LinkSettingsPage } from './pages/setting/LinkSettingPage';
import { PrivacySettingsPage } from './pages/setting/PrivacySettingPage';
import { QAHCPage } from './pages/QAHCPage';
import { AdminPage } from './pages/AdminPage';
import { DeveloperPage } from './pages/DeveloperPage';
import { CreatorPage } from './pages/CreatorPage';
import { SupportPage } from './pages/SupportPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage'

function App() {
    const path = window.location.pathname;

    let content;
    switch (path) {
        case '/':
            content = <HomePage />;
            break;
        case '/auth':
            content = <AuthPage />;
            break;
        case '/dashboard':
            content = <PrivateRoute><DashboardPage /></PrivateRoute>;
            break;
        case '/profile':
            content = <PrivateRoute><ProfilePage /></PrivateRoute>;
            break;
        case '/platform':
            content = <PrivateRoute><PlatformPage /></PrivateRoute>;
            break;
        case '/settings':
            content = <PrivateRoute><SettingsPage /></PrivateRoute>;
            break;
        case '/settings/account':
            content = <PrivateRoute><AccountSettingsPage /></PrivateRoute>;
            break;
        case '/settings/mail':
            content = <PrivateRoute><EmailSettingsPage /></PrivateRoute>;
            break;
        case '/settings/security':
            content = <PrivateRoute><SecuritySettingsPage /></PrivateRoute>;
            break;
        case '/settings/pair':
            content = <PrivateRoute><PairSettingsPage /></PrivateRoute>;
            break;
        case '/settings/link':
            content = <PrivateRoute><LinkSettingsPage /></PrivateRoute>;
            break;
        case '/settings/privacy':
            content = <PrivateRoute><PrivacySettingsPage /></PrivateRoute>;
            break;
        case '/qa-help':
            content = <PrivateRoute><QAHCPage /></PrivateRoute>;
            break;
        case '/admin':
            content = <PrivateRoute><AdminPage /></PrivateRoute>;
            break;
        case '/developer':
            content = <PrivateRoute><DeveloperPage /></PrivateRoute>;
            break;
        case '/creator':
            content = <PrivateRoute><CreatorPage /></PrivateRoute>;
            break;
        case '/support':
            content = <PrivateRoute><SupportPage /></PrivateRoute>;
            break;
        default:
            content = <NotFoundPage />;
            break;
    }

    // パスが'/'の場合にp-0を適用し、それ以外の場合はp-4を適用する
    const dynamicPaddingClass = path === '/' ? 'p-0' : 'pt-4 pl-4 pr-4 pb-0';

    return (
        // アプリケーション全体に適用されるスタイル調整の例
        // ここでは、全体の表示領域にわずかなパディングと丸み、影を追加しています。
        // 通常、これらのグローバルなスタイルはindex.cssまたは最上位のLayoutコンポーネントで管理されますが、
        // App.jsxの直接的な変更を示すために、このラッパーを追加しています。
        <div className={`min-h-screen ${dynamicPaddingClass} bg-transparent`}> {/* 背景は透過にしてLayoutの背景を活かす */}
            <div className="h-full w-full rounded-lg shadow-xl overflow-hidden">
                <AuthProvider>
                    {content}
                </AuthProvider>
            </div>
        </div>
    );
}

export default App;
