import { useRouter } from 'next/router';
import { useTeam } from '../../lib/react-hooks/use-team';

const Logout = () => {
  const router = useRouter();
  const [team, { error, mutate }] = useTeam();

  const handleLogout = async (e) => {
    e.preventDefault()

    await fetch('/api/auth', {
      method: 'DELETE',
    });

    mutate(null);
    router.replace('/auth');
  };

  if (error) return <span>Error</span>;
  if (team === undefined) return <span>Loading</span>;
  if (team === null) return <></>;

  return (
    <button className="logoutButton" onClick={handleLogout}>Logout</button>
  )
}

export default Logout;
