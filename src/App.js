import React, { Component } from "react";
import Drowdown from "./Dropdown";
import "./Dropdown.css";

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
            allowSelection: true,
            mySelectedItems: [],
            groupsData: [
                {
                    id: 1,
                    groupName: 'INITIAL INTEREST',
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
                    value: ''
                },
                {
                    id: 2,
                    groupName: 'HIGH INTEREST',
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
                    groupName: 'TERMSHEET',
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
        this.toggleSelected = this.toggleSelected.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.selectCheckbox = this.selectCheckbox.bind(this);
    }

    toggleSelected(itemId) {
        this.setState((prevState) => {
            const items = prevState.data;
            return {
                data: items.map(item => item.id !== itemId ? item : { ...item, selected: !item.selected })
            }
        })
    }

    selectCheckbox(itemId) {
        const myItems = [];
        this.setState((prevState) => {
            return {
                data: prevState.data.map(item => {
                    if (item.id === itemId) {
                        item.selected = true;
                        myItems.push(item);
                    } else {
                        item.selected = false;
                    }
                    return item;
                })
            }
        }, () => {
            this.setState({
                mySelectedItems: myItems
            });
        })
    }

    selectAll(newValue) {
        this.setState((prevState) => {
            return {
                data: prevState.data.map(item => {
                    item.selected = newValue;
                    return item;
                })
            }
        })
    }

    render() {
        return (
            <div className="App">
                <Drowdown heading={'Company'} items={this.state.data} allowMultiselect={false} allowSelectAll={true} toggler={this.toggleSelected} selectAll={this.selectAll} selectCheckbox={this.selectCheckbox} mySelectedItems={this.state.mySelectedItems} />
                <Drowdown heading={'Company'} groupItems={this.state.groupsData} allowMultiselect={true} allowGrouping={true} allowSelectAll={true} selectAll={this.selectAll} toggler={this.toggleSelected} selectCheckbox={this.selectCheckbox} mySelectedItems={this.state.mySelectedItems} />
            </div>
        )
    }
}

export default App;