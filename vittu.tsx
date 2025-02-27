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


export default function Universal() {
  const [levelData, setLevelData] = useState<LevelData[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(2);
  const [xpRequired, setXpRequired] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("universal_xp")
        .select("level, TotalXP, XpToNextLevel");
      if (error) {
        setError(error);
      } else {
        console.log("Fetched data:", data);
        setLevelData(data.map((item: any) => ({
          Level: item.level,
          TotalXP: item.TotalXP,
          XpToNextLevel: item.XpToNextLevel
        })));
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const calculateXP = () => {
    const currentLevelData = levelData.find((level) => level.Level === currentLevel);
    const targetLevelData = levelData.find((level) => level.Level === targetLevel);

    console.log(currentLevelData, targetLevelData);
    if (currentLevelData && targetLevelData) {
      
      setXpRequired(targetLevelData.TotalXP - currentLevelData.TotalXP);
    } else {
      setXpRequired(-1);
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="text-center text-black">
      <h2>Universal XP Calculator</h2>
      <div>
        <label>
          Current Level:
          <input
            type="number"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(Number(e.target.value))}
          />
        </label>
        <label>
          Target Level:
          <input 
            type="number"
            value={targetLevel}
            onChange={(e) => setTargetLevel(Number(e.target.value))}
          />
        </label>
        <button onClick={calculateXP}>Calculate XP</button>
      </div>
      {xpRequired !== null && (<div>XP Required: {xpRequired}</div>)}
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Total XP</th>
            <th>XP to Next Level</th>
          </tr>
        </thead>
        <tbody>
          {levelData.map((level) => (
            <tr key={level.Level}>
              <td>{level.Level}</td>
              <td>{level.TotalXP}</td>
              <td>{level.XpToNextLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <BasicInfo /> */}
    </div>
  
);


}



return ( <div className="mb-4">
  <label className="block mb-2">Select Tree:</label>
  <select
    value={selectedTree.name}
    onChange={(e) => setSelectedTree(treeOptions.find(tree => tree.name === e.target.value)!)}
    className="w-full p-2 border border-gray-300 rounded"
  >
    {treeOptions.map((tree) => (
      <option key={tree.name} value={tree.name}>
        {tree.name}
      </option>
    ))}
  </select>
</div>
<div className="mb-4">
  <label className="block mb-2">Select Equipments:</label>
  {equipmentOptions.map((equipment) => (
    <div key={equipment.name} className="flex items-center mb-2">
      <input
        type="checkbox"
        id={equipment.name}
        checked={selectedEquipments.includes(equipment.name)}
        onChange={() => handleEquipmentChange(equipment.name)}
        className="mr-2"
      />
      <label htmlFor={equipment.name}>{equipment.name}</label>
    </div>
  ))}
</div>
<div className="mt-4">
  <h3 className="text-xl font-bold">Results</h3>
  <p>Base Duration: {selectedTree.time} seconds</p>
  <p>Calculated Duration: {calculateDuration().toFixed(2)} seconds</p>
  <p>XP per Hour: {(selectedTree.xp / calculateDuration() * 3600).toFixed(2)}</p>
</div>)




