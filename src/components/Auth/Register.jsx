import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/user';

export const fileUploadCss = {
	cursor: "pointer",
	marginLeft: "-5%",
	width: '110%',
	border: 'none',
	height: '100%',
	color: '#ECC94B',
	backgroundColor: 'white',
};

const fileUploadStyle = {
	"&::file-selector-button": fileUploadCss,
}

const Register = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [imagePrev, setImagePrev] = useState();
	const [image, setImage] = useState();
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const changeImageHandler = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImagePrev(reader.result)
			setImage(file)
		}
	}

	const submitHandler = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.append("name", name);
		myForm.append("email", email);
		myForm.append("password", password);
		myForm.append("file", image);

		dispatch(register(myForm));
	}

	return (
		<Container height={'95vh'}>
			<VStack h='full' justifyContent={'center'} spacing={'16'}>
				<Heading children={"REGISTRATION"} />
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<Box mY={"4"} display={"flex"} justifyContent={'center'} >
						<Avatar src={imagePrev} size="xl" />
					</Box>
					<Box mY={'4'}>
						<FormLabel htmlFor='name' children='Name' />
						<Input
							required
							id='name'
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='Enter your name'
							type='text'
							focusBorderColor='yellow.500' />
					</Box>
					<Box mY={'4'}>
						<FormLabel htmlFor='email' children='Email Address' />
						<Input
							required
							id='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder='abc@email.com'
							type='email'
							focusBorderColor='yellow.500' />
					</Box>
					<Box mY={'4'}>
						<FormLabel htmlFor='password' children='password' />
						<Input
							required
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder='Enter your password'
							type='password'
							focusBorderColor='yellow.500' />
					</Box>
					<Box mY={'4'}>
						<FormLabel htmlFor='chooseAvatar' children='Choose Avatar' />
						<Input
							accept='image/*'
							id='chooseAvatar'
							type='file'
							focusBorderColor='yellow.500'
							css={fileUploadStyle}
							onChange={changeImageHandler}
						/>
					</Box>
					<Button my='4' colorScheme='yellow' type='submit'>
						Register
					</Button>
					<Box mY='4'>
						Already Registered <Link to='/login'><Button colorScheme='yellow' variant={'link'}>Login</Button> here</Link>
					</Box>
				</form>
			</VStack>
		</Container>
	)
}

export default Register