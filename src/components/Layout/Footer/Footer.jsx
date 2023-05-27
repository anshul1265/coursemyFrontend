import React from 'react';
import { Box, VStack, Stack, Heading, HStack } from '@chakra-ui/react';
import { TiSocialInstagramCircular, TiSocialLinkedinCircular } from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';

const Footer = () => {
    return (
        <Box padding="4" bg="blackAlpha.900" minH="10vh" >
            <Stack direction={["column", 'row']}>
                <VStack alignItems={['center', 'flex-start']} width={'full'}>

                    <Heading children={'All Rights Reserved'} color={'white'} />

                    <Heading children={'@anshul1265'} color={'yellow.400'} fontFamily={'body'} size={'sm'} />

                </VStack>
                <HStack
                    spacing={['2', '10']}
                    justifyContent={'center'}
                    color={'white'}
                    fontSize={'50'}
                >

                    <a href='https://www.linkedin.com/in/anshul-singla-38798121b/' rel="noreferrer" target={'blank'}>
                        <TiSocialLinkedinCircular />
                    </a>

                    <a href='https://www.instagram.com/anshul_1265/' rel="noreferrer" target={'blank'}>
                        <TiSocialInstagramCircular />
                    </a>

                    <a href='https://github.com/anshul1265' rel="noreferrer" target={'blank'}>
                        <DiGithub />
                    </a>

                </HStack>
            </Stack>
        </Box>
    )
}

export default Footer