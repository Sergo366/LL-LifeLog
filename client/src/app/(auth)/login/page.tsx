'use client';

import { TextField } from '@/shared/components/TextField';
import { useForm } from 'react-hook-form';
import { PasswordField } from '@/shared/components/PasswordField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { formNames, LoginType, loginValidationSchema } from '@/app/(auth)/login/const';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/services/auth/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';

const LoginPage = () => {
	const { control, handleSubmit } = useForm<LoginType>({
		resolver: zodResolver(loginValidationSchema),
	});

	const { mutateAsync } = useMutation({
		mutationFn: loginUser,
	});

	const onSubmit = async (data: LoginType) => {
		console.log('Форма отправлена, данные:', data);
		return mutateAsync(data);
	};

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				bgcolor: 'rgba(145, 158, 171, 0.6)',
			}}
		>
			<Card
				sx={{
					width: '100%',
					maxWidth: 400,
					boxShadow: 8,
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						<Typography variant="h5" component="h1" gutterBottom align="center">
							Login into the system
						</Typography>

						<TextField
							placeholder={'Enter login'}
							name={formNames.login}
							control={control}
							label="Login"
						/>
						<PasswordField
							placeholder={'Enter password'}
							name={formNames.password}
							control={control}
							label="Password"
						/>

						<Button type={'submit'} variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
							Login
						</Button>
						<Button size="small" sx={{ mt: 1 }}>
							Forgot password?
						</Button>
					</CardContent>
				</form>
			</Card>
		</Box>
	);
};

export default LoginPage;
