import PropTypes from 'prop-types';
import { FiMapPin, FiStar, FiDollarSign } from 'react-icons/fi';
import Button from '../common/Button';

/**
 * VendorCard Component
 * @description Card displaying vendor information and match score
 */
const VendorCard = ({ vendor, onViewDetails, onContact }) => {
  const {
    name,
    description,
    location,
    rating,
    reviewCount,
    matchScore,
    priceRange,
    specialties = [],
    logo,
  } = vendor;

  return (
    <div className="card hover:shadow-hard transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          {logo && (
            <img
              src={logo}
              alt={`${name} logo`}
              className="w-16 h-16 rounded-lg object-cover"
            />
          )}
          <div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <FiMapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{location}</span>
            </div>
          </div>
        </div>

        {matchScore && (
          <div className="bg-navy-100 text-navy-700 px-4 py-2 rounded-lg font-bold text-lg">
            {matchScore}% Match
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>

      <div className="flex items-center space-x-4 mb-4">
        {rating && (
          <div className="flex items-center space-x-1">
            <FiStar className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold text-gray-900">{rating}</span>
            {reviewCount && (
              <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
            )}
          </div>
        )}

        {priceRange && (
          <div className="flex items-center space-x-1 text-gray-700">
            <FiDollarSign className="w-5 h-5" />
            <span className="font-medium">{priceRange}</span>
          </div>
        )}
      </div>

      {specialties.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {specialty}
            </span>
          ))}
          {specialties.length > 3 && (
            <span className="px-3 py-1 text-gray-500 text-sm">
              +{specialties.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="flex space-x-3 mt-4">
        <Button
          variant="primary"
          size="medium"
          onClick={() => onViewDetails(vendor)}
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="secondary"
          size="medium"
          onClick={() => onContact(vendor)}
          className="flex-1"
        >
          Contact
        </Button>
      </div>
    </div>
  );
};

VendorCard.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    matchScore: PropTypes.number,
    priceRange: PropTypes.string,
    specialties: PropTypes.arrayOf(PropTypes.string),
    logo: PropTypes.string,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
  onContact: PropTypes.func.isRequired,
};

export default VendorCard;
