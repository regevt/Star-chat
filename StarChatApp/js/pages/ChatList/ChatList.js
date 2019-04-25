import React, { useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import GlobalContext from '../../Context/GlobalContext';

export default ChatList = () => {
    const context = useContext(GlobalContext);

    GoToChat = (room) => {
        Actions.push('Chat', room);
    };

    scrollView = React.createRef()

    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: '#212121' }]} >
            <ScrollView ref={scrollView} style={[{ flex: 1, backgroundColor: 'black', padding: 10 }]}>
                <FlatList
                    data={context.Rooms}
                    renderItem={({ item }) =>
                        <TouchableOpacity key={item.id} onPress={() => GoToChat({ room: item })}>
                            <Text style={style.itemStyle}>{item.name}</Text>
                        </TouchableOpacity>
                    }
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    itemStyle: {
        fontSize: 22,
        color: 'white'
    }
});
