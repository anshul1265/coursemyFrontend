import { Container, Heading, VStack, Box, Button, Input, FormLabel, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { courseRequest } from '../../redux/actions/other';
import toast from "react-hot-toast";

const Request = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [course, setCourse] = useState('');

	const dispatch = useDispatch();
	const { error, message, loading } = useSelector(state => state.other);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(courseRequest(name, email, course));
	}

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch({ type: "clearError" });
		} else if (message) {
			toast.success(message);
			dispatch({ type: "clearMessage" });
		}
	}, [error, message, dispatch])


	return (
		<Container h="92vh">

			<VStack h="full" justifyContent={'center'} spacing={'16'}>
				<Heading children="REQUEST A COURSE" />
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
						<FormLabel htmlFor='course' children='Course' />
						<Textarea
							required
							id='course'
							value={course}
							onChange={e => setCourse(e.target.value)}
							placeholder='Explain the Course...'
							focusBorderColor='yellow.500' />
					</Box>
					<Button my='4' colorScheme='yellow' type='submit' isLoading={loading}>
						Send email
					</Button>
					<Box mY='4'>
						See Available{' '}
						<Link to='/courses'><Button colorScheme='yellow' variant={'link'}>
							Courses
						</Button></Link>
					</Box>

				</form>
			</VStack>
		</Container>
	)
}

export default Request