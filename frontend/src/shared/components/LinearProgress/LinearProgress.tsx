import React from 'react';
import LinearProgressMUI, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
//@ts-ignore
import { LinearProgressProps } from '@mui/material/LinearProgress/LinearProgress';

const BorderLinearProgress = styled(LinearProgressMUI)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[200],
		...theme.applyStyles('dark', {
			backgroundColor: theme.palette.grey[800],
		}),
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: '#1a90ff',
		...theme.applyStyles('dark', {
			backgroundColor: '#308fe8',
		}),
	},
}));

export const LinearProgress = ({ value }: LinearProgressProps) => {
	return (
		<BorderLinearProgress variant="determinate" value={value} />
	);
};

