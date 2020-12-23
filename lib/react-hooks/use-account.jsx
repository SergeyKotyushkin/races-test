import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

export function useAccount() {
  const { data, error, mutate } = useSWR('/api/account', fetcher);
  const account = data && data.account;
  return [account, { error, mutate }];
}
