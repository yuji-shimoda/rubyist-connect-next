import { useEffect, useState } from "react";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { Container, Grid, Spacer, Textarea, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import AppBar from "../../components/AppBar";

export const getServerSideProps = withPageAuth({ redirectTo: "/" });

export default function UserPage() {
  const router = useRouter();
  const { user } = useUser();
  const [me, setMe] = useState({});
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      introduction: "",
    },
  });

  async function updateProfile() {
    try {
      const introduction = getValues("introduction");
      const { data, error } = await supabaseClient
        .from("profiles")
        .update({ introduction: introduction, updated_at: new Date() })
        .match({ id: user.id });
      console.log(data);
      if (error) {
        throw error;
      } else {
        router.push(`/nnect/${user?.user_metadata?.user_name}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/users/${user?.user_metadata?.user_name}`);
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setValue("introduction", data.pop().introduction);
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
        <Grid.Container gap={2} justify="center" css={{ mt: 50 }}>
          {me ? (
            <form>
              <Controller
                name="introduction"
                control={control}
                fullWidth
                render={({ field }) => (
                  <Textarea
                    bordered
                    rows={20}
                    width="800px"
                    size="xl"
                    color="secondary"
                    labelPlaceholder="Introduction"
                    {...field}
                  />
                )}
              />
              <Spacer />
              <Button color="gradient" auto ghost onPress={updateProfile}>
                登録
              </Button>
            </form>
          ) : (
            ""
          )}
        </Grid.Container>
      </Container>
    </>
  );
}
