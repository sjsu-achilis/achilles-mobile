import React, { Component } from 'react';
import { Container, Content, Thumbnail, Form, Item, Input, Label, Text, Card, Button } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import usernameChanged from '../../actions';
class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    }

    onUsernameChange(text) {
        this.props.usernameChanged(text);
    }
    render() {
        const { thumblineStyle, buttonStyle, buttonContainerStyle, forgotLabelStyle, headerRow } = styles;
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Grid>
                        <Row size={35} style={headerRow}>
                            <Thumbnail style={thumblineStyle} source={require('../../resources/images/achilles_logo.jpg')} />
                        </Row>
                        <Row size={65}>
                            <Card style={{ flex: 1, justifyContent: 'flex-start' }}>
                                <Form style={{ justifyContent: 'space-evenly' }}>
                                    <Item inlineLabel style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Label>Username</Label>
                                        <Input
                                            placeholder="username"
                                            onChangeText={this.onUsernameChange.bind(this)}
                                            value={this.props.username}
                                        />
                                    </Item>
                                    <Text style={forgotLabelStyle} onPress={() => this.props.navigation.navigate('ForgotUser')} > Forgot Username</Text>
                                    <Item inlineLabel style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Label>Password</Label>
                                        <Input
                                            secureTextEntry
                                        />
                                    </Item>
                                    <Text style={forgotLabelStyle} onPress={() => this.props.navigation.navigate('ForgotUser')} >Forgot Password</Text>
                                </Form>
                                <Container style={buttonContainerStyle}>
                                    <Button block style={buttonStyle}>
                                        <Text onPress={() => this.props.navigation.navigate('Main')}>Log in</Text>
                                    </Button>
                                    <Button block light style={buttonStyle}>
                                        <Text onPress={() => this.props.navigation.navigate('Signup')}>Sign Up</Text>
                                    </Button>
                                </Container>
                            </Card>
                        </Row>
                    </Grid>
                </Content>
            </Container >
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
        marginRight: 10
    },
    buttonContainerStyle: {
        paddingTop: 20,
        justifyContent: 'space-evenly'
    },
    forgotLabelStyle: {
        fontSize: 12,
        alignSelf: 'flex-end',
        marginRight: 10,
        color: 'blue'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
};
mapStateToProps = state => {
    return ({
        username: state.auth.username
    })
}
export default connect(mapStateToProps, { usernameChanged })(LoginScreen);
