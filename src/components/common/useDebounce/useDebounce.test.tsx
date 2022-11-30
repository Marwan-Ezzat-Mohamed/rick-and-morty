import '@testing-library/jest-dom';
import { waitFor, renderHook } from '@testing-library/react';

import useDebounce from './useDebounce';

describe('useDebounce', () => {
  it('returns the value after the delay', async () => {
    const value = 'test';
    const delay = 1000;
    const { result } = renderHook(() => useDebounce(value, delay));
    await waitFor(() => {
      expect(result.current).toBe(value);
    });
  });

  it('returns the previous value if the value changes before the delay', async () => {
    const value = 'test';
    const newValue = 'new test';
    const delay = 1000;
    const { result, rerender } = renderHook(() => useDebounce(value, delay));
    rerender();
    await waitFor(() => {
      expect(result.current).toBe(value);
    });

    rerender(newValue);
    await waitFor(() => {
      expect(result.current).toBe(value);
    });
  });

  it('returns the new value if the value changes after the delay', async () => {
    const value = 'test';
    const delay = 1000;
    const { result, rerender } = renderHook(() => useDebounce(value, delay));
    rerender();
    await waitFor(() => {
      expect(result.current).toBe(value);
    });
  });
});
