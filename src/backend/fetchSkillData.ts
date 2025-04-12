import { supabase } from '@/backend/supabaseClient';

export interface SkillsData {
    id: number;
    name: string;
}


export const fetchSkillsData = async (): Promise<SkillsData[]> => {
    const { data, error } = await supabase
        .from('skills')
        .select('id, name');

    if (error) {
        console.error("Error fetching level data:", error);
        return [];
    }

    return data.map((item: {id: number, name: string}) => ({
        id: item.id,
        name: item.name,
    }));
}