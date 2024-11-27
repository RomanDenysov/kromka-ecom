import * as migration_20241127_001723 from './20241127_001723';

export const migrations = [
  {
    up: migration_20241127_001723.up,
    down: migration_20241127_001723.down,
    name: '20241127_001723'
  },
];
