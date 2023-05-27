import React from 'react'
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton = ({ url = "/", title = "Home", onClose }) => {
  return (
    <Link to={url} onClick={onClose}>
      <Button variant={'ghost'}>
        {title}
      </Button>
    </Link>
  )
}

const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const logOutHandler = () => {
    onClose();
    dispatch(logout());
  }

  return (
    <>
      <ColorModeSwitcher />

      <Button
        onClick={onOpen}
        zIndex={'overlay'}
        colorScheme='yellow'
        width={"12"}
        height={"12"}
        rounded={"full"}
        position={"fixed"}
        top={"6"}
        left={"6"}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"} children="COURSE BUNDLER" />
          <DrawerBody>
            <VStack spacing={"4"} alignItems={"flex-start"}>
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton onClose={onClose} url="/courses" title="Browse All Courses" />
              <LinkButton onClose={onClose} url="/request" title="Request a Course" />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About" />
              <HStack
                justifyContent={"space-evenly"}
                position={"absolute"}
                bottom={"3rem"}
                width={"80%"}
              >
                {isAuthenticated ?
                  (
                    <>
                      <VStack>
                        <HStack>
                          <Link to="/profile">
                            <Button
                              onClick={onClose}
                              colorScheme='yellow'
                            >
                              Profile
                            </Button>
                          </Link>
                          <Button
                            variant={"ghost"}
                            onClick={logOutHandler}
                          >
                            <RiLogoutBoxLine />
                            LOGOUT
                          </Button>
                        </HStack>
                        {
                          (user && user.role === "admin") &&
                          (
                            <HStack>
                              <Link to="/admin/dashboard">
                                <Button
                                  onClick={onClose}
                                  colorScheme='purple'
                                  variant={"ghost"}
                                >
                                  <RiDashboardFill style={{ margin: "4px" }} />
                                  ADMIN
                                </Button>
                              </Link>
                            </HStack>
                          )
                        }
                      </VStack>
                    </>
                  ) :
                  (
                    <>
                      <Link to="/login">
                        <Button onClick={onClose} colorScheme='yellow'>Login</Button>
                      </Link>
                      <p>OR</p>
                      <Link to="/register">
                        <Button onClick={onClose} colorScheme='yellow'>Sign Up</Button>
                      </Link>
                    </>
                  )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer >
    </>
  )
}

export default Header