import React, { Component } from 'react';
import { Container, Content, Thumbnail, Title, Item, Input, Header, Text, Card, Button, Label } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
class ProfileScreen extends Component {
    static navigationOptions = {
        header: null,
        showIcon: true,
        tabBarIcon: (tintColor) => {
            console.log("Showing tab icon");
            return (
                //<Ionicons name="md-analytics" size={25} color={tintColor} />
                <Ionicons name="md-person" size={25} />
            )
        }
    };
    constructor(props) {
        super(props)
    }
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
                                            <Text>{this.props.user.name}</Text>
                                            <Text>{this.props.user.age}</Text>
                                            <Text>{this.props.user.weight} lb</Text>
                                            <Text>{this.props.user.height} ft</Text>
                                            <Thumbnail small source={require('../../resources/images/green_heart_logo.png')} />
                                            <Thumbnail small source={require('../../resources/images/injury_green.png')} />
                                        </Col>
                                    </Grid>
                                </Card>
                            </Row>
                            <Row size={1} style={{ backgroundColor: 'orange' }}>
                                <Container style={{ justifyContent: 'flex-start' }}>
                                    <Button block style={buttonStyle} onPress={() => this.props.navigation.navigate('Questionnaire')}>
                                        <Text>Edit Questionnaire</Text>
                                    </Button>
                                    <Button block style={buttonStyle} onPress={() => this.props.navigation.navigate('InjuryReport')}>
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

mapStateToProps = ({ auth }) => {
    return ({
        user: auth.user,
    })
}
export default connect(mapStateToProps, {})(ProfileScreen);
