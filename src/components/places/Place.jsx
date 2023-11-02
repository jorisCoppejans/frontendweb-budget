import { memo } from 'react';
import StarRating from './StarRating';
import { useThemeColors } from '../../context/Theme.context';

const Place = ({ id, name, rating, onRate, onDelete }) => {
  const handleRate = (newRating) => {
    onRate(id, newRating);
  };

  const {theme, oppositeTheme} = useThemeColors();

  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <div className={`card bg-${theme} border-${oppositeTheme} text-${oppositeTheme} mb-4`}>
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <StarRating selectedStars={rating} onRate={handleRate} />
        <button className='btn btn-primary' onClick={handleDelete}>
          Verwijder
        </button>
      </div>
    </div>
  );
};

export default memo(Place);
