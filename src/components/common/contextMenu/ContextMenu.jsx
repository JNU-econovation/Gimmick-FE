import {View, Text} from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOption,
  MenuOptions,
} from 'react-native-popup-menu';
import styled from 'styled-components/native';

const ContextMenu = () => {
  return (
    <View>
      <Text>Hello world!</Text>
      <Menu>
        <MenuTrigger triggerOnLongPress={true}>
          <Text>Select action</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Save`)} text="Save" />
          <MenuOption onSelect={() => alert(`Delete`)}>
            <Text style={{color: 'red'}}>Delete</Text>
          </MenuOption>
          <MenuOption
            onSelect={() => alert(`Not called`)}
            disabled={true}
            text="Disabled"
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default ContextMenu;
