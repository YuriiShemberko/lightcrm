export type CallFinishData = {
  contactId: number;
  result: 'answered' | 'no_answer' | 'busy';
  durationSec: number;
  callbackAt?: string | null;
};

export const useCallFinish = () => {};
