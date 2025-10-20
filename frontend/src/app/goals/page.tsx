'use client'
import { Button } from '@mui/material';
import React from 'react';
import classes from './styles.module.css'

const GoalsPage = () => {
	const data = [
		{id: 0, name: 'Buy new trainers', dueDate: '2025/12/31', createdAt: '2025/10/19', progressState: 'progress' },
	]
  return <div className={classes.wrapper}>
		<div className={classes.goalHeader}>
			<Button variant="outlined">Add new goal</Button>
		</div>
		<div className={classes.goalContent}>
			{data.map((goal, index) => (
				<div key={goal.id} className={classes.element}>
					{index}
					{goal.name}
					{goal.dueDate}
					{goal.createdAt}
					<Button variant={'outlined'} color={'info'}>Update</Button>
					<Button variant={'outlined'} color="error">Delete</Button>
				</div>
			))}
		</div>
	</div>;
};

export default GoalsPage;
