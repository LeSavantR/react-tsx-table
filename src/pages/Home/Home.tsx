import { people } from '@/data/people';
import { addPeople } from '@/redux';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PeopleTable } from './components';
export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(addPeople(people))
	}, []);

	return (
		<PeopleTable />
	);
};

export default Home;
