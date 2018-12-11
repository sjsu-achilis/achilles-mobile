import React, { Component } from 'react';
import { Container, Content, Thumbnail, Title, Item, Input, Header, Text, Card, Button, Label } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import moment from 'moment';
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
        this.state = {
            injury_label: 'green'
        }
    }
    componentWillMount() {
        today = moment(new Date()).format('MM-DD-YYYY')
        console.log(today);
        risk_level = ''
        fetch(`http://ec2-54-201-123-10.us-west-2.compute.amazonaws.com:5000/get_forecast?userid=2134225533&start_date=${encodeURIComponent(today)}`)
            .then(response => response.json())
            .then((response) => {
                if (response.forecast[0] >= 0.8 && response.forecast[0] <= 1.3) {
                    risk_level = 'green'
                } else if (response.forecast[0] >= 1.5 || response.forecast[0] <= 0.5) {
                    risk_level = 'red'
                } else {
                    risk_level = 'yellow'
                }
                console.log('Injury Risk Level: ' + risk_level)
                this.setState({ injury_label: risk_level })
            })
    }
    injuryIndicator() {
        level = this.state.injury_label;
        console.log(level)
        switch (level) {
            case 'green':
                return (<Thumbnail small source={require('../../resources/images/injury_green.png')} />)
            case "yellow":
                return (<Thumbnail small source={require('../../resources/images/injury_yellow.png')} />)
            case "red":
                return (<Thumbnail small source={require('../../resources/images/injury_red.png')} />)
            default:
                return (<Thumbnail small source={require('../../resources/images/injury_yellow.png')} />)
        }


    }
    render() {
        const { questButtonStyle, signOutButtonStyle, injuryButtonStyle, buttonContainerStyle, headerRow, thumblineStyle } = styles;
        return (
            <Container>
                <Header style={headerRow}>
                    <Title style={{ color: 'black' }}>Profile</Title>
                </Header>
                <Content>
                    <Container style={{ flex: 1, backgroundColor: '#2D2F33' }}>
                        <Grid>
                            <Row size={0.5} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Thumbnail style={thumblineStyle} source={require('../../resources/images/achilles_logo.jpg')} />
                                {/* <Button style={{}}><Ionicons name="md-camera" size={25} /></Button>*/}
                            </Row>
                            <Row size={1} style={{ flex: 1 }}>
                                <Card style={{ flex: 1, borderRadius: 25, backgroundColor: '#F7F7F8' }}>
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
                                            <Text>{this.props.user.age || '-'}</Text>
                                            <Text>{this.props.user.weight || '-'} lb</Text>
                                            <Text>{this.props.user.height || '-'} ft</Text>
                                            <Thumbnail small source={require('../../resources/images/green_heart_logo.png')} />
                                            {this.injuryIndicator()}

                                        </Col>
                                    </Grid>
                                </Card>
                            </Row>
                            <Row size={1} style={{ backgroundColor: 'orange' }}>
                                <Container style={{ justifyContent: 'flex-start', backgroundColor: '#2D2F33' }}>
                                    <Button block style={questButtonStyle} onPress={() => this.props.navigation.navigate('Questionnaire')}>
                                        <Text>Edit Questionnaire</Text>
                                    </Button>
                                    <Button block style={injuryButtonStyle} onPress={() => this.props.navigation.navigate('InjuryReport')}>
                                        <Text>Report Injury</Text>
                                    </Button>
                                    <Button block style={signOutButtonStyle}>
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
    questButtonStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: '#90D377'
    },
    injuryButtonStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: '#269DCB'
    },
    signOutButtonStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: '#EA7149'
    },
    buttonContainerStyle: {
        paddingTop: 20,
        justifyContent: 'space-evenly'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4511e'
    }
};

mapStateToProps = ({ auth }) => {
    return ({
        user: auth.user,
    })
}
export default connect(mapStateToProps, {})(ProfileScreen);
