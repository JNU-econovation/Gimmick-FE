import styled from 'styled-components/native';
import React, {useState, useEffect} from 'react';
import {scale} from 'react-native-size-matters';
import {ScrollView} from 'react-native';
import Header from '../components/common/Header';
import CountdownTimer from '../components/timer/CountdownTimer';
import CountdownFolder from '../components/timer/CountdownFolder';
import {useFocusEffect} from '@react-navigation/native';
import initialMockData from '../data/initialMockData';
import {checkFirstUser} from '../utils/checkFirstUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUiStore from '../store/uiStore';

const MainPage = ({route}) => {
  const isDeleteMode = useUiStore(state => state.isDeleteMode);
  const setDeleteMode = useUiStore(state => state.setDeleteMode);
  const [items, setItems] = useState([]);

  const loadData = async () => {
    try {
      const storedTimersString = await AsyncStorage.getItem('timers');
      const storedFoldersString = await AsyncStorage.getItem('folders');

      let combinedItems = [];

      // 타이머 데이터 추가
      if (storedTimersString) {
        const parsedTimers = JSON.parse(storedTimersString);
        const standaloneTimers = parsedTimers
          .filter(timer => !timer.folderId)
          .map(timer => ({
            ...timer,
            type: 'timer',
          }));
        combinedItems = [...standaloneTimers];
      }

      // 폴더 데이터 추가
      if (storedFoldersString) {
        const parsedFolders = JSON.parse(storedFoldersString);
        const folderItems = parsedFolders.map(folder => ({
          ...folder,
          type: 'folder',
        }));
        combinedItems = [...combinedItems, ...folderItems];
      }

      // createdAt 기준으로 정렬하되, updatedAt이 있으면 그것을 우선시
      combinedItems.sort((a, b) => {
        const timeA = a.updatedAt || a.createdAt || 0;
        const timeB = b.updatedAt || b.createdAt || 0;
        return timeB - timeA;
      });

      setItems(combinedItems);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  const handleTimerClick = async clickedTimer => {
    try {
      // updatedAt 추가하여 최신 항목으로 표시
      const now = Date.now();

      // Storage 업데이트
      const storedTimersString = await AsyncStorage.getItem('timers');
      if (storedTimersString) {
        const parsedTimers = JSON.parse(storedTimersString);
        const updatedTimers = [...parsedTimers];
        const timerIndex = updatedTimers.findIndex(
          t => t.id === clickedTimer.id,
        );
        if (timerIndex > -1) {
          updatedTimers[timerIndex] = {
            ...updatedTimers[timerIndex],
            updatedAt: now,
          };
          await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
        }
      }

      // 로컬 state 업데이트
      const updatedItems = [...items];
      const itemIndex = updatedItems.findIndex(
        item => item.type === 'timer' && item.id === clickedTimer.id,
      );
      if (itemIndex > -1) {
        const clickedItem = {
          ...updatedItems[itemIndex],
          updatedAt: now,
        };
        updatedItems.splice(itemIndex, 1);
        updatedItems.unshift(clickedItem);
        setItems(updatedItems);
      }
    } catch (error) {
      console.error('타이머 순서 업데이트 실패:', error);
    }
  };

  // 폴더 클릭 핸들러 추가
  const handleFolderClick = async clickedFolder => {
    try {
      // updatedAt 추가하여 최신 항목으로 표시
      const now = Date.now();

      // Storage 업데이트
      const storedFoldersString = await AsyncStorage.getItem('folders');
      if (storedFoldersString) {
        const parsedFolders = JSON.parse(storedFoldersString);
        const updatedFolders = [...parsedFolders];
        const folderIndex = updatedFolders.findIndex(
          f => f.id === clickedFolder.id,
        );
        if (folderIndex > -1) {
          updatedFolders[folderIndex] = {
            ...updatedFolders[folderIndex],
            updatedAt: now,
          };
          await AsyncStorage.setItem('folders', JSON.stringify(updatedFolders));
        }
      }

      // 로컬 state 업데이트
      const updatedItems = [...items];
      const itemIndex = updatedItems.findIndex(
        item => item.type === 'folder' && item.id === clickedFolder.id,
      );
      if (itemIndex > -1) {
        const clickedItem = {
          ...updatedItems[itemIndex],
          updatedAt: now,
        };
        updatedItems.splice(itemIndex, 1);
        updatedItems.unshift(clickedItem);
        setItems(updatedItems);
      }

      // 네비게이션은 CountdownFolder 컴포넌트에서 처리
    } catch (error) {
      console.error('폴더 순서 업데이트 실패:', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        if (await checkFirstUser()) {
          // initialMockData에 현재 시간보다 살짝 앞선 시간값 추가
          const now = Date.now();
          const mockedData = initialMockData.map((timer, index) => ({
            ...timer,
            createdAt: now + index * 1000, // 현재 시간보다 앞서게 설정 (1초씩 차이)
            type: 'timer',
          }));

          await AsyncStorage.setItem('timers', JSON.stringify(mockedData));

          // 초기 데이터를 items에 설정
          setItems(mockedData.map(timer => ({...timer, type: 'timer'})));
        }
      } catch (error) {
        console.error('초기화 실패:', error);
      }
    };

    initialize();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <MainContainer>
      <HeaderWrapper>
        <Header type="main" />
      </HeaderWrapper>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <CountdownTimerWrapper
          contentContainerStyle={{flexGrow: 1}}
          onPress={() => {
            isDeleteMode && setDeleteMode(false);
          }}>
          <TimersAndFoldersContainer>
            {items.map(item => (
              <React.Fragment key={item.id}>
                {item.type === 'timer' ? (
                  <CountdownTimer
                    timer={item}
                    onTimerClick={handleTimerClick}
                  />
                ) : (
                  <CountdownFolder
                    folder={item}
                    onFolderClick={handleFolderClick}
                  />
                )}
              </React.Fragment>
            ))}
          </TimersAndFoldersContainer>
        </CountdownTimerWrapper>
      </ScrollView>
    </MainContainer>
  );
};

export default MainPage;

const MainContainer = styled.View`
  flex-direction: column;
  padding-top: ${Platform.select({ios: scale(25), android: scale(12)})}px;
  height: 100%;
`;

const CountdownTimerWrapper = styled.Pressable`
  margin: 0 ${scale(21)}px;
  height: 100%;
  width: 100%;
`;

const TimersAndFoldersContainer = styled.View`
  flex-direction: row;
  gap: ${scale(26)}px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: ${scale(20)}px;
  padding-bottom: ${scale(30)}px;
`;

const HeaderWrapper = styled.View`
  padding: 0 ${scale(21)}px;
`;
