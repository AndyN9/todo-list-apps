import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen, renderHook, act } from '@testing-library/react';

import App, { LOCAL_STORAGE_KEY, useLocalStorage } from './App';

afterEach(() => {
  cleanup();
});

describe('app elements', () => {
  it('should have correct elements', () => {
    const appComponent = render(<App />);
    expect(appComponent).toMatchSnapshot();
  });

  it('should match header with app name', () => {
    render(<App />);
    const appName = 'React Todo List';

    const headingElement = screen.getByRole('heading', {
      name: appName,
      level: 1,
    });
    expect(headingElement).toBeInTheDocument();
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
    const { result } = renderHook(() => useLocalStorage(LOCAL_STORAGE_KEY));
    expect(result.current.value).toStrictEqual([]);
  });

  it('should load initial tasks', () => {
    // initial browser load
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialTasks));

    const { result } = renderHook(() => useLocalStorage(LOCAL_STORAGE_KEY));
    expect(result.current.value).toStrictEqual(initialTasks);
  });

  it('should save tasks', () => {
    const { result } = renderHook(() => useLocalStorage(LOCAL_STORAGE_KEY));

    act(() => {
      result.current.setValue(initialTasks);
    });

    expect(result.current.value).toStrictEqual(initialTasks);
  });
});

