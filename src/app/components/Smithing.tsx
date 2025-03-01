import BasicInfo from "@/components/BasicInfo/BasicInfo";
import { LevelDataProvider } from "@/context/LevelDataContext";
import { UniversalProps } from "@/types";

export default function Smithing({ expData }: UniversalProps) {
 
  return (
    <LevelDataProvider expData={expData}>
      <div className="text-center text-black p-4">
        <BasicInfo name="Smithing" />
      </div>
    </LevelDataProvider>
  );
}