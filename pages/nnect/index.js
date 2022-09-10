import { useState, useEffect } from "react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { Container, Grid, Pagination, Loading } from "@nextui-org/react";
import UserCard from "../../components/UserCard";
import AppBar from "../../components/AppBar";

export const getServerSideProps = withPageAuth({ redirectTo: "/" });

function getPageUsers(data, currentPage, itemsPerPage) {
  const begin = (currentPage - 1) * itemsPerPage;
  const end = begin + itemsPerPage;
  return data.slice(begin, end);
}

export default function UserIndexPage() {
  const { user } = useUser();
  const [rubyists, setRubyists] = useState([]);
  const [excludeMe, setExcludeMe] = useState(null);
  const [total, setTotal] = useState(1);
  const [index, setIndex] = useState(1);
  const DISPLAY_COUNT = 12;

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const data = await res.json();
          setRubyists(data);
          setTotal(Math.ceil(data.length / DISPLAY_COUNT));
        }
      } catch (error) {
        console.error(error);
      }
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
              {getPageUsers(excludeMe, index, DISPLAY_COUNT).map(
                (rubyist, index) => (
                  <UserCard key={index} rubyist={rubyist} />
                )
              )}
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
        <Container
          as="main"
          display="flex"
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          style={{ height: "100vh" }}
        >
          <Loading size="xl" />
        </Container>
      )}
    </>
  );
}
