import React from 'react'; // トップレベルでインポート済み
import { AuthPage } from './pages/AuthPage';
import { PrivateRoute } from './components/PrivateRoute';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { PlatformPage } from './pages/PlatformPage';
import { SettingsPage } from './pages/SettingPage';
import { QAHCPage } from './pages/QAHCPage';
import { AdminPage } from './pages/AdminPage';
import { DeveloperPage } from './pages/DeveloperPage';
import { CreatorPage } from './pages/CreatorPage';
import { SupportPage } from './pages/SupportPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';

function App() {
    const path = window.location.pathname;

    let content;
    switch (path) {
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

    return (
        <AuthProvider>
            {content}
        </AuthProvider>
    );
}

// Appコンポーネントをデフォルトエクスポート
export default App;