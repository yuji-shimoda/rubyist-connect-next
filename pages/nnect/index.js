import { useState, useEffect } from 'react';
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { Container, Grid, Pagination, Loading } from '@nextui-org/react';
import UserCard from '../../components/UserCard';
import { useRecoilState } from 'recoil';
import { rubyistsState } from '../../components/store/rubyists';
import AppBar from '../../components/AppBar';

export const getServerSideProps = withPageAuth({ redirectTo: '/' });

function getPageUsers(data, currentPage, itemsPerPage) {
  const begin = (currentPage - 1) * itemsPerPage;
  const end = begin + itemsPerPage;
  return data.slice(begin, end);
}

export default function UserIndexPage() {
  const { user } = useUser();
  const [rubyists, setRubyists] = useRecoilState(rubyistsState);
  const [excludeMe, setExcludeMe] = useState(null);
  const [total, setTotal] = useState(1);
  const [index, setIndex] = useState(1);
  const DISPLAY_COUNT = 12;

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('users').select('*');
      setRubyists(data);
      setTotal(Math.ceil(data.length / DISPLAY_COUNT));
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  useEffect(() => {
    const tmp = rubyists.filter(function (rubyist) {
      if (rubyist.nickname !== user?.user_metadata?.user_name) {
        return rubyist;
      }
    });
    setExcludeMe(tmp);
  }, [rubyists]);
  return (
    <>
      <AppBar user={user} />
      {excludeMe ? (
        <>
          <Container>
            <Grid.Container gap={2} justify="center">
              {getPageUsers(excludeMe, index, DISPLAY_COUNT).map((rubyist, index) => (
                <UserCard key={index} rubyist={rubyist} />
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
