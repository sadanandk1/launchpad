import React, { Component } from 'react';
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { Link } from 'react-router-dom';
import { Toolbar, Data } from "react-data-grid-addons";
//import 'ag-grid-community/dist/styles/ag-grid.css';
//import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from 'axios';

const defaultColumnProperties = {
  sortable: true,
  filterable: true,
  width: 160
};

const withErrorHandling = WrappedComponent => ({ showError, children }) => {
  return (
    <WrappedComponent>
      {showError && <div className="error-message">Oops! Something went wrong!</div>}
      {children}
    </WrappedComponent>
  );
};

const selectors = Data.Selectors;

const rowActions =(row,pThis) => { return (

[
  {
   icon: <Link className="edit-link" to="/crop-list"> Save </Link>,
    callback: () => {
      if(row._id !== '-1'){
      axios.put('http://localhost:4000/parcel/' + row._id, row)
      .then((res) => {
        console.log(res.data)
        console.log('Parcel successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    }else{
      delete row['_id']
      axios.post('http://localhost:4000/parcel/' , row)
      .then((res) => {
        console.log(res.data)
        console.log('Parcel created successfully')
      }).catch((error) => {
        console.log(error)
      })

      alert("Saving"+row._id+row.name);
      pThis.componentDidMount();
    }
  }
  },
  {
    icon: <Link className="edit-link" to="/crop-list" > Delete </Link>,
    callback: () => {

        axios.delete('http://localhost:4000/parcel/' + row._id)
            .then((res) => {
                console.log('parcel successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
       const rows = [...pThis.state.rowData];
       rows.splice(row.index, 1); //
       pThis.setState({ rowData: rows });
      alert("Deleting"+row._id+row.name);
      pThis.componentDidMount();
    }
  }
]);
}





export default class CropList extends Component {
  
  constructor(props) {
    super(props);
    this.onAddNew = this.onAddNew.bind(this);

    this.state = {
      columns: [{
        name: "Name", key: "name", editable: true
      }, {
        name: "Size", key: "size",editable: true
      }, {
        name: "Metric", key: "metric",editable: true
      },
      {
        name: "Actions", key: "action"
      }

    ].map(c => ({ ...c, ...defaultColumnProperties })),
      rowData: [{
        name: "Toyota", size: "Celica", metric: 35000
      }],
      filters:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/parcel/')
      .then(res => {
        this.setState({
          rowData: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }




onAddNew(){
  this.state.rowData.push({_id:'-1'})
}

handleFilterChange = filter  => {
  const newFilters = { ...this.state.filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

sortRows = (rows, sortColumn, sortDirection) => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? rows : [...rows].sort(comparer);
};

 
getCellActions = (column, row) =>  {

 
  //console.log(column.key);
  if(column.key==='action'){
    console.log(column.key);
    return rowActions(row,this);
  }
  else return null;
  //return cellActions[column.key];
}

onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
  this.setState(state => {
    const rows = state.rowData.slice();
    for (let i = fromRow; i <= toRow; i++) {
      rows[i] = { ...rows[i], ...updated };
    }
    return { rowData:rows };
  });
};

onGridSort=(sortColumn, sortDirection) =>{
  const rows=this.sortRows(this.state.rowData, sortColumn, sortDirection);
  alert(rows.length)
  this.setState({rowData:rows});
}

setFilters=(filters)=>this.setState({filters:filters});

getRows= (rows,filters) => {
  return selectors.getRows({ rows, filters });
}

selectRow=(i)=>{
  const rows = this.getRows(this.state.rowData,this.state.filters)
  return rows[i];
}


render() {
    return (
<div>
<Link className="edit-link" onClick={this.onAddNew} > New </Link>
    <ReactDataGrid
        columns={this.state.columns}
        rowGetter={(i)=>{ return this.selectRow(i)}}
        rowsCount={50}
        minHeight={500}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
        getCellActions={this.getCellActions}
        onGridSort={this.onGridSort}
        toolbar={<Toolbar enableFilter={true} />}
        onAddFilter={filter => this.setFilters(this.handleFilterChange(filter))}
        onClearFilters={() => this.setFilters({})}
      />
      </div>
    );
  }
}

