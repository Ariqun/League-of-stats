import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';

import versionService from './versionStore.service';

class VersionStore {
  version = '';

  isLoading = true;

  isError = false;

  constructor() {
    makeAutoObservable(this);

    versionService()
      .then((version) => {
        runInAction(() => {
          this.version = version[0];
          this.isLoading = false;
        });
      })
      .catch(() => {
        this.isError = true;
      });
  }
}

export default new VersionStore();
