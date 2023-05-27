import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
import cursor from '../../../assets/images/cursor.png'
import { fileUploadCss } from '../../Auth/Register'
import { useDispatch, useSelector } from 'react-redux'
import { createCourse } from '../../../redux/actions/admin';
import toast from "react-hot-toast";

const CreateCourse = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [createdBy, setCreatedBy] = useState('');
	const [category, setCategory] = useState('');
	const [image, setImage] = useState('');
	const [imagePrev, setImagePrev] = useState('');
	const categories = ['Web Development', "Artificial Intelligence", 'Data Structures & Algorithms', 'App Development', 'Data Science', 'Game Development'];
	const changeImageHandler = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImagePrev(reader.result)
			setImage(file)
		}
	}

	const dispatch = useDispatch();

	const { loading, message, error } = useSelector(state => state.admin);

	const submitHandler = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.append("title", title);
		myForm.append("description", description);
		myForm.append("category", category);
		myForm.append("createdBy", createdBy);
		myForm.append("file", image);
		dispatch(createCourse(myForm));
	}

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch({ type: "clearError" });
		} else if (message) {
			toast.success(message);
			dispatch({ type: "clearMessage" });
		}
	}, [dispatch, message, error]);

	return (
		<Grid minH={'90vh'} templateColumns={['1fr', '5fr 1fr']} css={{ cursor: `url(${cursor}), default` }}>
			<Container py={'16'}>

				<form onSubmit={submitHandler}>
					<Heading my={'16'} textAlign={['center', 'left']} children="CREATE COURSE" />
					<VStack m={'auto'} spacing={'8'}>
						<Input
							placeholder='Title'
							value={title}
							type='text'
							onChange={(e) => setTitle(e.target.value)}
							focusBorderColor='purple.300'
						/>
						<Input
							placeholder='Description'
							value={description}
							type='text'
							onChange={(e) => setDescription(e.target.value)}
							focusBorderColor='purple.300'
						/>
						<Input
							placeholder='Creator Name'
							value={createdBy}
							type='text'
							onChange={(e) => setCreatedBy(e.target.value)}
							focusBorderColor='purple.300'
						/>
						<Select focusBorderColor='purple.300' value={category} onChange={e => setCategory(e.target.value)}>
							{
								categories.map(item => (
									<option value={item} placeholder='Choose Category' key={item}>{item}</option>
								))
							}
						</Select>
						<Input
							accept='image/*'
							id='chooseAvatar'
							type='file'
							focusBorderColor='purple.300'
							css={{ "&::file-selector-button": { ...fileUploadCss, color: 'purple' } }}
							onChange={changeImageHandler}
						/>
						{
							imagePrev && (
								<Image src={imagePrev} boxSize={'64'} objectFit={'contain'} />
							)
						}
						<Button isLoading={loading} width={'full'} type='submit' color={'purple.300'}>Create</Button>
					</VStack>
				</form>
			</Container>

			<Sidebar />
		</Grid>
	)
}

export default CreateCourse