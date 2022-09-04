import { useState, useEffect } from 'react';
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { Container, Grid, Pagination, Loading } from '@nextui-org/react';
import EventCard from '../../../components/EventCard';
import { useRecoilState } from 'recoil';
import { eventsState } from '../../../components/store/events';
import AppBar from '../../../components/AppBar';

export const getServerSideProps = withPageAuth({ redirectTo: '/' });

function getPageEvents(data, currentPage, itemsPerPage) {
  const begin = (currentPage - 1) * itemsPerPage;
  const end = begin + itemsPerPage;
  return data.slice(begin, end);
}

export default function UserIndexPage() {
  const { user } = useUser();
  const [events, setEvents] = useRecoilState(eventsState);
  const [total, setTotal] = useState(1);
  const [index, setIndex] = useState(1);
  const DISPLAY_COUNT = 12;

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('events').select('*');

      setEvents(data);
      setTotal(Math.ceil(data.length / DISPLAY_COUNT));
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  return (
    <>
      <AppBar user={user} />
      {events ? (
        <>
          <Container>
            <Grid.Container gap={2} justify="center">
              {getPageEvents(events, index, DISPLAY_COUNT).map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </Grid.Container>
            <Grid.Container gap={2} justify="center">
              <Pagination
                total={total}
                color="error"
                onChange={(page) => {
                  setIndex(page);
                }}
                loop={true}
              />
            </Grid.Container>
          </Container>
        </>
      ) : (
        <>
          <AppBar user={user} />
          <Container>
            <Loading />
          </Container>
        </>
      )}
    </>
  );
}
