import { useEffect, useState } from 'react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { Container, Grid, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import AppBar from '../../components/AppBar';

export const getServerSideProps = withPageAuth({ redirectTo: '/' });

export default function UserPage() {
  const router = useRouter();
  const { user } = useUser();
  const [me, setMe] = useState({});
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: '',
      select: {},
    },
  });
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/users/${user?.user_metadata?.user_name}`);
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setValue('introduction', data.pop().introduction);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <AppBar user={user} />
      <Container>
        <Grid.Container gap={2} justify="center">
          <Grid sm md lg xl />
          {me ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="introduction"
                control={control}
                render={({ field }) => (
                  <Textarea
                    bordered
                    width="800px"
                    color="secondary"
                    labelPlaceholder="Introduction"
                    {...field}
                  />
                )}
              />
              <input type="submit" />
            </form>
          ) : (
            ''
          )}
          <Grid sm md lg xl />
        </Grid.Container>
      </Container>
    </>
  );
}
