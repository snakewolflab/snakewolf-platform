import React from 'react';
import { HomepageLayout } from '../components/HomepageLayout';

// HomePageコンポーネント: SnakeWolf Platformの玄関口となるページ
// 画像全面に文字とボタンを配置し、上品なスタイルでダッシュボードへ誘導します。
export function HomePage() {
    return (
        <HomepageLayout>
            <div
                className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-4 font-inter text-white" // フォントをInterに設定し、デフォルトのテキスト色を白に
                style={{
                    // 背景画像の設定 (プレースホルダー画像を使用)
                    // 実際のアプリケーションでは、ここに適切なゲームやプラットフォームの背景画像を配置します。
                    // 例: `url('/path/to/your/snake-wolf-background.jpg')`
                    backgroundImage: `url('./wallpaper.png')`,
                    backgroundAttachment: 'fixed', // 背景画像を固定してスクロール時に視差効果を出す
                }}
            >
                {/* オーバーレイ: 背景画像を暗くしてテキストの視認性を高める (透明度を調整) */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* メインコンテンツ: 画像の上に直接配置される要素 */}
                <div className="relative z-10 text-center flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto">
                    {/* タイトル: プラットフォーム名を目立たせる */}
                    <h1
                        className="text-6xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400 drop-shadow-lg"
                    >
                        SnakeWolf Platform
                    </h1>

                    {/* サブタイトル/キャッチフレーズ: 歓迎のメッセージ */}
                    <p
                        className="text-2xl md:text-3xl mb-10 font-semibold text-gray-100 drop-shadow-md"
                    >
                        あなたの冒険が、いまここから始まる。
                    </p>

                    {/* アクションボタン: ダッシュボードへの遷移を促す */}
                    <button
                        className="bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-bold py-4 px-10 rounded-full text-2xl shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-600 focus:ring-opacity-75"
                        onClick={() => {
                            // ダッシュボードへの遷移ロジック
                            window.location.pathname = '/dashboard';
                        }}
                    >
                        <span className="flex items-center justify-center">
                            {/* シンプルなアイコン */}
                            <svg
                                className="w-7 h-7 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                            ダッシュボードへ
                        </span>
                    </button>
                </div>

                {/* フッター: 画面下部に固定 */}
                <footer className="absolute bottom-0 w-full p-4 text-center text-gray-300 bg-black bg-opacity-40">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} SnakeWolf Platform. All rights reserved. | <a href="https://snakewolf.com/tos.html" target="_blank" rel="noopener noreferrer">利用規約</a> | <a href="https://snakewolf.com/privacy.html" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a> | <a href="https://snakewolf.com" target="_blank" rel="noopener noreferrer">ホームページ</a>
                    </p>
                </footer>

                {/* 遊び心のある要素 (控えめに、上品さを保つ) */}
                <div className="absolute top-[15%] left-[10%] text-6xl opacity-30 animate-float-subtle">🐍</div>
                <div className="absolute bottom-[20%] right-[12%] text-6xl opacity-30 animate-float-subtle">🐺</div>
                <div className="absolute top-[20%] right-[12%] text-6xl opacity-30 animate-float-subtle">🐍</div>
                <div className="absolute bottom-[15%] left-[10%] text-6xl opacity-30 animate-float-subtle">🐺</div>
            </div>
        </HomepageLayout >
    );
}
