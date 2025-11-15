import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller, Control, FieldValues } from 'react-hook-form';

type ControlledTextFieldProps = TextFieldProps & {
	name: string;
	control: Control<FieldValues>;
	label: string;
};

const ControlledTextField: React.FC<ControlledTextFieldProps> = ({
	name,
	control,
	label,
	...rest
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					{...rest}
					label={label}
					margin="normal"
					fullWidth
					error={!!error}
					helperText={error ? error.message : rest.helperText}
				/>
			)}
		/>
	);
};

export default ControlledTextField;
