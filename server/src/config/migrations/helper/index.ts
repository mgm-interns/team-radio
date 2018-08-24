const Migrate = require('migrate');
const FileStore = require('migrate/lib/file-store');

export interface LoadOptions {
  set?: MigrationSet;
  stateStore: string | object;
  migrationsDirectory?: string;
  filterFunction?: (file: string) => boolean;
  sortFunction?: (file1: string, file2: string) => number;
}

export interface ErrorResult {}

export interface MigrationSet {
  up: () => Promise<void>;
  down: () => Promise<void>;
  getStoreState: () => Promise<object>;
}

export function load(options: LoadOptions): Promise<MigrationSet> {
  return new Promise((resolve, reject) => {
    Migrate.load(options, (error: ErrorResult, set: any) => {
      if (error) {
        reject(error);
      }
      resolve({
        ...set,
        getStoreState: async () => {
          if (set.store instanceof FileStore) {
            return new Promise((resolveStore, rejectStore) => {
              set.store.load((error: ErrorResult, store: object) => {
                if (error) {
                  rejectStore(error);
                }
                resolveStore(store);
              });
            });
          }
          return set.store;
        },
        up: () =>
          new Promise((resolve, reject) => {
            set.up((error: ErrorResult) => {
              if (error) {
                reject(error);
              }
              resolve();
            });
          }),
        down: () =>
          new Promise((resolve, reject) => {
            set.down((error: ErrorResult) => {
              if (error) {
                reject(error);
              }
              resolve();
            });
          })
      });
    });
  });
}
