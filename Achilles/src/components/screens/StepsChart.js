import React, { Component } from 'react';
import moment from 'moment';
import { Container, Content, Header, Text, Spinner, DatePicker } from 'native-base';
import { Row, Grid, Col } from "react-native-easy-grid";
import { VictoryBar, VictoryChart, VictoryArea, VictoryTheme, VictoryLabel, VictoryAxis, VictoryLine } from "victory-native";
import _ from 'lodash';

class StepsChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: [],
            floors: [],
            minutes_of_intense_activity: [],
            minutes_of_moderate_activity: [],
            steps: [],
            loading: true,
            reportDateSelected: new Date()
        }
    }
    showChart() {
        if (this.state.loading) {
            return (<Spinner />)
        }
        else {
            return (
                <Container>
                    <Content>
                        <Grid >
                            <Row size={0.55} >
                                <VictoryChart width={375} height={300} theme={VictoryTheme.material} minDomain={{ x: 1 }} >
                                    <VictoryAxis tickLabelComponent={<VictoryLabel angle={30} />} />
                                    <VictoryArea style={{ data: { fill: "#c43a31" } }} data={this.state.steps} x="date" y="steps" labels={(datum) => datum.steps}
                                        labelComponent={<VictoryLabel renderInPortal dy={-15} />} />
                                </VictoryChart>
                            </Row>
                            <Row size={0.1} style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#F9975E' }}>
                                <Col size={0.65}>
                                    <Text>  Fetch 7-day history from:</Text>
                                </Col>
                                <Col size={0.35}>
                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={new Date(2018, 1, 1)}
                                        maximumDate={new Date()}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText={moment(this.state.reportDateSelected).format('MM-DD-YYYY')}
                                        textStyle={{ color: "green" }}
                                        placeHolderTextStyle={{ color: "green" }}
                                        onDateChange={this.updateChart.bind(this)}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </Content>
                </Container >)
        }
    }
    componentWillMount() {
        // Get data for user from DB
        end_date = moment(this.state.reportDateSelected).subtract(3, 'year').format('MM-DD-YYYY');
        start_date = moment(this.state.reportDateSelected).subtract(3, 'year').subtract(6, 'day').format('MM-DD-YYYY');
        //console.log(`http://ec2-54-201-123-10.us-west-2.compute.amazonaws.com:5000/get_daily_health_data?userid=2134225533&start_date=${start_date}&end_date=${end_date}`)
        fetch(`http://ec2-54-201-123-10.us-west-2.compute.amazonaws.com:5000/get_daily_health_data?userid=2134225533&start_date=${encodeURIComponent(start_date)}&end_date=${encodeURIComponent(end_date)}`)
            .then((result) => result.json())
            .then((result) => {
                let steps = [];
                _.map(result, (value, key) => {
                    steps.push({ 'date': moment(key).add(3, 'year').format('YYYY-MM-DD'), 'steps': value.steps })
                })
                steps.sort((a, b) => { if (a.date > b.date) { return 1; } else return -1 })
                this.setState({ steps: steps, loading: false })
            })
            .catch((error) => console.log(error))

    }
    updateChart(selectedDate) {
        this.setState({ reportDateSelected: selectedDate, loading: true }, () => {
            end_date = moment(this.state.reportDateSelected).subtract(3, 'year').format('MM-DD-YYYY');
            start_date = moment(this.state.reportDateSelected).subtract(3, 'year').subtract(6, 'day').format('MM-DD-YYYY');
            fetch(`http://ec2-54-201-123-10.us-west-2.compute.amazonaws.com:5000/get_daily_health_data?userid=2134225533&start_date=${encodeURIComponent(start_date)}&end_date=${encodeURIComponent(end_date)}`)
                .then((result) => result.json())
                .then((result) => {
                    let steps = [];
                    _.map(result, (value, key) => {
                        steps.push({ 'date': moment(key).add(3, 'year').format('YYYY-MM-DD'), 'steps': value.steps })
                    })
                    steps.sort((a, b) => { if (a.date > b.date) { return 1; } else return -1 })
                    this.setState({ steps: steps, loading: false })
                })
                .catch((error) => console.log(error))
        });
    }
    render() {
        return (
            <Container style={styles.container}>
                {this.showChart()}
            </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
};

export default StepsChart;