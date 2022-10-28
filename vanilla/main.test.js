import fs from 'fs';
import path from 'path';
import { v4 as uuidV4 } from 'uuid';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { LOCAL_STORAGE_KEY, loadTasks, saveTasks } from './main';

describe('app elements', () => {
  const html = fs.readFileSync(path.resolve(__dirname, './index.html'));

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  it('should have correct elements', () => {
    const appElement = document.querySelector('#app');
    expect(appElement).toMatchSnapshot();
  });

  it('should match page title & header with app name', () => {
    const appName = 'Vanilla Todo List';
    const titleElement = document.querySelector('title');
    const headerElement = document.querySelector('h1');

    // innerText returns 'undefined'?
    expect(titleElement.innerHTML).toBe(appName);
    expect(headerElement.innerHTML).toBe(appName);
  });
});

describe('localStorage functions', () => {
  const initialTasks = [
    {
      id: uuidV4(),
      title: 'Create data',
      completed: false,
    },
    {
      id: uuidV4(),
      title: 'Read data',
      completed: false,
    },
    {
      id: uuidV4(),
      title: 'Update data',
      completed: false,
    },
    {
      id: uuidV4(),
      title: 'Delete data',
      completed: false,
    },
  ];
  const localStorageMock = (function () {
    let store = {};

    return {
      getItem(key) {
        return store[key];
      },

      setItem(key, value) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  })();
  vi.stubGlobal('localStorage', localStorageMock);

  beforeEach(() => {
    localStorage.clear();
  });

  it('should load empty initial tasks', () => {
    const emptyLoadedInitialTasks = loadTasks();
    expect(emptyLoadedInitialTasks).toStrictEqual([]);
  });

  it('should load initial tasks', () => {
    // initial browser load
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialTasks));

    const tasks = loadTasks();
    expect(tasks).toStrictEqual(initialTasks);
  });

  it('should save tasks', () => {
    saveTasks(initialTasks);

    const tasks = loadTasks();
    expect(tasks).toStrictEqual(initialTasks);
  });
});
