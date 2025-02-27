import { supabase } from '@/backend/supabaseClient';


export interface ExperienceData {
    level: number;
    TotalXP: number;
    XpToNextLevel: number;
}

export const fetchLevelData = async (): Promise<ExperienceData[]> => {
    const { data, error } = await supabase
        .from('universal_xp')
        .select('level, TotalXP, XpToNextLevel');

    if (error) {
        console.error("Error fetching level data:", error);
        return [];
    }

    return data.map((item: {level: number, TotalXP: number, XpToNextLevel: number}) => ({
        level: item.level,
        TotalXP: item.TotalXP,
        XpToNextLevel: item.XpToNextLevel
    }));
}

