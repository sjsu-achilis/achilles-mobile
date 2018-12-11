import React, { Component } from 'react';
import { Image, WebView, View } from 'react-native';
import { Container, Content, Thumbnail, Title, Item, Input, Header, Text, Body, Right, Card, Button, CardItem, Left } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LineChart from './MessageScreen';
import CalorieChart from './CalorieChart';
import StepsChart from './StepsChart';
import DistanceChart from './DistanceChart';
import ActivityChart from './ActivityChart';

export default class DashboardScreen extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        tabBarIcon: (tintColor) => {
            return (
                <Ionicons name="md-analytics" size={25} />
            )
        }
    };
    render() {
        return (
            <Container style={{ backgroundColor: '#2D2F33' }}>
                <Header style={styles.headerStyle}>
                    <Title style={{ color: 'black' }}>Dashboard Screen</Title>
                </Header>
                <Content style={{ backgroundColor: '#2D2F33' }}>
                    <Card style={styles.cardStyle}>
                        <CardItem style={{ borderRadius: 25 }}>
                            <Left>
                                <Body>
                                    <Text>Calorie Consumption</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Container>
                                <Content>
                                    <CalorieChart />
                                </Content>
                            </Container>
                        </CardItem>

                    </Card>
                    <Card style={styles.cardStyle}>
                        <CardItem style={{ borderRadius: 25 }}>
                            <Left style={{ marginLeft: 0 }}>
                                <Body>
                                    <Text>Step Count</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Container>
                                <Content>
                                    <StepsChart />
                                </Content>
                            </Container>
                        </CardItem>
                    </Card>
                    <Card style={styles.cardStyle}>
                        <CardItem style={{ borderRadius: 25 }}>
                            <Left style={{ marginLeft: 0 }}>
                                <Body>
                                    <Text>Distance Covered (meters)</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Container>
                                <Content>
                                    <DistanceChart />
                                </Content>
                            </Container>
                        </CardItem>
                    </Card>
                    <Card style={styles.cardStyle}>
                        <CardItem style={{ borderRadius: 25 }}>
                            <Left style={{ marginLeft: 0 }}>
                                <Body>
                                    <Text>Activity Pattern (minutes)</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Container>
                                <Content>
                                    <ActivityChart />
                                </Content>
                            </Container>
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
        alignItems: 'center',
        backgroundColor: '#f4511e'
    },
    cardStyle: {
        height: 400,
        borderRadius: 25
    }
}