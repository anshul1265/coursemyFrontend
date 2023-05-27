import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.profile);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate("/profile");
  };

  return (
    <Container py={'16'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading children='UPDATE PROFILE' my={'16'} textAlign={['center', 'left']} />
        <VStack spacing={'8'}>
          <Input
            id='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='abc'
            type='text'
            focusBorderColor='yellow.500'
          />
          <Input
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='abc@gmail.com'
            type='email'
            focusBorderColor='yellow.500'
          />
          <Button w={'full'} isLoading={loading} colorScheme='yellow' type='submit'>
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default UpdateProfile