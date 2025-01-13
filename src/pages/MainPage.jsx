import styled from 'styled-components/native';
import React, {useState, useEffect} from 'react';
import {scale} from 'react-native-size-matters';
import {ScrollView} from 'react-native';
import Header from '../components/common/Header';
import CountdownTimer from '../components/timer/CountdownTimer';
import CountdownFolder from '../components/timer/CountdownFolder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import initialMockData from '../data/initialMockData';
import {checkFirstUser} from '../utils/checkFirstUser';

const MainPage = () => {
  const [isFirstUser, setIsFirstUser] = useState(false);
  const [timers, setTimers] = useState([]);
  const [folders, setFolders] = useState([]);

  const loadData = async () => {
    try {
      const storedTimers = await AsyncStorage.getItem('timers');
      if (storedTimers) {
        setTimers(JSON.parse(storedTimers));
      }
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const firstUser = await checkFirstUser();
      setIsFirstUser(firstUser);

      if (isFirstUser) {
        try {
          await AsyncStorage.setItem('timers', JSON.stringify(initialMockData));
        } catch (error) {
          console.error('Mock data 저장 실패:', error);
        }
      }

      await loadData();
    };

    initialize();
  }, []);

  // 새로고침되어 새로 추가된 타이머 ui가 보이도록
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <MainContainer>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Header type="main" />
        <CountdownTimerWrapper>
          <TimersAndFoldersContainer>
            {timers.map((timer, index) => (
              <React.Fragment key={index}>
                <CountdownTimer timer={timer} />
              </React.Fragment>
            ))}
            {folders.map(folder => (
              <CountdownFolder key={folder.id} />
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
  height: 100%;
`;

const CountdownTimerWrapper = styled.View``;

const TimersAndFoldersContainer = styled.View`
  flex-direction: row;
  gap: ${scale(26)}px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: ${scale(20)}px;
`;
