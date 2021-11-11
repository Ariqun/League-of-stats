import { ChampionRolesType } from '../../stores/championStore';

const getMatchesAtPosition = (roles: ChampionRolesType, position: string) => {
  let matchesAtPos = 0; let
    winsAtPos = 0;

  for (const key in roles) {
    if (key === position) {
      if (!roles[key]) continue;

      matchesAtPos = roles[key].matches;
      winsAtPos = roles[key].wins;
    }
  }

  return { matchesAtPos, winsAtPos };
};

export default getMatchesAtPosition;
