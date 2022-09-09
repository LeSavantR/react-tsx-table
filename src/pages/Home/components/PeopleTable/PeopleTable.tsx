import { Person } from '@/models';
import { addFavorite } from '@/redux';
import { AppStore } from '@/redux/store';
import { Checkbox } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export interface PeopleTableInterface {}

const PeopleTable: React.FC<PeopleTableInterface> = () => {
	const [ selectedPeople, setselectedPeople ] = React.useState<Person[]>([]);
	const dispatch = useDispatch();

	const storedPeople = useSelector((store: AppStore) => store.people)
	const storedFavorite = useSelector((store: AppStore) => store.favorites)

	const findPerson = (person: Person) => !!storedFavorite.find(p => p.id === person.id)
	const filterPerson = (person: Person) => storedFavorite.filter(p => p.id !== person.id)

	const handleChange = (person: Person) => {
		const filteredPeople = findPerson(person) ? filterPerson(person) : [... selectedPeople, person];
		dispatch(addFavorite(filteredPeople));
		setselectedPeople(filteredPeople)
	}

	const pageSize = 5;
	const columns = [
		{
			field: 'actions',
			headerName: '',
			type: 'actions',
			sortable: false,
			width: 20,
			renderCell: (params: GridRenderCellParams) => (<>{
					<Checkbox size='small' checked={findPerson(params.row)} onChange={() => handleChange(params.row)} />
				}</>
			)
		},
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams)=> <>{params.value}</>
		},
		{
			field: 'category',
			headerName: 'Category',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams)=> <>{params.value}</>
		},
		{
			field: 'company',
			headerName: 'Company',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams)=> <>{params.value}</>
		},
		{
			field: 'levelOfHappiness',
			headerName: 'Level Of Happiness',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams)=> <>{params.value}</>
		},
	]

	useEffect(() => {
		setselectedPeople(storedFavorite)
	}, [storedFavorite]);

	return <DataGrid
			rows={storedPeople}
			columns={columns}
			disableColumnSelector
			disableSelectionOnClick
			autoHeight
			pageSize={pageSize}
			rowsPerPageOptions={[pageSize]}
			getRowId={(row: any) => row.id}
		/>;
};

export default PeopleTable;

