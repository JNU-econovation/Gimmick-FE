import {create} from 'zustand';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const useTimerStore = create(set => ({
  timers: {},

  initTimer: (timerId, initialMinutes, initialSeconds, detailTimerData, timerName) => {
    set(state => {
      // 이미 실행 중인 타이머는 건드리지 않음
      if (state.timers[timerId]?.isRunning) {
        return state;
      }

      // 이미 존재하는 타이머의 경우, 중지된 상태라면 시간만 업데이트
      if (state.timers[timerId]) {
        return {
          timers: {
            ...state.timers,
            [timerId]: {
              ...state.timers[timerId],
              time: {
                minutes: parseInt(initialMinutes),
                seconds: parseInt(initialSeconds),
              },
              totalTime: {
                minutes: parseInt(initialMinutes),
                seconds: parseInt(initialSeconds),
              },
              remainingTotalSeconds:
                parseInt(initialMinutes) * 60 + parseInt(initialSeconds),
            },
          },
        };
      }

      const defaultTimer = {
        minutes: initialMinutes,
        seconds: initialSeconds,
        fireData: '중불',
      };

      const timerData =
        detailTimerData && detailTimerData.length > 0
          ? detailTimerData[0]
          : defaultTimer;

      const totalSeconds =
        parseInt(initialMinutes) * 60 + parseInt(initialSeconds);

      return {
        timers: {
          ...state.timers,
          [timerId]: {
            time: {
              minutes: parseInt(timerData.minutes),
              seconds: parseInt(timerData.seconds),
            },
            timerName: timerName,
            currentStepIndex: 0,
            detailTimerData: detailTimerData || [defaultTimer],
            isRunning: false,
            intervalId: null,
            remainingTotalSeconds: totalSeconds,
            totalTime: {
              minutes: parseInt(initialMinutes),
              seconds: parseInt(initialSeconds),
            },
          },
        },
      };
    });
  },

  startTimer: timerId => {
    set(state => {
      const timer = state.timers[timerId];
      if (!timer || (timer.isRunning && timer.intervalId)) return state;

      // 현재 상태를 저장
      const currentState = {
        time: {...timer.time},
        remainingTotalSeconds: timer.remainingTotalSeconds,
        currentStepIndex: timer.currentStepIndex,
      };

      const intervalId = setInterval(() => {
        set(state => {
          const currentTimer = state.timers[timerId];
          if (!currentTimer) {
            clearInterval(intervalId);
            return state;
          }

          const {minutes, seconds} = currentTimer.time;
          const newRemainingTotalSeconds = Math.max(
            currentTimer.remainingTotalSeconds - 1,
            0,
          );

          if (minutes === 0 && seconds === 0) {
            PushNotificationIOS.addNotificationRequest({
              id: `timerComplete-${timerId}`,
              title: `COOKTIME`,
              body: `${currentTimer.timerName}의 ${
                currentTimer.currentStepIndex + 1
              }번째 타이머가 완료되었습니다!`,
              sound: 'default',
            });

            if (
              currentTimer.currentStepIndex <
              currentTimer.detailTimerData.length - 1
            ) {
              const nextIndex = currentTimer.currentStepIndex + 1;
              const nextStep = currentTimer.detailTimerData[nextIndex];

              return {
                timers: {
                  ...state.timers,
                  [timerId]: {
                    ...currentTimer,
                    currentStepIndex: nextIndex,
                    time: {
                      minutes: parseInt(nextStep.minutes),
                      seconds: parseInt(nextStep.seconds),
                    },
                    remainingTotalSeconds: newRemainingTotalSeconds,
                    totalTime: {
                      minutes: Math.floor(newRemainingTotalSeconds / 60),
                      seconds: newRemainingTotalSeconds % 60,
                    },
                  },
                },
              };
            } else {
              clearInterval(intervalId);
              const initialTotalSeconds = currentTimer.detailTimerData.reduce(
                (total, step) =>
                  total +
                  (parseInt(step.minutes) * 60 + parseInt(step.seconds)),
                0,
              );

              return {
                timers: {
                  ...state.timers,
                  [timerId]: {
                    ...currentTimer,
                    isRunning: false,
                    intervalId: null,
                    currentStepIndex: 0,
                    time: {
                      minutes: parseInt(
                        currentTimer.detailTimerData[0].minutes,
                      ),
                      seconds: parseInt(
                        currentTimer.detailTimerData[0].seconds,
                      ),
                    },
                    remainingTotalSeconds: initialTotalSeconds,
                    totalTime: {
                      minutes: Math.floor(initialTotalSeconds / 60),
                      seconds: initialTotalSeconds % 60,
                    },
                  },
                },
              };
            }
          }

          const newTime =
            seconds === 0
              ? {minutes: minutes - 1, seconds: 59}
              : {minutes, seconds: seconds - 1};

          return {
            timers: {
              ...state.timers,
              [timerId]: {
                ...currentTimer,
                time: newTime,
                remainingTotalSeconds: newRemainingTotalSeconds,
                totalTime: {
                  minutes: Math.floor(newRemainingTotalSeconds / 60),
                  seconds: newRemainingTotalSeconds % 60,
                },
              },
            },
          };
        });
      }, 1000);

      return {
        timers: {
          ...state.timers,
          [timerId]: {
            ...timer,
            isRunning: true,
            intervalId,
          },
        },
      };
    });
  },

  stopTimer: timerId => {
    set(state => {
      const timer = state.timers[timerId];
      if (!timer) return state;

      if (timer?.intervalId) {
        clearInterval(timer.intervalId);
      }

      // 현재 타이머의 상태를 유지하면서 실행만 중지
      return {
        timers: {
          ...state.timers,
          [timerId]: {
            ...timer,
            isRunning: false,
            intervalId: null,
            time: timer.time,
            remainingTotalSeconds: timer.remainingTotalSeconds,
            currentStepIndex: timer.currentStepIndex,
          },
        },
      };
    });
  },

  resetTimer: (timerId, initialMinutes, initialSeconds) => {
    set(state => {
      const timer = state.timers[timerId];
      if (timer?.intervalId) {
        clearInterval(timer.intervalId);
      }

      const firstStep = timer?.detailTimerData[0] || {
        minutes: initialMinutes,
        seconds: initialSeconds,
      };

      const totalSeconds =
        parseInt(initialMinutes) * 60 + parseInt(initialSeconds);

      return {
        timers: {
          ...state.timers,
          [timerId]: {
            ...timer,
            currentStepIndex: 0,
            time: {
              minutes: parseInt(firstStep.minutes),
              seconds: parseInt(firstStep.seconds),
            },
            isRunning: false,
            intervalId: null,
            remainingTotalSeconds: totalSeconds,
            totalTime: {
              minutes: parseInt(initialMinutes),
              seconds: parseInt(initialSeconds),
            },
          },
        },
      };
    });
  },
}));

export default useTimerStore;
