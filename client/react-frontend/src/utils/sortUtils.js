/**
 * Sorts the given data based on the selected option.
 * @param {Array} data - The data to be sorted.
 * @param {string} option - The selected sort option.
 * @returns {Array} - The sorted data.
 */
export const sortItems = (data, option) => {
  switch (option) {
    case 'unused':
      return data.sort((a, b) => a.is_used - b.is_used);
    case 'valueHighToLow':
      return data.sort((a, b) => b.value - a.value);
    case 'valueLowToHigh':
      return data.sort((a, b) => a.value - b.value);
    case 'recent':
      return data.sort((a, b) => new Date(b.purchased_at || b.created_at) - new Date(a.purchased_at || a.created_at));
    case 'oldest':
      return data.sort((a, b) => new Date(a.purchased_at || a.created_at) - new Date(b.purchased_at || b.created_at));
    default:
      return data;
  }
};

/**
 * Generic handler for sort option changes.
 * @param {string} selectedOption - The sort option selected by the user.
 * @param {Function} setSortOption - Function to update the sort option state.
 * @param {Function} setData - Function to update the data state.
 * @param {Array} currentData - The current data to be sorted.
 */
export const handleSortChange = (selectedOption, setSortOption, setData, currentData) => {
  setSortOption(selectedOption);
  const sortedData = sortItems([...currentData], selectedOption);
  setData(sortedData);
};