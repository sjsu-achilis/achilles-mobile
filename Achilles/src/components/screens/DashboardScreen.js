import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Thumbnail, Title, Item, Input, Header, Text, Body, Right, Card, Button, CardItem, Left } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class DashboardScreen extends Component {
    static navigationOptions = {
        tabBarIcon: (tintColor) => {
            return (
                <Ionicons name="md-analytics" size={25} />
            )
        }
    };
    render() {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Title>Dashboard Screen</Title>
                </Header>
                <Content>
                    <Card>
                        <CardItem>
                            <Left style={{ marginLeft: 0 }}>
                                <Body>
                                    <Text >Fitness Level Illustration</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={require('../../resources/images/fitness_level.png')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem style={{ padding: 0 }}>
                            <Right>
                                <Text>2 mins ago</Text>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left style={{ marginLeft: 0 }}>
                                <Body>
                                    <Text>Activity Ring</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={require('../../resources/images/activity_ring.jpg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem style={{ padding: 0 }}>
                            <Right>
                                <Text>2 mins ago</Text>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left style={{ marginLeft: 0 }}>
                                <Body>
                                    <Text >Endurance</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={require('../../resources/images/endurance.jpg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem style={{ padding: 0 }}>
                            <Right>
                                <Text>2 mins ago</Text>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left style={{ marginLeft: 0 }}>
                                <Body>
                                    <Text>Training Session Report</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={require('../../resources/images/table.jpeg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem style={{ padding: 0 }}>
                            <Right>
                                <Text>2 mins ago</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    };
};
const styles = {
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
}