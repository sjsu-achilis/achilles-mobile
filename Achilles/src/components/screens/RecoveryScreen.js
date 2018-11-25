import React, { Component } from 'react';
import { Container, Content, Header, Form, Item, Input, Label, Text, Card, Button, Title, Body } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";


export default class RecoveryScreen extends Component {

    static navigationOptions = {
        //title: 'Recover Credentials',
    };

    render() {
        return (
            <Container>
                <Header>
                    <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Title>Recover Credentials</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Card style={{ flex: 1, marginTop: 50, marginLeft: 10, marginRight: 10 }}>
                        <Text>Please provide us with your email so that we can help you login.</Text>
                        <Form>
                            <Item style={{ marginLeft: 10, marginRight: 10, marginTop: 30 }}>
                                <Label>Email</Label>
                                <Input />
                            </Item>
                        </Form>
                        <Container style={{ marginLeft: 10, marginRight: 10, justifyContent: 'center' }}>
                            <Button block onPress={() => this.props.navigation.navigate('Login')}><Text>Submit</Text></Button>
                        </Container>
                    </Card>
                </Content>
            </Container >
        );
    };
};
