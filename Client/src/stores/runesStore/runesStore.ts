import { makeAutoObservable, runInAction } from 'mobx';

import runesService, { RuneStyleType } from './runesStore.service';

class RunesStore {
  allRunes!: RuneStyleType[];

  isLoading = true;

  isError = false;

  constructor() {
    makeAutoObservable(this);

    runesService()
      .then((runes) => {
        runInAction(() => {
          this.allRunes = runes;
          this.isLoading = false;
        });
      })
      .catch(() => {
        this.isError = true;
      });
  }
}

export default new RunesStore();
