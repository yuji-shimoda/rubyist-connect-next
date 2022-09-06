import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';

export const getServerSideProps = withPageAuth({ redirectTo: '/' });

async function getUsers() {
  const { data } = await supabaseClient.from('profiles').select('*');
  return data;
}

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const users = await getUsers();
      res.status(200).json(users);
      break;

    default:
      res.status(405).end();
      break;
  }
}
