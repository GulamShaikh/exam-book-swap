import { Link } from 'react-router-dom';
import { Book } from '@/data/books';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Repeat } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

const conditionColors = {
  'Like New': 'bg-success/10 text-success border-success/20',
  'Good': 'bg-primary/10 text-primary border-primary/20',
  'Marked': 'bg-warning/10 text-warning border-warning/20',
};

const BookCard = ({ book }: BookCardProps) => {
  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all duration-300 hover:shadow-card">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {book.forExchange && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
            <Repeat className="h-3 w-3" />
            Exchange
          </div>
        )}
        <div className="absolute left-2 top-2">
          <Badge className="bg-destructive text-destructive-foreground">
            {discount}% OFF
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {book.examType}
          </Badge>
          <Badge variant="outline" className={`text-xs ${conditionColors[book.condition]}`}>
            {book.condition}
          </Badge>
        </div>

        <h3 className="mb-1 line-clamp-2 font-display text-base font-semibold text-foreground">
          {book.title}
        </h3>

        <p className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {book.sellerCity}
        </p>

        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">₹{book.price}</span>
          <span className="text-sm text-muted-foreground line-through">₹{book.originalPrice}</span>
        </div>

        <Link to={`/book/${book.id}`}>
          <Button className="w-full" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
