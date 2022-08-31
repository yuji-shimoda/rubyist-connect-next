import { useState, useEffect } from "react";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Container, Grid, Pagination } from "@nextui-org/react";
import AppBar from "../components/AppBar";
import UserCard from "../components/UserCard";

export const getServerSideProps = withPageAuth({ redirectTo: "/" });

function getPageUsers(data, currentPage, itemsPerPage) {
  const begin = (currentPage - 1) * itemsPerPage;
  const end = begin + itemsPerPage;
  return data.slice(begin, end);
}

export default function UserIndexPage({ user }) {
  const [rubyists, setRubyists] = useState([]);
  const [total, setTotal] = useState(1);
  const [index, setIndex] = useState(1);
  const DISPLAY_COUNT = 20;

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("users").select("*");
      setRubyists(data);
      setTotal(Math.ceil(data.length / DISPLAY_COUNT));
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  return (
    <>
      <AppBar user={user} />
      <Container>
        <Grid.Container gap={2} justify="center">
          {rubyists
            ? getPageUsers(rubyists, index, DISPLAY_COUNT).map(
                (rubyist, index) => <UserCard key={index} rubyist={rubyist} />
              )
            : ""}
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
  );
}
