import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Box, Grid, Heading, Table, TableCaption, TableContainer, Thead, Tr, Th, Tbody, Td, HStack, Button, Image, useDisclosure } from '@chakra-ui/react'
import cursor from '../../../assets/images/cursor.png'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, getCourseLectures } from '../../../redux/actions/course'
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin'
import { toast } from 'react-hot-toast'

const AdminCourses = () => {

  const { courses, lectures } = useSelector(state => state.course);
  const { loading, error, message } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const courseDetailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId))
    onOpen()
    setCourseId(courseId);
    setCourseTitle(title);
  };

  const deleteButtonHandler = (courseId) => {
    dispatch(deleteCourse(courseId));
  }

  const deletLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);
    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    } else if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    dispatch(getAllCourses());
  }, [dispatch, error, message]);


  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '5fr 1fr']} css={{ cursor: `url(${cursor}), default` }}>
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading children='ALL COURSES' my={'16'} textAlign={['center', 'left']} />

        <TableContainer w={['100vw', 'full']}>

          <Table variant={'simple'} size={'lg'}>

            <TableCaption>All available Courses in the Database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                courses.map(item => (<Row courseDetailsHandler={courseDetailsHandler} deleteButtonHandler={deleteButtonHandler} key={item._id} item={item} loading={loading} />))
              }
            </Tbody>

          </Table>

        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          deleteButtonHandler={deletLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          id={courseId}
          courseTitle={courseTitle}
          lectures={lectures}
          loading={loading}
        />

      </Box>

      <Sidebar />
    </Grid >
  )
}

export default AdminCourses

function Row({ item, courseDetailsHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>

      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            isLoading={loading}
            onClick={() => courseDetailsHandler(item._id, item.title)}
            variant={'outline'}
            color={'purple.500'}
          >
            View Lectures
          </Button>
          <Button onClick={() => deleteButtonHandler(item._id)} isLoading={loading} color={'purple.600'}>
            <RiDeleteBin7Fill />
          </Button>

        </HStack>

      </Td>

    </Tr>
  )
}