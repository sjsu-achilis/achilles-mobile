import React, { Component } from 'react';
import { Container, Content, Thumbnail, Form, Item, Input, Label, Text, Card, Button, Header, Title } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";

export default class RegistrationScreen extends Component {

    render() {
        const { thumblineStyle, buttonStyle, buttonContainerStyle, forgotLabelStyle, headerRow } = styles;
        return (
            <Container>
                <Header style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Title>Sign Up</Title>
                </Header>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Grid>
                        <Row size={65}>
                            <Card style={{ flex: 1, justifyContent: 'flex-start' }}>
                                <Form style={{ justifyContent: 'space-evenly' }}>
                                    <Item inlineLabel style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Label>Name</Label>
                                        <Input />
                                    </Item>
                                    <Item inlineLabel style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Label>Email</Label>
                                        <Input />
                                    </Item>
                                    <Item inlineLabel style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Label>Username</Label>
                                        <Input />
                                    </Item>
                                    <Item inlineLabel style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Label>Password</Label>
                                        <Input />
                                    </Item>
                                </Form>
                                <Container style={buttonContainerStyle}>
                                    <Button block style={buttonStyle}>
                                        <Text onPress={() => this.props.navigation.navigate('Login')}>Submit</Text>
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