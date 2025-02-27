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
    updateLevels: (current: number, target: number, exp: number) => void;
}

const LevelDataContext = createContext<ExperienceDataContextType | undefined>({
    expData: [],
    currentLevel: 0,
    targetLevel: 0,
    expRequired: 0,
    updateLevels: function (current: number, target: number, exp: number): void {
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
export const experienceDataProvider = ({
    children,
    expData
}: {
    children: ReactNode;
    expData: ExperienceData[];
}) => {
    const [currentLevel, setCurrentLevel] = useState<number>(1);
    const [targetLevel, setTargetLevel] = useState<number>(2);
    const [expRequired, setExpRequired] = useState<number>(0);

    const updateLevels = (current: number, target: number, exp: number) => {
        setCurrentLevel(current);
        setTargetLevel(target);
        setExpRequired(exp);
    };
    
    return (
        <LevelDataContext.Provider 
        value={{ 
          expData, 
          currentLevel, 
          targetLevel, 
          expRequired, 
          updateLevels 
        }}
      >
        {children}
      </LevelDataContext.Provider>
    );
};