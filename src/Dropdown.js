import React, { Component } from "react";

class Drowdown extends Component {
    constructor(props) {
        super(props);
        this.eachCheckBoxLi = this.eachCheckBoxLi.bind(this);
        this.eachRadioLi = this.eachRadioLi.bind(this);
        this.eachGroup = this.eachGroup.bind(this);
        this.state = {
            items: props.items,
            groupItems: props.groupItems,
            selectedItems: [],
            selectedString: '',
            isOpen: false,
            selectAllListItem: {
                name: 'Select All',
                id: -1,
                value: 'select all',
                selected: false
            }
        }
        this.afterSelect = this.afterSelect.bind(this);
        this.onSingleSelectListItem = this.onSingleSelectListItem.bind(this);
        this.onMultiSelectListItem = this.onMultiSelectListItem.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.showSelectedItemString = this.showSelectedItemString.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.renderMuliSelect = this.renderMuliSelect.bind(this);
        this.renderSingleSelect = this.renderSingleSelect.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        // create Ref
        this.dropdownNode = React.createRef();
    }
    componentWillMount() {
        this.selectAllListItem = {
            name: 'Select All',
            id: -1,
            value: 'select all',
            selected: false
        }
        this.ddCount = 0;
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        event.stopPropagation();
        console.log(this.dropdownNode);
        const dropdowncontainer = this.dropdownNode.current;
        if (!dropdowncontainer) {
            return;
        }
        const { target } = event;
        if (target !== dropdowncontainer && !dropdowncontainer.contains(target)) {
            this.setState({
                isOpen: false
            });
        }
    }

    eachCheckBoxLi(item, index) {
        return (
            <li key={index} id={'item-' + item.id} className="list-item" >
                <input className="styled-checkbox" onChange={this.onMultiSelectListItem.bind(this, item)} type="checkbox" id={'t-' + item.id} checked={item.selected} />
                <label className="checkmark" htmlFor={'t-' + item.id}>
                    {item.name}
                </label>
            </li>
        )
    }

    eachRadioLi(item, index) {
        return (
            <li key={index} id={'item-' + item.id} className={item.selected ? 'list-item active' : 'list-item'} >
                <label className="radiomark" htmlFor={'t-' + item.id}>
                    <input onChange={this.onSingleSelectListItem.bind(this, item)} name={'t1'} type="radio" id={'t-' + item.id} checked={item.selected} style={{ visibility: 'hidden' }} />
                    {item.name}
                </label>
            </li>
        )
    }

    eachGroup(group, index) {
        return (
            <li className="groupLi" key={index}>
                <div className="groupDiv"> {group.name} </div>
                <ul>
                    {group.children.map(this.eachRadioLi)}
                </ul>
            </li>
        )
    }

    toggleDropdown(e) {
        if (e) {
            e.stopPropagation();
        }
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }))
    }

    onMultiSelectListItem(item, e) {
        this.setState(prev => ({
            items: prev.items.map(prevItem => prevItem.id === item.id ? { ...prevItem, selected: !prevItem.selected } : prevItem)
        }), () => {
            const mySelectedItems = this.state.items.filter(i => i.selected);
            this.setState({
                selectedItems: mySelectedItems
            }, this.afterSelect)
        })
        this.setState(prevState => ({
            selectAllListItem: { ...prevState.selectAllListItem, selected: false }
        }))
    }

    onSingleSelectListItem(item, e) {
        if (!this.props.allowGrouping) {
            this.setState(prevState => ({
                items: prevState.items.map(i => {
                    if (i.id === item.id) {
                        i.selected = true;
                    } else {
                        i.selected = false;
                    }
                    return i;
                })
            }), () => {
                const mySelectedItem = this.state.items.filter(i => i.selected);
                this.setState({
                    selectedItems: mySelectedItem
                }, this.afterSelect)
            })
        } else {
            let changed = false;
            const mySelectedItem = [];
            this.setState(prevState => (
                {
                    groupItems: prevState.groupItems.map(group => {
                        if (!changed) {
                            group.children = group.children.map(eachItem => {
                                if (eachItem.id === item.id) {
                                    eachItem.selected = true;
                                    changed = true;
                                    mySelectedItem.push(eachItem);
                                } else {
                                    eachItem.selected = false;
                                }
                                return eachItem;
                            });
                        }
                        return group;
                    })
                }), () => {
                    this.setState({
                        selectedItems: mySelectedItem
                    }, this.afterSelect)
                })
        }
        this.toggleDropdown();
    }

    afterSelect() {
        this.props.onSelect([...this.state.selectedItems]);
    }

    onSelectAll(e) {
        const isChecked = e.target.checked;
        this.setState((prevState) => {
            return {
                items: prevState.items.map(item => {
                    item.selected = isChecked;
                    return item;
                })
            }
        }, () => {
            const mySelectedItems = this.state.items.filter(i => i.selected);
            this.setState({
                selectedItems: mySelectedItems
            }, this.afterSelect)
        })
        this.setState(prevState => ({
            selectAllListItem: { ...prevState.selectAllListItem, selected: !prevState.selectAllListItem.selected }
        }))
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
        return str || this.props.placeholder;
    }



    renderMuliSelect() {
        return (
            <ul className="mainUl">
                {this.props.allowSelectAll &&
                    <li className="select-all list-item" >
                        <input onChange={this.onSelectAll} type="checkbox" className="styled-checkbox" id={'x-select-all'} checked={this.state.selectAllListItem.selected} />
                        <label className="checkmark" htmlFor={'x-select-all'}>
                            {this.selectAllListItem.name}
                        </label>
                    </li>}
                {this.state.items.map(this.eachCheckBoxLi)}
            </ul>
        )
    }

    renderSingleSelect() {
        if (this.props.allowGrouping) {
            return (<ul className="mainUl">
                {this.state.groupItems.map(this.eachGroup)}
            </ul>)
        } else {
            return (<ul className="mainUl">
                {this.state.items.map(this.eachRadioLi)}
            </ul>)
        }
    }

    renderDisplay() {
        if (!this.props.allowMultiselect) {
            return this.renderSingleSelect();
        } else {
            return this.renderMuliSelect();
        }
    }

    render() {
        return (
            <div className="dropdowncomponent" ref={this.dropdownNode}>
                <div className="heading ellipse" onClick={this.toggleDropdown}>{this.showSelectedItemString()}</div>
                {this.state.isOpen && this.renderDisplay()}
            </div>
        )
    }
}

export default Drowdown;