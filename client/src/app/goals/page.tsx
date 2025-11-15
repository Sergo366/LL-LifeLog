'use client'
import { Button } from '@mui/material';
import React, { Fragment } from 'react';
import classes from './styles.module.css'
import { LinearProgress } from '@/shared/components/LinearProgress';

const GoalsPage = () => {
	const data = [
		{
			id: 0,
			name: 'Buy new trainers',
			dueDate: '2025/12/31',
			progress: 50,
			createdAt: '2025/10/19',
			progressState: 'progress',
		},
	];
	return (
		<div className={classes.wrapper}>
			<div className={classes.goalHeader}>
				<Button variant="outlined">Add new goal</Button>
			</div>
			<div className={classes.goalContent}>
				{data.map((goal) => (
					<Fragment key={goal.id}>
						<div className={classes.element}>
							{goal.name}
							{goal.createdAt}
							<p>Due date - {goal.dueDate}</p>

							<div className={classes.elementActions}>
								<Button variant={'outlined'} color={'info'}>
									Update
								</Button>
								<Button variant={'outlined'} color="error">
									Delete
								</Button>
							</div>
						</div>
						<LinearProgress value={goal.progress} />
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default GoalsPage;
