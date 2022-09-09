import { Person } from '@/models';
import { deleteFavorite } from '@/redux';
import { AppStore } from '@/redux/store';
import { Checkbox, IconButton } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { Delete } from '@mui/icons-material';


export interface FavoriteTableInterface {}

const FavoriteTable: React.FC<FavoriteTableInterface> = () => {
	const dispatch = useDispatch();

	const storedFavorite = useSelector((store: AppStore) => store.favorites)

	const handleClick = (person: Person) => {
		dispatch(deleteFavorite(person));
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
				<IconButton color='secondary' onClick={() => handleClick(params.row)} >
					<Delete/>
				</IconButton>
			}</>)
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
	]

	return <DataGrid
			rows={storedFavorite}
			columns={columns}
			disableColumnSelector
			disableSelectionOnClick
			autoHeight
			pageSize={pageSize}
			rowsPerPageOptions={[pageSize]}
			getRowId={(row: any) => row.id}
		/>;
};

export default FavoriteTable;