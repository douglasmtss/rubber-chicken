import { renderHook, act } from '@testing-library/react';

// Mock Howler
jest.mock('howler', () => ({
  Howl: jest.fn().mockImplementation(() => ({
    play: jest.fn(),
  })),
}));

import { useChickenSound } from '@/hooks/useChickenSound';
import { Howl } from 'howler';

describe('useChickenSound', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes without creating Howl instances until playSound is called', () => {
    renderHook(() => useChickenSound());
    expect(Howl).not.toHaveBeenCalled();
  });

  it('creates 3 Howl instances on first playSound call', () => {
    const { result } = renderHook(() => useChickenSound());
    act(() => {
      result.current.playSound();
    });
    expect(Howl).toHaveBeenCalledTimes(3);
  });

  it('does not recreate Howl instances on subsequent calls', () => {
    const { result } = renderHook(() => useChickenSound());
    act(() => {
      result.current.playSound();
      result.current.playSound();
    });
    expect(Howl).toHaveBeenCalledTimes(3);
  });

  it('calls play() on a random sound', () => {
    const mockPlay = jest.fn();
    (Howl as jest.Mock).mockImplementation(() => ({ play: mockPlay }));
    const { result } = renderHook(() => useChickenSound());
    act(() => {
      result.current.playSound();
    });
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });
});
