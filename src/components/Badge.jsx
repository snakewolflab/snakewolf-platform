import React from 'react';

export function Badge({ badgeType }) {
    /* if (!badgeType || badgeType === 'none') {
        return null;
    } */

    const badgeImages = {
        common: "",
        official: "",
        education: "",
        company: ""
    };

    const altText = `${badgeType} バッジ`;

    return (
        // tooltip-005 クラスを持つdivは、ツールチップのスタイルを提供すると仮定します。
        <div className="tooltip-005">
            {/* バッジ画像 */}
            <img
                src={badgeType === "common" ? "/batch/common.png" :
                    badgeType === "official" ? "/batch/official.png" :
                        badgeType === "education" ? "/batch/education.png" :
                            badgeType === "company" ? "/batch/company.png" :
                                "/batch/none.png"}
                alt={altText}
                className="w-5 h-5 rounded-full inline-block ml-2 align-middle"
            />
            {/* バッジの説明テキストを<span>タグに変更 */}
            <span className="text-sm text-gray-400 ml-2"> {/* 必要に応じてスタイルを追加 */}
                {badgeType === "common" ? "認証済みアカウント" :
                    badgeType === "official" ? "公式アカウント" :
                        badgeType === "education" ? "教育機関アカウント" :
                            badgeType === "company" ? "企業アカウント" :
                                "認証されていません"}
            </span>
        </div>
    );
}
