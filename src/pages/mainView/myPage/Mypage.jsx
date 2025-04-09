import {View, Text} from 'react-native';

const Mypage = ({width}) => {
  return (
    <View width={width} style={{flex: 1, backgroundColor: 'red'}}>
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <Text>hi</Text>
      </View>
    </View>
  );
};

export default Mypage;
