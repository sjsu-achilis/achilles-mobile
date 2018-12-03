import React, { Component } from 'react';
import { Root, Container, Content, List, ListItem, Thumbnail, Title, Item, Input, Header, Text, Card, Button, Label, Form, Picker, DatePicker, Toast, Textarea } from 'native-base';
import { PickerItem } from 'react-native';
class QuestionnaireScreen extends Component {
    static navigationOptions = {
        title: 'Questionnaire',
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
                    console.log(this.state.selectedValue);
                })
            }

        }
    }
    render() {
        return (
            <Root>
                <Container>
                    <Content>
                        <List dataArray={this.state.questions}
                            renderRow={(question) =>
                                <ListItem>
                                    <Container style={{ height: 50 }}>
                                        <Text>{question.qst}</Text>
                                        <Picker
                                            key={question.q_id}
                                            mode="dropdown"
                                            style={{ width: '100%' }}
                                            placeholderStyle={{ color: "#2874F0" }}
                                            note={false}
                                            selectedValue={this.state.selectedValue[question.q_id]}
                                            onValueChange={this.onSelect.bind(this, question.q_id)}
                                        >
                                            <Picker.Item label="Select answer" value="0" />
                                            <Picker.Item label="Yes" value="Yes" />
                                            <Picker.Item label="No" value="No" />
                                        </Picker>
                                    </Container>
                                </ListItem>
                            }>
                        </List>
                    </Content>
                </Container>
            </Root>
        );
    }
}

export default QuestionnaireScreen;