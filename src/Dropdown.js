import React, { Component } from "react";

class Drowdown extends Component {
    constructor(props) {
        super(props);
        this.eachCheckBoxLi = this.eachCheckBoxLi.bind(this);
        this.eachRadioLi = this.eachRadioLi.bind(this);
        this.eachGroup = this.eachGroup.bind(this);
        this.state = {
            selectedItems: [],
            selectedString: '',
            isOpen: false
        }
        this.onSelectListItem = this.onSelectListItem.bind(this);
        this.toggleList = this.toggleList.bind(this);
        this.showSelectedItemString = this.showSelectedItemString.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.renderMuliSelect = this.renderMuliSelect.bind(this);
    }
    componentWillMount() {
        this.selectAllListItem = {
            name: 'Select All',
            id: -1,
            value: 'select all',
            selected: false
        }
        this.ddCount = 0;
    }
    eachCheckBoxLi(item, index) {
        return (
            <li key={index} id={'item-' + item.id} className="list-item" >
                <label className="checkmark" htmlFor={'t' + index}>
                    <input onChange={this.onSelectListItem.bind(this, item)} type="checkbox" id={'t' + index} checked={item.selected} />
                    {item.name}
                </label>
            </li>
        )
    }

    eachRadioLi(item, index) {
        return (
            <li key={index} id={'item-' + item.id} className={item.selected ? 'list-item active' : 'list-item'} >
                <label className="radiomark" htmlFor={'t' + index}>
                    <input onChange={this.props.selectCheckbox.bind(this, item.id)} name={'t1'} type="radio" id={'t' + index} checked={item.selected} style={{ visibility: 'hidden' }} />
                    {item.name}
                </label>
            </li>
        )
    }

    eachGroup(group, index) {
        return (
            <li className="groupLi" key={index}>
                <div className="groupDiv"> {group.groupName} </div>
                <ul>
                    {group.children.map(this.eachCheckBoxLi)}
                </ul>
            </li>
        )
    }

    toggleList() {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }))
    }

    onSelectListItem(item, e) {
        this.props.toggler(item.id);
        if (e.target.checked) {
            this.addToSelectedData(item);
        } else {
            this.removeSelectedData(item);
        }
    }

    addToSelectedData(item) {
        this.setState((prevState) => {
            console.log(this.state, prevState);
            return {
                selectedItems: [...prevState.selectedItems, item]
            }
        });
    }

    removeSelectedData(item) {
        this.setState((prevState) => {
            return {
                selectedItems: prevState.selectedItems.filter(sItem => sItem.id !== item.id)
            }
        });
    }

    showSelectedItemString() {
        var str = '';
        if (this.state.selectedItems.length) {
            if (this.state.selectedItems.length === 1) {
                str += this.state.selectedItems[0].name;
            } else {
                const len = this.state.selectedItems.length;
                this.state.selectedItems.forEach((item, index) => {
                    if (index === len - 1) {
                        str += item.name;
                    } else {
                        str += item.name + ', ';
                    }
                });
            }
        }
        return str;
    }

    onSelectAll(e) {
        this.props.selectAll(e.target.checked);
    }

    renderMuliSelect() {
        if (this.props.allowGrouping) {
            return (<ul className="mainUl">
                {this.props.groupItems.map(this.eachGroup)}
            </ul>)
        } else {
            return (
                <ul className="mainUl">
                    {this.props.allowSelectAll &&
                        <li className="select-all" >
                            <label className="checkmark" htmlFor={'x-select-all'}>
                                <input onChange={this.onSelectAll} type="checkbox" id={'x-select-all'} />
                                Select All
                        </label>
                        </li>}
                    {this.props.items.map(this.eachCheckBoxLi)}
                </ul>
            )
        }
    }

    renderDisplay() {
        if (this.props.allowMultiselect) {
            return this.renderMuliSelect()
        } else {
            return (<ul className="mainUl">
                {this.props.items.map(this.eachRadioLi)}
            </ul>)
        }
    }

    render() {
        return (
            <div className="dropdowncomponent">
                <div className="heading" onClick={this.toggleList}>{this.props.heading}</div>
                {this.state.isOpen && this.renderDisplay()}
                <h2>Selected</h2>
                {this.showSelectedItemString()}

                {JSON.stringify(this.props.mySelectedItems)}
                {[this.props.mySelectedItems].map(this.eachCheckBoxLi)}
            </div>
        )
    }
}

export default Drowdown;