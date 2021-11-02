import axios from 'axios';

export default class RiotAPI {
  getSummoner = async (region, name) => {
    const res = await axios({
      method: 'post',
      url: '/summoner',
      data: `summoner=${name}&region=${region}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (res.status !== 200) throw new Error('RiotAPI getSummoner failed');

    return res.data;
  };

  getSumRanked = async (sumId, region) => {
    const res = await axios({
      method: 'post',
      url: '/ranked',
      data: `sumId=${sumId}&region=${region}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (res.status !== 200) throw new Error('RiotAPI getSumRanked failed');

    return res.data;
  };

  getLiveMatch = async (sumId, region) => {
    const res = await axios({
      method: 'post',
      url: '/live',
      data: `sumId=${sumId}&region=${region}`,
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    });

    if (res.status !== 200) throw new Error('Riot API getLiveMatch failed');

    return res.data;
  };
}
