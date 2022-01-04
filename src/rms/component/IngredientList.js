import React from "react";
import {Button, Table} from "semantic-ui-react";

class IngredientList extends React.Component {
    render() {
        const { tableData, action } = this.props;

        const headerRow = ['Name', 'Quantity', 'Add']

        const renderBodyRow = ({ name, quantity, add }, i) => ({
            key: name || `row-${i}`,
            warning: !!(quantity && quantity < 5),
            cells: [
                name || 'No name specified',
                quantity ? { key: 'quantity', icon: 'attention', content: quantity } : 'Unknown',
                <Button content="Add" onClick={name => action.handleAddIngredientClicked(name)} />,
            ],
        })

        return (
            <Table
                celled
                headerRow={headerRow}
                renderBodyRow={renderBodyRow}
                tableData={tableData}
            />
        );
    }
}

export default IngredientList;