import React, { Component } from 'react';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { Container, Title, Header, Content, Card, Button, Text, Root, Toast } from 'native-base';
import Dialog, { DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import Slider from 'react-native-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
class SessionScreen extends Component {
    static navigationOptions = {
        tabBarIcon: (tintColor) => {
            return (
                <Ionicons name="md-walk" size={25} />
            )
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            timerStart: false,
            stopwatchStart: false,
            totalDuration: 90000,
            timerReset: false,
            stopwatchReset: false,
            visible: false,
            rating: 0,
            energyLevel: 0,
            mood: 0,
            sleepDuration: 0,
            sleepQuality: 0,
            musclePreparation: 0,
            stressLevel: 0,
            startTime: '',
            endTime: ''
        };
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
    }

    toggleTimer() {
        this.setState({ timerStart: !this.state.timerStart, timerReset: false });
    }

    resetTimer() {
        this.setState({ timerStart: false, timerReset: true });
    }

    toggleStopwatch() {
        if (this.state.stopwatchStart) {
            this.setState({ endTime: new Date().toLocaleTimeString() }, () => console.log("End time:" + this.state.endTime))
        }
        else {
            this.setState({ startTime: new Date().toLocaleTimeString() }, () => console.log("Start time:" + this.state.startTime))
        }
        this.setState({ stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false });
    }

    resetStopwatch() {
        this.setState({ stopwatchStart: false, stopwatchReset: true, startTime: '', endTime: '' });
    }

    getFormattedTime(time) {
        this.currentTime = time;
    };
    onSubmit() {
        if (this.state.rating == 0 || this.state.energyLevel == 0 || this.state.mood == 0 || this.state.sleepDuration == 0 || this.state.sleepQuality == 0 || this.state.musclePreparation == 0 || this.state.stressLevel == 0) {
            this.setState({ visible: true })
        }
        else {
            console.log('Submit session details.');
            this.setState({ stopwatchStart: false, stopwatchReset: true });
            fetch('http://ec2-54-201-123-10.us-west-2.compute.amazonaws.com:5000/register_session_info', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "userid": "dev1234",
                    "date": "",
                    "start": this.state.startTime,
                    "end": this.state.endTime,
                    "answers": [{
                        "q_id": "0",
                        "val": this.state.rating
                    }, {
                        "q_id": "1",
                        "val": this.state.mood
                    }, {
                        "q_id": "2",
                        "val": this.state.energyLevel
                    }, {
                        "q_id": "3",
                        "val": this.state.sleepQuality
                    }, {
                        "q_id": "4",
                        "val": this.state.sleepDuration
                    }, {
                        "q_id": "5",
                        "val": this.state.stressLevel
                    }, {
                        "q_id": "6",
                        "val": this.state.musclePreparation
                    }]
                }),
            })
                .then(() => Toast.show({
                    text: "Session recorded successfully.",
                    buttonText: "Okay",
                    type: "success",
                    duration: 3000
                }))
                .catch(() => Toast.show({
                    text: "Failed to record session.",
                    buttonText: "Okay",
                    type: "danger",
                    duration: 3000
                }));


        }
    }

    render() {
        return (
            <Root>
                <Container style={{ backgroundColor: '#2D2F33' }}>
                    <Header style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f4511e'
                    }}>
                        <Title style={{ color: 'black' }}>Session Tracker</Title>
                    </Header>
                    <Content conentStyle={{ justifyContent: 'center' }}>
                        <Card style={{ flex: 1, height: 400, justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 25, backgroundColor: '#F7F7F8' }}>
                            <Stopwatch laps start={this.state.stopwatchStart}
                                reset={this.state.stopwatchReset}
                                options={options}
                                getTime={this.getFormattedTime} />
                            <Button block onPress={this.toggleStopwatch} style={{ marginTop: 20, backgroundColor: '#EA7149' }}>
                                <Text style={{ fontSize: 30 }}>{!this.state.stopwatchStart ? "Record" : "Finish"}</Text>
                            </Button>
                            <Button block onPress={this.resetStopwatch} style={{ backgroundColor: '#269DCB' }}>
                                <Text style={{ fontSize: 30 }}>Reset</Text>
                            </Button>
                            <Button block onPress={this.onSubmit.bind(this)} style={{ backgroundColor: '#90D377' }}>
                                <Text style={{ fontSize: 30 }}>Submit</Text>
                            </Button>
                        </Card>
                        <Dialog
                            visible={this.state.visible}
                            onTouchOutside={() => {
                                this.setState({ visible: false });
                            }}
                            width={0.8}
                            height={0.90}
                            dialogTitle={<DialogTitle title="How was the workout!" />}
                        >
                            <DialogContent>
                                <Text>Workout Rating: {this.state.rating}</Text>
                                <Slider
                                    value={this.state.rating}
                                    onValueChange={(value) => this.setState({ rating: value })}
                                    maximumValue={10}
                                    step={1}
                                />
                                <Text>Energy level: {this.state.energyLevel}</Text>
                                <Slider
                                    value={this.state.energyLevel}
                                    onValueChange={(value) => this.setState({ energyLevel: value })}
                                    maximumValue={10}
                                    step={1}
                                />
                                <Text>Workout Mood: {this.state.mood}</Text>
                                <Slider
                                    value={this.state.mood}
                                    onValueChange={(value) => this.setState({ mood: value })}
                                    maximumValue={10}
                                    step={1}
                                />
                                <Text>Sleep quality: {this.state.sleepQuality}</Text>
                                <Slider
                                    value={this.state.sleepQuality}
                                    onValueChange={(value) => this.setState({ sleepQuality: value })}
                                    maximumValue={10}
                                    step={1}
                                />
                                <Text>Sleep Duration: {this.state.sleepDuration} hours</Text>
                                <Slider
                                    value={this.state.sleepDuration}
                                    onValueChange={(value) => this.setState({ sleepDuration: value })}
                                    maximumValue={10}
                                    step={1}
                                />
                                <Text>Stress Level: {this.state.stressLevel}</Text>
                                <Slider
                                    value={this.state.stressLevel}
                                    onValueChange={(value) => this.setState({ stressLevel: value })}
                                    maximumValue={10}
                                    step={1}
                                />
                                <Text>Muscle Preparation: {this.state.musclePreparation}</Text>
                                <Slider
                                    value={this.state.musclePreparation}
                                    onValueChange={(value) => this.setState({ musclePreparation: value })}
                                    maximumValue={10}
                                    step={1}
                                />
                            </DialogContent>
                        </Dialog>
                    </Content>
                </Container>
            </Root>
        );
    }
}

const options = {
    container: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 50,
        width: 320,
        alignItems: 'center'
    },
    text: {
        fontSize: 30,
        color: '#FFF',
    }
};


export default SessionScreen;