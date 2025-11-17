import React from 'react';
import { TextField as MuiTextFiled, TextFieldProps } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form'; // Import FieldValues and Path

type ControlledTextFieldProps<TFieldValues extends FieldValues> = TextFieldProps & {
	name: Path<TFieldValues>;
	control: Control<TFieldValues>;
	label: string;
};

export const TextField = <TFieldValues extends FieldValues>({
	name,
	control,
	label,
	...rest
}: ControlledTextFieldProps<TFieldValues>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<MuiTextFiled
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
