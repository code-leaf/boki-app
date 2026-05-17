'use client';

import { FinalScore } from '@/components/FinalScore';
import { executionLimitCountAtom } from '@/store/ExecutionMode';
import { SetStateAction, useEffect, useState } from 'react';
import { useAtom } from 'jotai';

type GameEndHandlerProps = {
  totalQuestions: number;
  result: boolean | undefined;
  setTotalQuestions: (value: SetStateAction<number>) => void;
  setScore: (value: SetStateAction<number>) => void;
  score: number;
  children: React.ReactNode;
};

export const GameEndHandler = ({
  totalQuestions,
  result,
  setTotalQuestions,
  setScore,
  score,
  children,
}: GameEndHandlerProps) => {
  // 実行制限回数の状態を管理
  const [executionLimitCount, setExecutionLimitCount] = useAtom(
    executionLimitCountAtom
  );

  // ゲーム終了状態を管理
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  // 総問題数が変更されたときの処理
  useEffect(() => {
    if (totalQuestions === executionLimitCount && result === undefined) {
      handleGameEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalQuestions, result]);

  // ゲーム終了時の処理
  const handleGameEnd = () => {
    setGameEnded(true);
  };

  // ゲームを再スタートする処理
  const handleRestart = () => {
    setGameEnded(false);
    setTotalQuestions(0);
    setScore(0);
  };

  //  ゲーム終了時の処理
  if (gameEnded) {
    return (
      <FinalScore
        score={score}
        totalQuestions={totalQuestions}
        onRestart={handleRestart}
      />
    );
  }

  return <>{children}</>;
};
