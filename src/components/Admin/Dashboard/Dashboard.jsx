import { Box, Grid, HStack, Heading, Progress, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import cursor from '../../../assets/images/cursor.png'
import Sidebar from '../Sidebar'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import { DoughnutChart, LineChart } from './Chart'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardStats } from '../../../redux/actions/admin';
import Loader from "../../Layout/Loader/Loader";

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <Box w={['full', '20%']} boxShadow={'-2px 0 10px rgba(107, 70, 193, 0.5)'} p='8' borderRadius={'lg'}>

    <Text children={title} />

    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />
      <HStack>
        <Text children={qtyPercentage + "%"} />
        {profit ? <RiArrowUpLine color='green' /> : <RiArrowDownLine color='red' />}
      </HStack>
    </HStack>

    <Text opacity={0.6} children={'Since last month'} />

  </Box>
)

const Bar = ({ title, value, profit }) => (
  <Box py={'4'} px={['0', '20']}>

    <Heading size={'sm'} children={title} mb={'2'} />
    <HStack width={'full'} alignItems={'center'}>
      {/* {profit === false && value = -1*value} */}

      <Text children={`${profit ? '0%' : '-' + value + '%'}`} />
      <Progress w={'full'} value={profit ? value : 0} colorScheme='purple' />
      <Text children={`${value > 100 ? value : 100}%`} />

    </HStack>

  </Box>
)

const Dashboard = () => {

  const dispatch = useDispatch();
  const {
    loading,
    stats,
    usersCount,
    subscriptionCount,
    viewsCount,
    usersProfit,
    subscriptionProfit,
    viewsProfit,
    usersPercentage,
    subscriptionPercentage,
    viewsPercentage,
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch])


  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '5fr 1fr']} css={{ cursor: `url(${cursor}), default` }}>
      {
        loading || !stats ? <Loader color='purple.500' /> : (
          <Box boxSizing='border-box' py={'16'} px={['4', '0']}>

            <Text textAlign={'center'} opacity={'0.5'} children={`Last change was on ${String(new Date(stats[stats.length - 1].createdAt)).split("G")[0]}`} />

            <Heading children='Dashboard' marginLeft={['0', '16']} marginBottom={'16'} textAlign={['center', 'left']} />

            <Stack direction={['column', 'row']} minH={'24'} justifyContent={'space-evenly'}>
              <Databox
                title='Views'
                qty={viewsCount}
                qtyPercentage={viewsPercentage}
                profit={viewsProfit}
              />
              <Databox
                title='Users'
                qty={usersCount}
                qtyPercentage={usersPercentage}
                profit={usersProfit}
              />
              <Databox
                title='Subscriptions'
                qty={subscriptionCount}
                qtyPercentage={subscriptionPercentage}
                profit={subscriptionProfit}
              />
            </Stack>

            <Box
              m={['0', '16']}
              borderRadius={'lg'}
              p={['0', '16']}
              mt={['4', '16']}
              boxShadow={'-2px 0 10px rgba(107, 70, 193, 0.5)'}
            >

              <Heading textAlign={['center', 'left']} size={'md'} children='Views graph' pt={['8', '0']} marginLeft={['0', '16']} />
              {/* Line graph here */}
              <LineChart views={
                stats.map((item) => (item.views))
              } />
            </Box>

            <Grid templateColumns={['1fr', '2fr 1fr']}>

              <Box p='4'>
                <Heading textAlign={['center', 'left']} size={'md'} children='Progress Bar' my={'8'} ml={['0', '16']} />
                <Box>

                  <Bar title="Views" value={viewsPercentage} profit={viewsProfit} />
                  <Bar title="Users" value={usersPercentage} profit={usersProfit} />
                  <Bar title="Subscription" value={subscriptionPercentage} profit={subscriptionProfit} />

                </Box>
              </Box>

              <Box p={['0', '16']} boxSizing='border-box' py={'4'}>

                <Heading textAlign={'center'} size={'md'} mb={'4'} children='Users' />

                {/* Doughnut Graph */}
                <DoughnutChart users={[subscriptionCount, usersCount - subscriptionCount]} />

              </Box>
            </Grid>

          </Box>
        )
      }

      <Sidebar />
    </Grid >
  )
}

export default Dashboard