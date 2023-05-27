import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import introVideo from "../../assets/videos/intro.mp4";
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndConditions from '../../assets/docs/termsAndCondition';

const Founder = () => {
    return (
        <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>

            <VStack>
                <Avatar src={'https://avatars.githubusercontent.com/u/96047688?s=400&u=d120fd35ddfd99a0ef950a37f1c0745d95dbe6e0&v=4'} boxSize={['40', '48']} />
                <Text opacity={0.7} children="Co-founder" />
            </VStack>
            <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
                <Heading children="Anshul Singla" size={['md', 'xl']} />
                <Text textAlign={['center', 'left']} children="Hi! I am a Full Stack Web Developer." />
            </VStack>

        </Stack>
    )
}

const VideoPlayer = () => {
    return (
        <Box>
            <video autoPlay={true} controls muted controlsList='nodownload noremoteplayback nofullscreen' disablePictureInPicture disableRemotePlayback src={introVideo}>
            </video>
        </Box>
    )
}

const TandC = ({ termsAndConditions }) => {
    return (
        <Box>
            <Heading size={'md'} children='Terms and Conditions' textAlign={['center', 'left']} my={'4'} />
            <Box h='sm' p='4' overflowY={'scroll'}>
                <Text textAlign={['center', 'left']} letterSpacing={'widest'} fontFamily={'heading'}>
                    {termsAndConditions}
                </Text>
                <Heading my='4' size={'xs'} children='*Refund only applicable if cancellation within 7 days.' />
            </Box>
        </Box>
    )
}

const About = () => {
    return (
        <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>

            <Heading children='About Us' textAlign={['center', 'left']} />

            <Founder />

            <Stack m='8' direction={['column', 'row']} alignItems={'center'} >

                <Text fontFamily={'cursive'} m='8' textAlign={['center', 'left']}>
                    We are a video streaming platform with some premium courses available for premium users.
                </Text>

                <Link to='/subscribe'>
                    <Button variant={'ghost'} colorScheme='yellow'>Checkout our plans</Button>
                </Link>

            </Stack>

            <VideoPlayer />

            <TandC termsAndConditions={termsAndConditions} />

            <HStack my='4' padding={'4'}>
                <RiSecurePaymentFill />
                <Heading size={'xs'} fontFamily={'sans-serif'} textTransform={'uppercase'} children='Payment is secured by Razorpay' />
            </HStack>

        </Container>
    )
}

export default About