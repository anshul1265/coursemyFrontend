import { Button, Container, HStack, Heading, Input, Stack, Text, VStack, Image } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Home/home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from "../../redux/actions/user";

const Courses = () => {
	const [keyword, setKeyword] = useState("");
	const [category, setCategory] = useState("");

	const dispatch = useDispatch();
	const { loading, courses, error, message } = useSelector(state => state.course);

	const addToPlaylistHandler = async (courseId) => {
		await dispatch(addToPlaylist(courseId));
		dispatch(loadUser());
	};

	useEffect(() => {
		dispatch(getAllCourses(category, keyword));
		if (error) {
			toast.error(error);
			dispatch({ type: "clearError" });
		}
		if (message) {
			toast.success(message);
			dispatch({ type: "clearMessage" });
		}
	}, [dispatch, category, keyword, error, message]);

	const categories = ['Web Development', "Artificial Intelligence", 'Data Structures & Algorithms', 'App Development', 'Data Science', 'Game Development'];

	const CourseCard = ({ views, title, imagesrc, id, addToPlaylistHandler, creater, description, lectureCount, loading }) => {
		return (
			<VStack className='course' alignItems={['center', 'flex-start']}>

				<Image imagesrc={imagesrc} boxSize={60} objectFit={"contain"} />

				<Heading textAlign={['center', 'left']} size={'xs'} maxW={"200px"} fontFamily={"sans-serif"} noOfLines={3} children={title} />

				<Text noOfLines={2} children={description} />

				<HStack>

					<Text fontWeight={"bold"} children={"Created by "} textTransform={'uppercase'} />
					<Text children={creater} fontFamily={"body"} textTransform={'uppercase'} />

				</HStack>

				<Heading textAlign={"center"} textTransform={"uppercase"} size={'xxs'} children={`Lectures - ${lectureCount}`} />
				<Heading textTransform={"uppercase"} size={'xxs'} children={`Views - ${views}`} />

				<Stack direction={['column', 'row']} alignItems={'center'}>
					<Link to={`/course/${id}`}>
						<Button colorScheme='yellow' fontSize={'md'} padding={'2'} size={'3'}>Watch Now</Button>
					</Link>
					<Button isLoading={loading} colorScheme='yellow' size={'3'} fontSize={'md'} onClick={() => addToPlaylistHandler(id)} variant={'ghost'}>Add to Playlist</Button>
				</Stack>

			</VStack>
		)
	}
	return (
		<Container minH={"95vh"} maxW={"container.lg"} paddingY={"6"}>

			<Heading children="ALL COURSES" m={"7"} />
			<Input
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search all Courses...'
				type='text'
				focusBorderColor='yellow.500'
			/>
			<HStack
				overflowX={"auto"}
				padding={"8"}
				css={{
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				}}
			>
				{
					categories.map((item, index) => (
						<Button onClick={() => setCategory(item)} minW={"60"} key={index} value={category}>
							<Text children={item}></Text>
						</Button>
					))
				}
			</HStack>

			<Stack
				direction={['column', 'row']}
				textwrap="wrap"
				justifyContent={['flex-start', 'justify-evenly']}
				alignItems={["center", "flex-start"]}
			>

				{
					(courses.length > 0) ?
						courses.map((item) => (
							<CourseCard
								key={item._id}
								title={item.title}
								description={item.description}
								views={item.views}
								imagesrc={item.poster.url}
								id={item._id}
								creater={item.createdBy}
								lectureCount={item.numOfVideos}
								addToPlaylistHandler={addToPlaylistHandler}
								loading={loading}
							/>
						)) :
						<Heading mt={'4'} children="Course not found" />
				}

			</Stack>

		</Container>
	)
}

export default Courses