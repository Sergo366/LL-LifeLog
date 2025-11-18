'use client';

import { useState } from 'react';
import { TextField, TextFieldProps, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

type ControlledPasswordFieldProps<TFieldValues extends FieldValues> = TextFieldProps & {
	name: Path<TFieldValues>;
	control: Control<TFieldValues>;
	label: string;
};

export const PasswordField = <TFieldValues extends FieldValues>({
	name,
	control,
	label,
	helperText,
	...rest
}: ControlledPasswordFieldProps<TFieldValues>) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

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
					type={showPassword ? 'text' : 'password'}
					error={!!error}
					helperText={error ? error.message : helperText}
					InputLabelProps={{
						shrink: true,
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			)}
		/>
	);
};
