import { useTeam } from '../../lib/react-hooks/use-team';

const Team = () => {
  const [team, { error }] = useTeam();

  if (error) return <span>Error</span>;
  if (team === undefined) return <span>Loading</span>;
  if (team === null) return <></>;

  return (
    <h2>{team.name}</h2>
  )
}

export default Team;
