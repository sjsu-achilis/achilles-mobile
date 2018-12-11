import React, { Component } from 'react';
import { Root, Container, Content, List, ListItem, Thumbnail, Title, Item, Input, Header, Text, Card, Button, Label, Form, Picker, DatePicker, Toast, Textarea } from 'native-base';
import { PickerItem } from 'react-native';
import _ from 'lodash';
class QuestionnaireScreen extends Component {
    static navigationOptions = {
        title: 'Questionnaire',
        headerStyle: {
            backgroundColor: '#f4511e',
            textAlign: 'center',

        },
        headerTitleStyle: {
            fontWeight: 'bold',
            width: '100%',
            color: 'black'
        },
        headerTintColor: '#fff',
    };
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            answers: {},
            selectedValue: {}
        }
    }
    componentWillMount() {
        console.log('Questionaaire component mounted');
        // Fetch questions
        fetch('http://ec2-54-201-123-10.us-west-2.compute.amazonaws.com:5000/get_questions')
            .then((response) => response.json())
            .then(data => { console.log(data); this.setState({ questions: data }) })
            .catch(error => {
                console.log(error)
            })

    }
    onSelect(key, value) {
        if (value != 0) {
            console.log("Selected: " + value + "for key: " + key)
            if (value === 'No') {
                console.log('Setting ' + key + ' to No')
                new_answers = { ...this.state.answers, [key]: false };
                new_selection = { ...this.state.selectedValue, [key]: 'No' }
                this.setState({ answers: new_answers, selectedValue: new_selection }, function () {
                    console.log(this.state.selectedValue[key]);
                })
            }
            else {
                console.log('Setting ' + key + ' to Yes')
                new_answers = { ...this.state.answers, [key]: true };
                new_selection = { ...this.state.selectedValue, [key]: 'Yes' }
                this.setState({ answers: new_answers, selectedValue: new_selection }, function () {
                    console.log(this.state.selectedValue[key]);
                })
            }

        }
    }
    onUpdate() {
        let responses = [];
        console.log(this.state.answers)
        _.map(this.state.answers, (value, key) => {
            responses.push({ 'qid': key, 'ans': value });
        });
        console.log(responses)
        fetch('http://ec2-54-201-123-10.us-west-2.compute.amazonaws.com:5000/edit_qstn_response', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: this.props.userid,
                answers: responses
            }),
        })
            .then(() => Toast.show({
                text: "Reponses Saved!",
                buttonText: "Okay",
                type: "success",
                duration: 3000
            }))
            .catch(() => Toast.show({
                text: "Unable to save responses!",
                buttonText: "Okay",
                type: "danger",
                duration: 3000
            }))

    }
    render() {
        return (
            <Root>
                <Container style={{ backgroundColor: '#2D2F33' }}>
                    <Content>
                        <List dataArray={this.state.questions}
                            renderRow={(question) =>
                                <ListItem style={{ backgroundColor: '#2D2F33', width: '100%' }}>
                                    <Container style={{ height: 90, width: '100%', backgroundColor: '#2D2F33' }}>
                                        <Content>
                                            <Text style={{ color: 'white' }}>{question.qst}</Text>
                                            <Picker
                                                key={question.q_id}
                                                mode="dropdown"
                                                style={{ width: '100%', color: 'white' }}
                                                note={false}
                                                selectedValue={this.state.selectedValue[question.q_id]}
                                                onValueChange={this.onSelect.bind(this, question.q_id)}
                                            >
                                                <Picker.Item label="Select answer" value="0" />
                                                <Picker.Item label="Yes" value="Yes" />
                                                <Picker.Item label="No" value="No" />
                                            </Picker>
                                        </Content>
                                    </Container>
                                </ListItem>
                            }>
                        </List>
                        <Button block style={{ marginBottom: 50, backgroundColor: '#EA7149' }} onPress={this.onUpdate.bind(this)}><Text>Update</Text></Button>
                    </Content>
                </Container>
            </Root>
        );
    }
}

export default QuestionnaireScreen;