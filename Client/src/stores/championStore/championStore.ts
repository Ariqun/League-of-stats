import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';

import championService from './championStore.service';
import { ChampionTypes } from '.';

class ChampionStore {
  champion!: ChampionTypes;

  isLoading = true;

  isError = false;

  constructor() {
    makeAutoObservable(this);
  }

  getChampionInfo = (name: string | undefined) => {
    if (!name) return this.isError = true;

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

  clearStore = () => {
    this.isLoading = true;
    this.isError = false;
  };
}

export default new ChampionStore();
