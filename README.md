## React Custom Dropdown

Non-prescriptive React.js dropdown toolkit.

[See it in action (Demo)](https://code-storm.github.io/react-dropdown/)

### Installation

You can easily install it with

```bash
git clone https://github.com/code-storm/react-dropdown.git
```

### How to use

This dropdown provides following Dropdown features that you can use as a basis for any kind of dropdown menu:

- `Single Select`: Single-select dropdown.
- `Multi Select`: Contains multi-select options for multi-select dropdowns.
- `Grouping with Single Select`: Single-select options on the basis of groups. 
- `Show Selections in Placeholder`: Contains the "selected" options name of your dropdown in the placeholder.


```js
/* without groups */
<Drowdown placeholder={'Company'} items={this.state.data} allowMultiselect={true} allowSelectAll={true} onSelect={this.onDropdownSelection} />

/* for Groups */
<Drowdown placeholder={'Company'} groupItems={this.state.groupsData} allowGrouping={true} allowMultiselect={false} allowSelectAll={true} onSelect={this.onDropdownSelection} />

```

### Options

Options can be passed to `Dropdown` as props. A list of available options can be found below. These must be passed to the containing `Dropdown` component.

Property | Type | Description
----- | ----- | -----
**items** | *Array* | Provide data for Single/Multi-Select dropdown `(NOT FOR GROUP OPTIONS)`.
**groupItems** | *Array* | Provide data for Single Select Group dropdown `(ONLY FOR GROUP OPTIONS)`.
**allowGrouping** | *boolean* | `Required with groupItems property` to allow Grouping within the dropdown `(ONLY FOR GROUP OPTIONS)`.
**allowMultiselect** | *boolean* | To allow multiselect feature in dropdown.
**allowSelectAll** | *boolean* | Provide Select All option with `Multi-select` dropdown.
**placeholder** | *string* | Placeholder heading for dropdown.
**onSelect** | *function* | Callback for `Dropdown selection event` with list of selected items as response.


### Properties Schema

Each instance of `Dropdown` has `items` || `groupItems` property and their schemas are as follow:

```js
var items = [
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
];
// id and name are Required fields.
var groupItems = [
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
          }
      ],
      value: ''
  }
];
            


```