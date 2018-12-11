import React, { Component } from 'react';
import { Container, Content, Header, Form, Item, Input, Label, Text, Card, Button, Title, Body } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";


export default class RecoveryScreen extends Component {

    static navigationOptions = {
        title: 'Recover Credentials',
        headerStyle: {
            backgroundColor: '#f4511e',
            textAlign: 'center'
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            width: '100%'
        },
    };

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, backgroundColor: '#2D2F33' }}>
                    <Card style={{ flex: 1, marginTop: 50, marginLeft: 10, marginRight: 10, borderRadius: 25, backgroundColor: '#F7F7F8' }}>
                        <Text style={{ marginLeft: 10, marginTop: 10 }}>Please provide us with your email so that we can help you login.</Text>
                        <Form>
                            <Item style={{ marginLeft: 10, marginRight: 10, marginTop: 30 }}>
                                <Input
                                    placeholder="Email" />
                            </Item>
                        </Form>
                        <Container style={{ marginLeft: 10, marginRight: 10, justifyContent: 'center', height: 50, backgroundColor: '#F7F7F8' }}>

                            <Button block style={{ backgroundColor: '#269DCB' }} onPress={() => this.props.navigation.navigate('Login')}><Text>Submit</Text></Button>

                        </Container>
                    </Card>
                </Content>
            </Container >
        );
    };
};
