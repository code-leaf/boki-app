import { atom } from 'jotai';

export const executionModeTypeAtom = atom<'unlimited' | 'limited'>('unlimited');

export const executionLimitCountAtom = atom<number>(5);
