import React, { useState } from 'react';
import { TextField, TextFieldProps, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller, Control, FieldValues } from 'react-hook-form';

type ControlledPasswordFieldProps = TextFieldProps & {
	name: string;
	control: Control<FieldValues>;
	label: string;
};

const ControlledPasswordField: React.FC<ControlledPasswordFieldProps> = ({
	name,
	control,
	label,
	helperText,
	...rest
}) => {
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
					{...field} // name, value, onChange, onBlur от RHF
					{...rest} // fullWidth, margin, rules и т.д.
					label={label}
					margin="normal"
					fullWidth
					// Устанавливаем тип поля: 'text' если видим, 'password' если скрыт
					type={showPassword ? 'text' : 'password'}
					// Обработка ошибок
					error={!!error}
					helperText={error ? error.message : helperText}
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

export default ControlledPasswordField;
