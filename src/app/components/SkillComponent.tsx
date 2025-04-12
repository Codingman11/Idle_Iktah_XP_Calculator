import { UniversalProps } from "@/types";
import BasicInfo from "./BasicInfo/BasicInfo";
import { LevelDataProvider } from "@/context/LevelDataContext";

interface SkillComponentProps extends UniversalProps {
  name: string;
}

export default function SkillComponent({ expData, name }: SkillComponentProps) {
  return (
    <LevelDataProvider expData={expData}>
      <div className="text-center text-black p-4">
        <BasicInfo name={name} />
      </div>
    </LevelDataProvider>
  );
}