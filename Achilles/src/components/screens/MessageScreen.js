import React, { Component } from 'react';
import { Container, Content, Thumbnail, Title, Item, Input, Header, Text, Card, Button, List, ListItem, Left, Body, Right } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { GiftedChat } from 'react-native-gifted-chat';
export default class MessageScreen extends Component {
    static navigationOptions = {
        tabBarIcon: (tintColor) => {
            return (
                <Ionicons name="md-chatbubbles" size={25} />
            )
        }
    };
    render() {
        return (
            <Container style={{ paddingBottom: 10, backgroundColor: '#2D2F33' }}>
                <Header style={styles.headerStyle}>
                    <Title style={{ color: 'black' }}>Message Screen</Title>
                </Header>
                <Content style={{ backgroundColor: '#2D2F33' }}>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={require('../../resources/images/coach_endurance.jpg')} />
                            </Left>
                            <Body>
                                <Text style={styles.textStyle}>Michael Smith</Text>
                                <Text note>Run starts at 6:00 am!</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={require('../../resources/images/coach_nutritionist.jpg')} />
                            </Left>
                            <Body>
                                <Text style={styles.textStyle}>Jenny Carra</Text>
                                <Text note>Don't forget to pick up your supplements.</Text>
                            </Body>
                            <Right>
                                <Text note>3:10 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={require('../../resources/images/coach_tennis.jpg')} />
                            </Left>
                            <Body>
                                <Text style={styles.textStyle}>Roger Federer</Text>
                                <Text note>Make sure you rest well before the session tomorrow.</Text>
                            </Body>
                            <Right>
                                <Text note >2:10 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={require('../../resources/images/coach_partner.jpg')} />
                            </Left>
                            <Body>
                                <Text style={styles.textStyle}>Alex Zverev</Text>
                                <Text note>Great hit today!</Text>
                            </Body>
                            <Right>
                                <Text note>2:00 pm</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
                <Button block style={{ backgroundColor: '#90D377' }}><Text>Send Message</Text></Button>
            </Container>
        );
    };
};
const styles = {
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4511e',
    },
    textStyle: {
        color: 'white'
    }
}