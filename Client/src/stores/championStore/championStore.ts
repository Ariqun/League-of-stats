import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';

import championService from './championStore.service';

class ChampionStore {
  champion: any;

  isLoading = true;

  isError = false;

  constructor() {
    makeAutoObservable(this);
  }

  getChampionInfo = (name: string) => {
    championService(name)
      .then((champion) => {
        runInAction(() => {
          this.champion = champion.data[name];
          this.isLoading = false;
        });
      })
      .catch(() => {
        this.isError = true;
      });
  };
}

export default new ChampionStore();
