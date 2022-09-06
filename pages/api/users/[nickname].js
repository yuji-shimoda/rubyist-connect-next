import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';

export const getServerSideProps = withPageAuth({ redirectTo: '/' });

async function getUser(nickname) {
  const { data } = await supabaseClient.from('profiles').select('*').eq('nickname', nickname);
  return data;
}

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const { nickname } = req.query;
      const user = await getUser(nickname);
      res.status(200).json(user);
      break;

    default:
      res.status(405).end();
      break;
  }
}
