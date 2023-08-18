import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { People } from "@/data";
import Checkbox from "@mui/material/Checkbox";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Person } from "@/models";
import { useDispatch } from "react-redux";
import { addFavorite, addPeople } from "@/redux/states";
import { AppStore } from "@/redux/store";
export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const people = useSelector((store: AppStore) => store.people);
  const dispatch = useDispatch();

  const findPerson = (person: Person) =>
    !!selectedPeople.find((p) => p.id === person.id);
  const filterPerson = (person: Person) =>
    selectedPeople.filter((p) => p.id !== person.id);

  const handleChange = (person: Person) => {
    const filtered = findPerson(person)
      ? filterPerson(person)
      : [...selectedPeople, person];
    dispatch(addFavorite(filtered));
    setSelectedPeople(filtered);
  };

  useEffect(() => {
    dispatch(addPeople(People));
  }, []);

  const columns = [
    {
      field: "actions",
      type: "actions",
      sortable: false,
      headerName: "",
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <Checkbox
              size="small"
              checked={findPerson(params.row)}
              onChange={() => handleChange}
            />
          }
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      width: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ];
  return (
    <DataGrid
      columns={columns}
      rows={people}
      disableColumnSelector
      disableRowSelectionOnClick
      autoHeight
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      getRowId={(row) => row.id}
    />
  );
};

export default Home;
