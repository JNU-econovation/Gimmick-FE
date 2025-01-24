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
import {useNavigation} from '@react-navigation/native';
import AppDataStorage from '../utils/AppDataStorage';

const MainPage = () => {
  const navigation = useNavigation();
  const [timers, setTimers] = useState([]);
  const [folders, setFolders] = useState([]);

  const loadData = async () => {
    try {
      const storedTimers = await AppDataStorage.load('timers');
      if (storedTimers) {
        setTimers(storedTimers);
      }
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  const handleTimerClick = async clickedTimer => {
    try {
      const updatedTimers = [...timers];
      const timerIndex = updatedTimers.findIndex(t => t.id === clickedTimer.id);
      if (timerIndex > -1) {
        const [timer] = updatedTimers.splice(timerIndex, 1);
        updatedTimers.unshift(timer);
        setTimers(updatedTimers);
        AppDataStorage.save('timers', updatedTimers);
      }
    } catch (error) {
      console.error('타이머 순서 업데이트 실패:', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        if (await checkFirstUser()) {
          navigation.navigate('Login');
          AppDataStorage.save('timers', initialMockData);
          setTimers(initialMockData);
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
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Header type="main" />
        <CountdownTimerWrapper>
          <TimersAndFoldersContainer>
            {timers.map((timer, index) => (
              <React.Fragment key={index}>
                <CountdownTimer timer={timer} onTimerClick={handleTimerClick} />
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
