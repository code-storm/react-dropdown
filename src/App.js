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
            allowSelection: true,
            mySelectedItems: [],
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
        // this.toggleSelected = this.toggleSelected.bind(this);
        this.selectCheckbox = this.selectCheckbox.bind(this);
        this.onDropdownSelection = this.onDropdownSelection.bind(this);
    }

    // toggleSelected(itemId) {
    //     this.setState((prevState) => {
    //         const items = prevState.data;
    //         return {
    //             data: items.map(item => item.id !== itemId ? item : { ...item, selected: !item.selected })
    //         }
    //     })
    // }

    onDropdownSelection(items) {
        this.setState({
            mySelectedItems: items
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


    render() {
        return (
            <div className="App">
                <h1>
                    Parent Component
                </h1>
                <h2>
                    Selection => : {JSON.stringify(this.state.mySelectedItems)}
                </h2>
                <Drowdown placeholder={'Company'} items={this.state.data} allowMultiselect={false} allowSelectAll={true} onSelect={this.onDropdownSelection} />
                <Drowdown placeholder={'Company'} items={this.state.data} allowMultiselect={true} allowSelectAll={true} onSelect={this.onDropdownSelection} />
                <Drowdown placeholder={'Company'} groupItems={this.state.groupsData} allowGrouping={true} allowMultiselect={false} allowSelectAll={true} onSelect={this.onDropdownSelection} />

            </div>
        )
    }
}

export default App;