import {create} from 'zustand';
// 해당 타이머 클릭 시 해당 타이머 불러오는 코드 추가 필요

const useTimerStore = create(set => ({
  time: {minutes: 3, seconds: 4},
  isRunning: false,
  intervalId: null,

  // 타이머 시작
  startTimer: () => {
    set(state => {
      if (state.isRunning) return {}; // 이미 실행 중이면 아무 동작하지 않음

      const intervalId = setInterval(() => {
        set(state => {
          const {minutes, seconds} = state.time;

          if (minutes === 0 && seconds === 0) {
            clearInterval(state.intervalId);
            return {
              time: {minutes: 3, seconds: 4},
              isRunning: false,
              intervalId: null,
            };
          }

          if (seconds === 0) {
            return {time: {minutes: minutes - 1, seconds: 59}};
          }

          return {time: {minutes, seconds: seconds - 1}};
        });
      }, 1000);

      return {isRunning: true, intervalId};
    });
  },

  // 타이머 정지
  stopTimer: () => {
    set(state => {
      clearInterval(state.intervalId);
      return {isRunning: false, intervalId: null};
    });
  },

  // 타이머 초기화
  resetTimer: () => {
    set(state => {
      clearInterval(state.intervalId);
      return {
        time: {minutes: 3, seconds: 4},
        isRunning: false,
        intervalId: null,
      };
    });
  },
}));

export default useTimerStore;
