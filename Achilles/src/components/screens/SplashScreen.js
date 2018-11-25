import React, { Component } from 'react';
import { Container, Content, Thumbnail, Form, Item, Input, Label, Text, Card, Button } from 'native-base';
import { Row, Grid } from "react-native-easy-grid";


export default class SplashScreen extends Component {
    render() {
        const { thumblineStyle, headerRow, textStyle } = styles;
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Grid>
                        <Row size={35} style={headerRow}>
                            <Thumbnail style={thumblineStyle} source={require('../../resources/images/achilles_logo.jpg')} />
                        </Row>
                        <Row size={50}>
                            <Card style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
                                <Text style={textStyle}>{`Welcome to Achilles!
                \nThis is an Athlete Management System (AMS) designed for the next gen athlete. We provide open source analytics information to our athletes and valuable insights to our coaching staff. We are excited that you chose us to tranform your athletic career.`}</Text>
                            </Card>
                        </Row>
                        <Row size={15} style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
                            <Text style={{ alignItems: 'center' }}>Loading...</Text>
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        padding: 20,
        fontFamily: 'Verdana'
    }
};