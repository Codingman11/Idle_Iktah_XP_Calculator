import { UniversalProps } from "@/types";
import BasicInfo from "./BasicInfo/BasicInfo";
import { LevelDataProvider } from "@/context/LevelDataContext";



export default function HomeSkill({ expData }: UniversalProps) {
  return (
    <LevelDataProvider expData={expData}>
      <div className="text-center text-black p-4">
        <BasicInfo name="Home"/>
      </div>
    </LevelDataProvider>
  );
}