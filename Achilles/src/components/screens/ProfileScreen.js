import React, { Component } from 'react';
import { Container, Content, Thumbnail, Title, Item, Input, Header, Text, Card, Button, Label } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ProfileScreen extends Component {
    static navigationOptions = {
        tabBarIcon: (tintColor) => {
            return (
                //<Ionicons name="md-analytics" size={25} color={tintColor} />
                <Ionicons name="md-person" size={25} />
            )
        }
    };
    render() {
        const { buttonStyle, buttonContainerStyle, headerRow, thumblineStyle } = styles;
        return (
            <Container>
                <Header style={headerRow}>
                    <Title>Profile</Title>
                </Header>
                <Content>
                    <Container style={{ flex: 1 }}>
                        <Grid>
                            <Row size={0.5} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Thumbnail style={thumblineStyle} source={require('../../resources/images/achilles_logo.jpg')} />
                                {/* <Button style={{}}><Ionicons name="md-camera" size={25} /></Button>*/}
                            </Row>
                            <Row size={1} style={{ flex: 1 }}>
                                <Card style={{ flex: 1 }}>
                                    <Grid style={{ marginTop: 10 }}>
                                        <Col size={3} style={{ paddingLeft: 30 }}>
                                            <Text>Name</Text>
                                            <Text>Age</Text>
                                            <Text>Weight</Text>
                                            <Text>Height</Text>
                                            <Text>Health Status</Text>
                                            <Text>Injury Prediction</Text>
                                        </Col>
                                        <Col size={4} style={{ flexDirection: 'column', alignItems: 'center' }}>
                                            <Text>Roger Federer</Text>
                                            <Text>36</Text>
                                            <Text>185 lb</Text>
                                            <Text>6'1 ft</Text>
                                            <Thumbnail small source={require('../../resources/images/green_heart_logo.png')} />
                                            <Thumbnail small source={require('../../resources/images/injury_green.png')} />
                                        </Col>
                                    </Grid>
                                </Card>
                            </Row>
                            <Row size={1} style={{ backgroundColor: 'orange' }}>
                                <Container style={{ justifyContent: 'flex-start' }}>
                                    <Button block style={buttonStyle}>
                                        <Text>Edit Questionnaire</Text>
                                    </Button>
                                    <Button block style={buttonStyle}>
                                        <Text>Report Injury</Text>
                                    </Button>
                                    <Button block style={buttonStyle}>
                                        <Text onPress={() => this.props.navigation.navigate('Login')}>Sign Out</Text>
                                    </Button>
                                </Container>
                            </Row>
                        </Grid>
                    </Container>
                </Content>
            </Container>
        );

    };
};
const styles = {
    thumblineStyle: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2
    },
    buttonStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    buttonContainerStyle: {
        paddingTop: 20,
        justifyContent: 'space-evenly'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
};