export const frameNumbers = (maximum: number) => {
  let nextFrame = 0;

  return {
    [Symbol.iterator]: () => ({
      next: () => {
        if (nextFrame >= maximum) {
          return { done: true, value: undefined };
        }

        const value = nextFrame;
        nextFrame += 1;
        return { done: false, value };
      },
    }),
  };
};
