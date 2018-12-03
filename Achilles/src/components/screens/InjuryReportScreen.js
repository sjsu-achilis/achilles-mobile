import React, { Component } from 'react';
import { Slider } from 'react-native';
import { Root, Container, Content, Thumbnail, Title, Item, Input, Header, Text, Card, Button, Label, Form, Picker, DatePicker, Toast, Textarea } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
class InjuryReportScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            injuryTypeSelected: undefined,
            injuryLocationSelected: undefined,
            injuryRegionSelected: undefined,
            injuryDateSelected: new Date(),
            injuryIntensity: 0,
            comment: ''
        };
        this.setDate = this.setDate.bind(this);
    }
    onSliderChange(sliderValue) {
        this.setState(() => {
            return {
                injuryIntensity: parseFloat(sliderValue),
            };
        });
    }
    setDate(selectedDate) {
        this.setState({ injuryDateSelected: selectedDate });
    }
    onInjuryTypeChange(value) {
        this.setState({
            injuryTypeSelected: value
        });
    }
    onInjuryLocationChange(value) {
        this.setState({
            injuryLocationSelected: value
        });
    }
    onInjuryRegionChange(value) {
        this.setState({
            injuryRegionSelected: value
        });
    }
    onButtonPress() {
        const { injuryTypeSelected, injuryLocationSelected, injuryRegionSelected, injuryDateSelected, injuryIntensity, comment } = this.state;
        console.log("Storing injury with values: " + injuryDateSelected + " " + injuryTypeSelected + " " + injuryRegionSelected + " " + injuryLocationSelected + " " + injuryIntensity + " " + comment);
        //Write content to DB using action
        fetch('http://ec2-54-201-123-10.us-west-2.compute.amazonaws.com:5000/register_injury', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: this.props.userid,
                date: injuryDateSelected,
                region: injuryRegionSelected,
                type: injuryTypeSelected,
                location: injuryLocationSelected,
                desc: comment,
                intensity: injuryIntensity
            }),
        })
            .then(() => Toast.show({
                text: "Injury Record Saved!",
                buttonText: "Okay",
                type: "success",
                duration: 3000
            }))
            .catch(() => Toast.show({
                text: "Wrong password!",
                buttonText: "Okay",
                type: "danger",
                duration: 3000
            }))
    }
    onCommentChange(text) {
        this.setState({
            comment: text
        });
    }

    static navigationOptions = {
        title: 'Report Injury',
    };
    render() {
        return (
            <Root>
                <Container>
                    <Content>
                        <Container style={{ flex: 1 }}>
                            <Grid>
                                <Row size={3.5} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Thumbnail square style={styles.thumblineStyle} source={require('../../resources/images/human.png')} />
                                </Row>
                                <Row size={0.5}>

                                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>Date</Text>
                                    </Col>
                                    <Col size={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <DatePicker
                                            defaultDate={new Date()}
                                            minimumDate={new Date(2018, 1, 1)}
                                            maximumDate={new Date()}
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType={"fade"}
                                            androidMode={"default"}
                                            placeHolderText="Select date"
                                            textStyle={{ color: "green" }}
                                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                                            onDateChange={this.setDate}
                                        />
                                    </Col>

                                </Row>
                                <Row size={0.5}>

                                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>Injury Type</Text>
                                    </Col>
                                    <Col size={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Picker
                                            mode="dropdown"
                                            placeholder="Select One"
                                            style={{ width: '100%' }}
                                            placeholderStyle={{ color: "#2874F0" }}
                                            note={false}
                                            selectedValue={this.state.injuryTypeSelected}
                                            onValueChange={this.onInjuryTypeChange.bind(this)}
                                        >
                                            <Picker.Item label="Acute" value="Acute" />
                                            <Picker.Item label="Overuse" value="Overuse" />
                                            <Picker.Item label="Concussion" value="Concussion" />
                                        </Picker>
                                    </Col>

                                </Row>
                                <Row size={0.5}>

                                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>Injury Region</Text>
                                    </Col>
                                    <Col size={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Picker
                                            mode="dropdown"
                                            placeholder="Select One"
                                            style={{ width: '100%' }}
                                            placeholderStyle={{ color: "#2874F0" }}
                                            note={false}
                                            selectedValue={this.state.injuryRegionSelected}
                                            onValueChange={this.onInjuryRegionChange.bind(this)}
                                        >
                                            <Picker.Item label="Head" value="Head" />
                                            <Picker.Item label="Arm" value="Arm" />
                                            <Picker.Item label="Elbow" value="Elbow" />
                                            <Picker.Item label="Wrist" value="Wrist" />
                                            <Picker.Item label="Hand" value="Hand" />
                                            <Picker.Item label="Finger" value="Finger" />
                                            <Picker.Item label="Chest" value="Chest" />
                                            <Picker.Item label="Back" value="Back" />
                                            <Picker.Item label="Rib" value="Rib" />
                                            <Picker.Item label="Abdomen" value="Abdomen" />
                                            <Picker.Item label="Quad" value="Quad" />
                                            <Picker.Item label="Knee" value="Knee" />
                                            <Picker.Item label="Calf" value="Calf" />
                                            <Picker.Item label="Ankle" value="Ankle" />
                                            <Picker.Item label="Achilles" value="Achilles" />
                                            <Picker.Item label="Foot" value="Foot" />
                                            <Picker.Item label="Toe" value="Toe" />
                                        </Picker>
                                    </Col>

                                </Row>
                                <Row size={0.5}>

                                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>Injury Location</Text>
                                    </Col>
                                    <Col size={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Picker
                                            mode="dropdown"
                                            placeholder="Select One"
                                            style={{ width: '100%' }}
                                            placeholderStyle={{ color: "#2874F0" }}
                                            note={false}
                                            selectedValue={this.state.injuryLocationSelected}
                                            onValueChange={this.onInjuryLocationChange.bind(this)}
                                        >
                                            <Picker.Item label="Left" value="Left" />
                                            <Picker.Item label="Right" value="Right" />
                                            <Picker.Item label="Upper" value="Upper" />
                                            <Picker.Item label="Lower" value="Lower" />
                                        </Picker>
                                    </Col>

                                </Row>
                                <Row size={0.5}>

                                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>Injury Intensity</Text>
                                    </Col>
                                    <Col size={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Slider
                                            step={1}
                                            maximumValue={10}
                                            onValueChange={this.onSliderChange.bind(this)}
                                            value={this.state.sliderValue}
                                            style={{ width: '100%' }}
                                        />
                                    </Col>

                                </Row>
                                <Row size={2}>
                                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>Comments</Text>
                                    </Col>
                                    <Col size={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Textarea rowSpan={5} bordered placeholder="Add comments." onChangeText={this.onCommentChange.bind(this)} style={{ width: '100%', marginRight: 20 }} />
                                    </Col>
                                </Row>
                                <Row size={0.5}>
                                    <Button block style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)}><Text>Submit</Text></Button>
                                </Row>
                            </Grid>
                        </Container>
                    </Content>
                </Container >
            </Root>
        );
    }
}

const styles = {
    thumblineStyle: {
        marginTop: 10,
        width: 250,
        height: 250,
    },
    buttonStyle: {
        marginLeft: 10,
        width: '95%',
        marginBottom: 10
    }
}
mapStateToProps = ({ auth }) => {
    return ({
        userid: auth.username,
    })
}
export default connect(mapStateToProps, {})(InjuryReportScreen);
