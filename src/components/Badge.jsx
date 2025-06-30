import React from 'react'; // トップレベルでインポート済み

export function Badge({ badgeType }) {
    if (!badgeType || badgeType === 'none') {
        return null;
    }

    const badgeImages = {
        common: "https://placehold.co/24x24/60a5fa/ffffff?text=C",
        official: "https://placehold.co/24x24/a78bfa/ffffff?text=O",
        education: "https://placehold.co/24x24/fbbf24/ffffff?text=E",
        company: "https://placehold.co/24x24/f87171/ffffff?text=P"
    };

    const imageUrl = badgeImages[badgeType];
    const altText = `${badgeType} バッジ`;

    return (
        <img
            src={imageUrl}
            alt={altText}
            className="w-5 h-5 rounded-full inline-block ml-2 align-middle border-2 border-white"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/24x24/94a3b8/ffffff?text=?" }}
        />
    );
}
