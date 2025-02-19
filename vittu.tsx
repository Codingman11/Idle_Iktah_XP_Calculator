const [universalXPData, setUniversalXPData] = useState<UniversalXPData[]>([]);
const [selectedLevel, setSelectedLevel] = useState<number>(1);
const [targetXP, setTargetXP] = useState<number>(0);
const [result, setResult] = useState<string>('');

useEffect(() => {
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('universal_xp')
      .select('*');

    if (error) {
      console.error("Error fetching data: ", error);
    } else { 
      setUniversalXPData(data);
    }

    console.log(data);
  };
  fetchData();
}, []);

const calculateXP = () => {
  const selectedData = universalXPData.find(data => data.level === selectedLevel);
  if (!selectedData) return;

  const xpNeeded = targetXP - selectedData.total_xp;
  const levelsNeeded = Math.ceil(xpNeeded / selectedData.xp_to_next_level);

  setResult(`Levels needed to reach ${targetXP} XP: ${levelsNeeded}`);
};

console.log(universalXPData);

import { createClient} from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

interface UniversalXPData {
  level: number;
  total_xp: number;
  xp_to_next_level: number;
}

const supabase = createClient(supabaseUrl, supabaseKey);