import { modifyChampName } from '../../../../utils/actionsWithStr/modifyChampName';

const graphInfo = (teamId, participants, version) => {
  const players = []; const
    res = [];

  for (const player of participants) {
    if (player.teamId === teamId) players.push(player);
  }

  const setOrder = (position) => {
    if (position === 'TOP') return 1;
    if (position === 'JUNGLE') return 2;
    if (position === 'MIDDLE') return 3;
    if (position === 'BOTTOM') return 4;
    if (position === 'UTILITY') return 5;
    return 0;
  };

  for (const elem of players) {
    const {
      totalDamageDealtToChampions, magicDamageDealtToChampions, physicalDamageDealtToChampions, trueDamageDealtToChampions,
    } = elem;
    const { totalHealsOnTeammates, totalDamageShieldedOnTeammates, individualPosition } = elem;
    const champName = modifyChampName(elem.championName);
    const player = {};

    player.champ = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`;
    player.dmg = {
      total: totalDamageDealtToChampions,
      physical: physicalDamageDealtToChampions,
      magic: magicDamageDealtToChampions,
      trueDmg: trueDamageDealtToChampions,
    };
    player.heal = {
      total: totalHealsOnTeammates + totalDamageShieldedOnTeammates,
      restore: totalHealsOnTeammates,
      absorb: totalDamageShieldedOnTeammates,
    };
    player.order = setOrder(individualPosition);

    res.push(player);
  }

  const sorted = res.sort((a, b) => a.order - b.order);

  return sorted;
};

export default graphInfo;
