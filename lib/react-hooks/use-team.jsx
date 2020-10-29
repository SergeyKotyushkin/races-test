import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

export function useTeam() {
  const { data, mutate } = useSWR('/api/team', fetcher);
  const team = data && data.team;
  return [team, { mutate }];
}
