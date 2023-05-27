import React from 'react';
import { Heading, Stack, VStack, Text, Button, Image, Box, HStack } from '@chakra-ui/react';
import "./home.css";
import { Link } from "react-router-dom";
import vg from "../../assets/images/bg.png";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { DiAws } from "react-icons/di";
import { SiCoursera, SiUdemy } from "react-icons/si";
import introVideo from "../../assets/videos/intro.mp4";

const Home = () => {
    return (
        <section className='home'>

            <div className='container'>

                {/* if phone then direction is column otherwise row */}
                <Stack direction={['column', 'row']} height='100%' justifyContent={['center', 'space-between']} alignItems="center" spacing={["16", "56"]} marginTop={"20px"}>

                    {/* VStack places the elements in the verticle stack */}
                    <VStack width={"full"} spacing={"8"} margin={"20"} alignItems={['center', 'flex-end']}>

                        <Heading children={"LEARN FROM THE EXPERTS"} size={"lg"} />
                        <Text textAlign={["center", "left"]} fontFamily={"cursive"} children={"Find Valuable Content at the Reasonable Cost"} />
                        <Link to="/courses">
                            <Button size={'md'} colorScheme='yellow'>Explore Here</Button>
                        </Link>

                    </VStack>

                    <Image className='vector-graphics' boxSize={"md"} src={vg} objectFit={"contain"} paddingRight={"50px"} ></Image>

                </Stack>
            </div>

            <Box padding="8" bgColor={"blackAlpha.800"}>

                <Heading children="OUR BRANDS" textAlign={"center"} fontFamily={"body"} color={"yellow.400"} />

                {/* HStack places the elements in the horizontal stack */}
                <HStack className='brandsBanner' justifyContent={"space-evenly"} marginTop={"4"}>

                    <CgGoogle />
                    <CgYoutube />
                    <SiCoursera />
                    <SiUdemy />
                    <DiAws />

                </HStack>

            </Box>

            <div className='container2'>

                <video autoPlay={true} controls muted controlsList='nodownload noremoteplayback nofullscreen' disablePictureInPicture disableRemotePlayback src={introVideo}>

                </video>

            </div>

        </section>
    )
}

export default Home;


