import { useEffect, useState } from "react";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import {
  Container,
  Grid,
  Text,
  Textarea,
  Button,
  Spacer,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import AppBar from "../../components/AppBar";

export const getServerSideProps = withPageAuth({ redirectTo: "/" });

export default function UserPage() {
  const router = useRouter();
  const { user } = useUser();
  const { control, setValue, getValues } = useForm({
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
        <Grid.Container gap={2} justify="center" css={{ mt: 20 }}>
          <Grid sm md lg xl />
          <>
            <Text
              h2
              transform="full-width"
              size={60}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
              weight="bold"
            >
              Introduction
            </Text>
            <Spacer />
            <Controller
              name="introduction"
              control={control}
              fullWidth
              render={({ field }) => (
                <Textarea
                  bordered
                  minRows={15}
                  rows={15}
                  width="800px"
                  size="xl"
                  color="secondary"
                  placeholder="Introduction"
                  {...field}
                />
              )}
            />
          </>
          <Grid sm md lg xl />
        </Grid.Container>
        <Grid.Container gap={2} justify="center" css={{ mt: 20 }}>
          <Button color="gradient" auto ghost onPress={updateProfile}>
            Update
          </Button>
        </Grid.Container>
      </Container>
    </>
  );
}
