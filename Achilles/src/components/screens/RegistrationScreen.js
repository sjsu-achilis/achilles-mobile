import React, { Component } from 'react';
import { Container, Content, Thumbnail, Form, Item, Input, Label, Text, Card, Button, Header, Title, Spinner } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";
import { usernameChanged, passwordChanged, nameChanged, emailChanged, registerUser } from '../../actions';
import { connect } from 'react-redux';
class RegistrationScreen extends Component {
    static navigationOptions = {
        title: 'Sign Up',
        headerStyle: {
            backgroundColor: '#f4511e',
            textAlign: 'center'
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            width: '100%'
        },
    };
    onUsernameChange(text) {
        console.log(text)
        this.props.usernameChanged(text);
    }
    onPasswordChange(text) {
        console.log(text)
        this.props.passwordChanged(text);
    }
    onEmailChange(text) {
        console.log(text)
        this.props.emailChanged(text);
    }
    onNameChange(text) {
        console.log(text)
        this.props.nameChanged(text);
    }
    onButtonPress() {
        console.log('Submitting sign up info')
        const { username, password, email, name } = this.props;
        this.props.registerUser({ name, email, username, password });
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
                    <Text onPress={this.onButtonPress.bind(this)}>Submit</Text>
                </Button>
            </Container>
        )
    }
    render() {
        const { buttonStyle, buttonContainerStyle } = styles;
        return (
            <Container>
                {/*<Header style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Title>Sign Up</Title>
                </Header>*/}
                <Content contentContainerStyle={{ flex: 1, backgroundColor: '#2D2F33' }}>
                    <Grid>
                        <Row size={65}>
                            <Card style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#F7F7F8', borderRadius: 25 }}>
                                <Form style={{ justifyContent: 'space-evenly' }}>
                                    <Item inlineLabel style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Input
                                            placeholder="Name"
                                            onChangeText={this.onNameChange.bind(this)}
                                            value={this.props.name} />
                                    </Item>
                                    <Item inlineLabel style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Input
                                            placeholder="Email"
                                            onChangeText={this.onEmailChange.bind(this)}
                                            value={this.props.email} />
                                    </Item>
                                    <Item inlineLabel style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Input
                                            placeholder="Username"
                                            onChangeText={this.onUsernameChange.bind(this)}
                                            value={this.props.username} />
                                    </Item>
                                    <Item inlineLabel style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Input
                                            placeholder="Password"
                                            onChangeText={this.onPasswordChange.bind(this)}
                                            value={this.props.password} />
                                    </Item>
                                </Form>
                                <Text style={styles.errorTextStyle}>
                                    {this.props.signup_error}
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
        marginRight: 10,
        backgroundColor: '#90D377'
    },
    buttonContainerStyle: {
        paddingTop: 20,
        justifyContent: 'space-evenly',
        borderRadius: 25,
        backgroundColor: '#F7F7F8'
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
        email: auth.email,
        name: auth.name,
        signup_error: auth.signup_error,
        loading: auth.loading,
    })
}
export default connect(mapStateToProps, { usernameChanged, passwordChanged, nameChanged, emailChanged, registerUser })(RegistrationScreen);
