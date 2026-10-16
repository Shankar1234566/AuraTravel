import { useLocalStorage } from './useLocalStorage';
import { DESTINATIONS } from '../data/destinations';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useLocalStorage('auratravel_favorites', ['bali', 'kyoto', 'swiss-alps']);

  const toggleFavorite = (id) => {
    let nextState;
    if (favoriteIds.includes(id)) {
      nextState = favoriteIds.filter((favId) => favId !== id);
    } else {
      nextState = [...favoriteIds, id];
    }
    setFavoriteIds(nextState);
    return !favoriteIds.includes(id);
  };

  const isFavorite = (id) => favoriteIds.includes(id);

  const favoriteDestinations = DESTINATIONS.filter((d) => favoriteIds.includes(d.id));

  return {
    favoriteIds,
    favoriteDestinations,
    toggleFavorite,
    isFavorite,
    count: favoriteIds.length
  };
}
