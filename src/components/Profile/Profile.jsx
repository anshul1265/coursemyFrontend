import { Avatar, Button, Container, HStack, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { fileUploadCss } from '../Auth/Register'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile'
import { cancelSubscription, loadUser } from '../../redux/actions/user'
import { toast } from 'react-hot-toast'

const Profile = ({ user }) => {

  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(state => state.profile);
  const { loading: subscriptionLoading, message: subscriptionMessage, error: subscriptionError } = useSelector(state => state.subscription);

  const removeFromPlaylistHandler = async (id) => {
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
  }

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("file", image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  const cancelSubscriptionHandler = async () => {
    await dispatch(cancelSubscription());
    dispatch(loadUser());
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: "clearError" });
    }
    if (subscriptionMessage) {
      toast.success({ type: "clearMessage" });
    }
  }, [dispatch, message, error, subscriptionError, subscriptionMessage]);

  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Container minH={'90vh'} maxW={'container.lg'} py={'8'}>
      <Heading m='8' textTransform={'uppercase'} children='Profile' />
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        padding={'8'}
      >

        <VStack>
          <Avatar boxSize={'48'} src={user.avatar.url} />
          <Button onClick={onOpen} colorScheme='yellow' variant='ghost'>
            Change Photo
          </Button>
        </VStack>

        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text fontWeight={'bold'}>Name - </Text>
            <Text>{user.name}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>E-mail - </Text>
            <Text>{user.email}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>Created At - </Text>
            <Text>{user.createdAt.split('T')[0]}</Text>
          </HStack>

          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription && user.subscription.status === 'active' ? (
                <Button onClick={cancelSubscriptionHandler} color={'yellow.500'} variant="unstyled" isLoading={subscriptionLoading}>
                  Cancel Subscription
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme={'yellow'}>Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}

          <Stack direction={['column', 'row']} alignItems={'center'}>

            <Link to='/updateprofile'>
              <Button>Update Profile</Button>
            </Link>

            <Link to='/changepassword'>
              <Button>Change Password</Button>
            </Link>

          </Stack>

        </VStack>

      </Stack>

      <Heading children='Playlist' size={'md'} my={'8'} />
      {
        user.playlist.length > 0
        &&
        <Stack direction={['column', 'row']} alignItems={'center'} flexWrap={'wrap'} p='4'>

          {
            user.playlist.map((element) => (
              <VStack width={'48'} m='2' key={element.course}>

                <Image
                  boxSize={'full'}
                  objectFit={'contain'}
                  height={'140px'}
                  width={'190px'}
                  src={element.poster}
                />
                <HStack>
                  <Link to={`/course/${element.course}`}>
                    <Button variant={'ghost'} colorScheme='yellow'>
                      Watch Now
                    </Button>
                  </Link>
                  <Button isLoading={loading} onClick={() => (removeFromPlaylistHandler(element.course))}>
                    <RiDeleteBin7Fill />
                  </Button>
                </HStack>

              </VStack>
            ))
          }

        </Stack>
      }
      <ChangePhotoBox changeImageSubmitHandler={changeImageSubmitHandler} isOpen={isOpen} onClose={onClose} loading={loading} />
    </Container >
  )
}

export default Profile

function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler, loading }) {

  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const changeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result)
      setImage(file)
    }
  }
  const closeHandler = () => {
    onClose();
    setImage('');
    setImagePrev('');
  }
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>

      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={(e) => (changeImageSubmitHandler(e, image))}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}
                <Input onChange={changeImage} type='file' css={{ "&::file-selector-button": fileUploadCss }} />
                <Button isLoading={loading} w={'full'} colorScheme='yellow' type='submit'>Change</Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr='3' onClick={closeHandler}>Cancel</Button>
        </ModalFooter>
      </ModalContent>

    </Modal>
  )
}