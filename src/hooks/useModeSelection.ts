import {
  executionLimitCountAtom,
  executionModeTypeAtom,
} from '@/store/ExecutionMode';
import { useAtom } from 'jotai';

type MODE = 'unlimited' | 'limited';

export const useModeSelection = () => {
  const [selectedMode, setSelectedMode] = useAtom<MODE>(
    executionModeTypeAtom
  );
  const [rounds, setRounds] = useAtom<number>(executionLimitCountAtom);

  // モードの変更
  const handleModeSelect = (mode: MODE) => {
    setSelectedMode(mode);
  };

  // 回数指定モードの回数変更
  const handleRoundschange = (increment: number) => {
    setRounds((prev) => Math.max(5, prev + increment));
  };
  return { handleModeSelect, selectedMode, handleRoundschange, rounds };
};
