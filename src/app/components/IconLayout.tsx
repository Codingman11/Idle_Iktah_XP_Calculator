import React from "react";
import { IconText } from "./IconText";


interface IconLayoutProps {
    setSelectedTab: (tab: string) => void;
}
const iconData = [
    { iconSrc: '/icons/universal.png', text: 'Universal', tab: 'universal' },
    { iconSrc: '/icons/home.png', text: 'Home', tab: 'home' },
    { iconSrc: '/icons/carpentry.png', text: 'Carpentry', tab: 'carpentry' },
    { iconSrc: '/icons/enchanting.png', text: 'Enchanting', tab: 'enchanting' },
    { iconSrc: '/icons/community.png', text: 'Community', tab: 'community' },
    { iconSrc: '/icons/crafting.png', text: 'Crafting', tab: 'crafting' },
    { iconSrc: '/icons/smithing.png', text: 'Smithing', tab: 'smithing' },
    { iconSrc: '/icons/cooking.png', text: 'Cooking', tab: 'cooking' },
    { iconSrc: '/icons/alchemy.png', text: 'Alchemy', tab: 'alchemy' },
    { iconSrc: '/icons/woodcutting.png', text: 'Woodcutting', tab: 'woodcutting' },
    { iconSrc: '/icons/mining.png', text: 'Mining', tab: 'mining' },
    { iconSrc: '/icons/fishing.png', text: 'Fishing', tab: 'fishing' },
    { iconSrc: '/icons/gathering.png', text: 'Gathering', tab: 'gathering' },
];


export const IconLayout: React.FC<IconLayoutProps> = ({ setSelectedTab }) => {
    return (
        <div className="flex flex-wrap justify-center space-x-4 p-4grid grid-cols-7 gap-4 p-4">
            {iconData.map((icon, index) => (
                <IconText key={index} iconSrc={icon.iconSrc} text={icon.text} onClick={() => setSelectedTab(icon.tab)} />
            ))}
        </div>
    )
}