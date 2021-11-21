export const isValidArray = <T>(inputArray: Array<T>) => {
	return Array.isArray(inputArray) && inputArray.length > 0;
};
