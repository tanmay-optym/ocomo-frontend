import React, { forwardRef } from 'react';
import MaterialTable, { Column, MTableBodyRow } from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import InputTableEdit from './InputTableEdit';
import resourcePlanData from '../../../../fakeData/resourcePlanData';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
interface Row {
  name: string;
  surname: string;
  birthYear: number;
  birthCity: number;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

const TableEditResourcePlan = (): React.FC => {
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'Shop', field: 'shopName', editable: 'never' },
      { title: 'Region', field: 'regionName', editable: 'never' },
      {
        title: 'Desired Unplanned',
        field: 'desiredUnplanned',
        type: 'numeric',
        editComponent: (props) => (
          <InputTableEdit
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        )
      },
      {
        title: 'Special Capability',
        field: 'specialCapability',
        editComponent: (props) => (
          <InputTableEdit
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        )
      },
      {
        title: 'Prohibited Maint. Type',
        field: 'prohibitedMaintType',
        editComponent: (props) => (
          <InputTableEdit
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        )
      },
      {
        title: 'M-F Work Hours',
        field: 'mfWorkHours',
        type: 'numeric',
        editComponent: (props) => (
          <InputTableEdit
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        )
      },
      {
        title: 'Sat Work Hours',
        field: 'satWorkHours',
        type: 'numeric',
        editComponent: (props) => (
          <InputTableEdit
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        )
      },
      {
        title: 'Sun Work Hours',
        field: 'sunWorkHours',
        type: 'numeric',
        editComponent: (props) => (
          <InputTableEdit
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        )
      }
    ],
    data: resourcePlanData
  });

  return (
    <MaterialTable
      icons={tableIcons}
      options={{
        search: false,
        paging: false,
        rowStyle: (rowData, index) => {
          if (index % 2 === 0) {
            return { backgroundColor: '#F6F6F6' };
          } else {
            return { backgroundColor: '#FFF' };
          }
        },
        cellStyle: () => {
          return { border: 0 };
        }
      }}
      components={{
        Row: (props) => (
          <MTableBodyRow
            {...props}
            onDoubleClick={(e) => {
              console.log(props.actions);
              props.actions[0]().onClick(e, props.data);
            }}
          />
        )
      }}
      title=""
      columns={state.columns}
      data={state.data}
      actions={[]}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          })
      }}
    />
  );
};

export default TableEditResourcePlan;
