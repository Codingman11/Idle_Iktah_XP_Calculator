import {createContext, useContext, ReactNode, useState} from 'react';

interface ExperienceData {
    level: number;
    TotalXP: number;
    XpToNextLevel: number;
}

interface ExperienceDataContextType {
    expData: ExperienceData[];
    currentLevel: number;
    targetLevel: number;
    expRequired: number;
    currentExp: number;
    updateLevels: (current: number, currentExp: number , target: number, exp: number) => void;
}

const LevelDataContext = createContext<ExperienceDataContextType | undefined>({
    expData: [],
    currentLevel: 0,
    currentExp: 0,
    targetLevel: 0,
    expRequired: 0,
    updateLevels: function (current: number, currentExp: number, target: number, targetExp: number): void {
        throw new Error('Function not implemented.');
    }
});

export const useExperienceData = () => {
    const context = useContext(LevelDataContext);

    if (context === undefined) {
        throw new Error("useLevelData must be used within a LevelDataProvider");
    }   
    return context;
}
export const LevelDataProvider = ({
    children,
    expData
  }: {
    children: ReactNode;
    expData: ExperienceData[];
  }) => {
    const [currentLevel, setCurrentLevel] = useState<number | string>("");
    const [targetLevel, setTargetLevel] = useState<number>(2);
    const [expRequired, setExpRequired] = useState<number>(0);
    const [currentExp, setCurrentExp] = useState<number | string>("");
    const updateLevels = (current: number, currentExp: number, target: number, targetExp: number) => {
      setCurrentLevel(current);
      setCurrentExp(currentExp);
      setTargetLevel(target);
      setExpRequired(targetExp);
    };
  
    return (
      <LevelDataContext.Provider value={{ expData, currentLevel, currentExp: Number(currentExp), targetLevel, expRequired, updateLevels }}>
        {children}
      </LevelDataContext.Provider>
    );
  };