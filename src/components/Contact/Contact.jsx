import { Container, Heading, VStack, Box, Button, Input, FormLabel, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from '../../redux/actions/other';
import { toast } from 'react-hot-toast';

const Contact = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();
	const { error, message: stateMessage, loading } = useSelector(state => state.other);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(contactUs(name, email, message));
	}

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch({ type: "clearError" });
		} else if (stateMessage) {
			toast.success(stateMessage);
			dispatch({ type: "clearMessage" });
		}
	}, [error, stateMessage, dispatch])

	return (
		<Container h="92vh">

			<VStack h="full" justifyContent={'center'} spacing={'16'}>
				<Heading children="CONTACT US HERE" />
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<Box mY={'4'}>
						<FormLabel htmlFor='name' children='Name ' />
						<Input
							required
							id='name'
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='abc'
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
						<FormLabel htmlFor='message' children='Enter your message' />
						<Textarea
							required
							id='message'
							value={message}
							onChange={e => setMessage(e.target.value)}
							focusBorderColor='yellow.500' />
					</Box>
					<Button isLoading={loading} my='4' colorScheme='yellow' type='submit'>
						Send email
					</Button>
					<Box mY='4'>
						Request for a Course
						<Link to='/request'>
							<Button colorScheme='yellow' variant={'link'}>
								Click
							</Button>
						</Link> here
					</Box>

				</form>
			</VStack>
		</Container>
	)
}

export default Contact