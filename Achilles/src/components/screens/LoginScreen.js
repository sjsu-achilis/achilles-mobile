import React, { Component } from 'react';
import { Container, Content, Thumbnail, Form, Item, Input, Label, Text, Card, Button, Spinner } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";
import { usernameChanged, passwordChanged, loginUser } from '../../actions';
import { connect } from 'react-redux';
class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    }
    displayButton() {
        if (this.props.loading) {
            return (
                <Spinner color='green' />
            )
        }
        return (
            <Container style={styles.buttonContainerStyle}>
                <Button block style={styles.buttonStyle}>
                    <Text onPress={this.onButtonPress.bind(this)}>Log in</Text>
                </Button>
                <Button block light style={styles.buttonStyle}>
                    <Text onPress={() => this.props.navigation.navigate('Signup')}>Sign Up</Text>
                </Button>
            </Container>
        )
    }
    onUsernameChange(text) {
        console.log(text)
        this.props.usernameChanged(text);
    }
    onPasswordChange(text) {
        console.log(text)
        this.props.passwordChanged(text);
    }
    onButtonPress() {
        console.log("Called Submit button")
        const { username, password } = this.props;
        this.props.loginUser({ username, password });
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
                                            placeholder="password"
                                            onChangeText={this.onPasswordChange.bind(this)}
                                            value={this.props.password}
                                        />
                                    </Item>
                                    <Text style={forgotLabelStyle} onPress={() => this.props.navigation.navigate('ForgotUser')} >Forgot Password</Text>
                                </Form>
                                <Text style={styles.errorTextStyle}>
                                    {this.props.login_error}
                                </Text>
                                {this.displayButton()}
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
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};
mapStateToProps = ({ auth }) => {
    return ({
        username: auth.username,
        password: auth.password,
        login_error: auth.login_error,
        loading: auth.loading
    })
}
export default connect(mapStateToProps, { usernameChanged, passwordChanged, loginUser })(LoginScreen);
