import { twMerge } from "tailwind-merge";

export const truncateString = (
  address?: string,
  startingCharacters = 20,
  endingCharacters = 20
): string => {
  if (!address) return "";
  return `${address.slice(0, startingCharacters)}...${address.slice(
    address.length - endingCharacters
  )}`;
};

export const converGweiToEth = (value: bigint, maxLength = 6) => {
  return (Number(value.toString()) / 1000000000000000000)
    .toString()
    .substring(0, maxLength);
};

export const cn = (...args: string[]) => {
  return twMerge(...args);
};
