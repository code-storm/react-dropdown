import React, { Component } from "react";
import Drowdown from "./Dropdown";
import "./Dropdown.css";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    name: "Flipkart",
                    value: "flipkart",
                    selected: false
                },
                {
                    id: 2,
                    name: "Uber",
                    value: "uber",
                    selected: false
                },
                {
                    id: 3,
                    name: "Snapdeal",
                    value: "snapdeal",
                    selected: false
                },
                {
                    id: 4,
                    name: "Linkedin",
                    value: "linkedin",
                    selected: false
                },
            ],
            data2: [
                {
                    id: 1,
                    name: "Option 1",
                    value: "Option 1",
                    selected: false
                },
                {
                    id: 2,
                    name: "Option 2",
                    value: "Option 2",
                    selected: false
                },
                {
                    id: 3,
                    name: "Option 3",
                    value: "Option 3",
                    selected: false
                },
                {
                    id: 4,
                    name: "Option 4",
                    value: "Option 4",
                    selected: false
                },
            ],
            allowSelection: true,
            mySelectedItems1: [],
            mySelectedItems2: [],
            mySelectedItems3: [],
            groupsData: [
                {
                    id: 1,
                    name: 'INITIAL INTEREST',
                    value: '',
                    children: [
                        {
                            id: 1,
                            name: "Shortlisted",
                            value: "shortlisted",
                            selected: false
                        },
                        {
                            id: 2,
                            name: "Reached Out",
                            value: "reached Out",
                            selected: false
                        },
                        {
                            id: 3,
                            name: "In-Talks",
                            value: "in-talks",
                            selected: false
                        }
                    ],
                },
                {
                    id: 2,
                    name: 'HIGH INTEREST',
                    children: [
                        {
                            id: 1,
                            name: "P1",
                            value: "p1",
                            selected: false
                        },
                        {
                            id: 2,
                            name: "P2",
                            value: "p2",
                            selected: false
                        },
                        {
                            id: 3,
                            name: "P3 - P5",
                            value: "p3 - p5",
                            selected: false
                        }
                    ],
                    value: ''
                },
                {
                    id: 3,
                    name: 'TERMSHEET',
                    children: [
                        {
                            id: 1,
                            name: "In Progress",
                            value: "in progress",
                            selected: false
                        }
                    ],
                    value: ''
                }
            ]
        };
        this.onDropdownSelection1 = this.onDropdownSelection1.bind(this);
        this.onDropdownSelection2 = this.onDropdownSelection2.bind(this);
        this.onDropdownSelection3 = this.onDropdownSelection3.bind(this);
    }

    onDropdownSelection1(items) {
        this.setState({
            mySelectedItems1: items
        })
    }

    onDropdownSelection2(items) {
        this.setState({
            mySelectedItems2: items
        })
    }
    onDropdownSelection3(items) {
        this.setState({
            mySelectedItems3: items
        })
    }

    render() {
        return (
            <div className="App">
                <div style={{ border: 'solid 1px', margin: '10px', wordWrap: 'break-word' }}>
                    <h1>
                        Parent Component
                </h1>
                    <div>
                        <div>
                            <code>Selection 1 => : {JSON.stringify(this.state.mySelectedItems1)}
                            </code>
                        </div>
                        <div>
                            <code> Selection 2 => : {JSON.stringify(this.state.mySelectedItems2)}</code>
                        </div>
                        <div>
                            <code>Selection 3 => : {JSON.stringify(this.state.mySelectedItems3)}</code>
                        </div>
                    </div>
                </div>
                <Drowdown placeholder={'Company'} items={this.state.data2} allowMultiselect={false} onSelect={this.onDropdownSelection1} />
                <Drowdown placeholder={'Company'} items={this.state.data} allowMultiselect={true} allowSelectAll={true} onSelect={this.onDropdownSelection2} />
                <Drowdown placeholder={'Company'} groupItems={this.state.groupsData} allowGrouping={true} allowMultiselect={false} allowSelectAll={true} onSelect={this.onDropdownSelection3} />

            </div >
        )
    }
}

export default App;