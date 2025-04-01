import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {ScrollView} from 'react-native';
import Header from '../components/common/Header';
import CountdownTimer from '../components/timer/CountdownTimer';
import {useRoute, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FolderPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {folder} = route.params || {};
  const [timers, setTimers] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadFolderTimers = async () => {
        try {
          const storedTimersString = await AsyncStorage.getItem('timers');
          if (storedTimersString) {
            const parsedTimers = JSON.parse(storedTimersString);
            const folderTimers = parsedTimers.filter(
              timer => timer.folderId === folder.id,
            );
            setTimers(folderTimers);
          } else {
            setTimers([]);
          }
        } catch (error) {
          console.error('타이머 로드 실패:', error);
          setTimers([]);
        }
      };

      if (folder) {
        loadFolderTimers();
      }
    }, [folder]),
  );

  const handleTimerClick = async clickedTimer => {
    try {
      const storedTimersString = await AsyncStorage.getItem('timers');
      if (storedTimersString) {
        const parsedTimers = JSON.parse(storedTimersString);
        const updatedTimers = [...parsedTimers];
        const timerIndex = updatedTimers.findIndex(
          t => t.id === clickedTimer.id,
        );
        if (timerIndex > -1) {
          const [timer] = updatedTimers.splice(timerIndex, 1);
          updatedTimers.unshift(timer);
          await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));

          // 현재 폴더의 타이머만 다시 불러옴
          const folderTimers = updatedTimers.filter(
            timer => timer.folderId === folder.id,
          );
          setTimers(folderTimers);
        }
      }
    } catch (error) {
      console.error('타이머 순서 업데이트 실패:', error);
    }
  };

  return (
    <FolderContainer>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Header
          type="folder"
          title={folder?.folderName}
          icon={folder?.icon}
          folderId={folder?.id}
          folder={folder}
        />
        <TimersContainer>
          {timers.length > 0 ? (
            timers.map((timer, index) => (
              <TimerWrapper key={index}>
                <CountdownTimer timer={timer} onTimerClick={handleTimerClick} />
              </TimerWrapper>
            ))
          ) : (
            <EmptyView>
              <EmptyText>폴더에 타이머가 없습니다</EmptyText>
            </EmptyView>
          )}
        </TimersContainer>
      </ScrollView>
    </FolderContainer>
  );
};

export default FolderPage;

const FolderContainer = styled.View`
  flex-direction: column;
  height: 100%;
`;

const TimersContainer = styled.View`
  flex-direction: row;
  gap: ${scale(26)}px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: ${scale(20)}px;
`;

const TimerWrapper = styled.View``;

const EmptyView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: ${scale(100)}px;
`;

const EmptyText = styled.Text`
  font-size: ${scale(16)}px;
  color: #888;
`;
