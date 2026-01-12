import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useListings } from '@/context/ListingsContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, User, ShoppingCart, Repeat, Check } from 'lucide-react';
import { toast } from 'sonner';

const conditionColors = {
  'Like New': 'bg-success/10 text-success border-success/20',
  'Good': 'bg-primary/10 text-primary border-primary/20',
  'Marked': 'bg-warning/10 text-warning border-warning/20',
};

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, requestExchange, userListings } = useListings();
  const { isAuthenticated } = useAuth();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isExchanging, setIsExchanging] = useState(false);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 font-display text-2xl font-bold">Book not found</h2>
          <Link to="/buy">
            <Button>Browse Books</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
  const hasListings = userListings.length > 0;

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase');
      navigate('/login');
      return;
    }
    setIsPurchasing(true);
    setTimeout(() => {
      navigate('/payment', { state: { book } });
    }, 300);
  };

  const handleExchange = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to request exchange');
      navigate('/login');
      return;
    }
    if (!hasListings) {
      toast.info('You need to list a book first to exchange');
      navigate('/sell');
      return;
    }
    
    setIsExchanging(true);
    try {
      await requestExchange(userListings[0].id, book.id);
      toast.success('Exchange request sent successfully!');
      navigate('/my-listings');
    } catch {
      toast.error('Failed to send exchange request');
    } finally {
      setIsExchanging(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="container py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </button>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
            <img
              src={book.image}
              alt={book.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4">
              <Badge className="bg-destructive text-destructive-foreground text-sm px-3 py-1">
                {discount}% OFF
              </Badge>
            </div>
            {book.forExchange && (
              <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
                <Repeat className="h-4 w-4" />
                Available for Exchange
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-sm">
                {book.examType}
              </Badge>
              <Badge variant="outline" className={`text-sm ${conditionColors[book.condition]}`}>
                {book.condition}
              </Badge>
            </div>

            <h1 className="mb-2 font-display text-3xl font-bold text-foreground lg:text-4xl">
              {book.title}
            </h1>

            <p className="mb-4 text-muted-foreground">
              by {book.author} • {book.publication}
            </p>

            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-foreground">₹{book.price}</span>
              <span className="text-xl text-muted-foreground line-through">₹{book.originalPrice}</span>
              <Badge variant="secondary" className="text-sm">
                Save ₹{book.originalPrice - book.price}
              </Badge>
            </div>

            <div className="mb-6 space-y-3 rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Used for:</span>
                <span className="font-medium text-foreground">{book.usedDuration}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Seller:</span>
                <span className="font-medium text-foreground">{book.sellerName}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium text-foreground">{book.sellerCity}</span>
              </div>
            </div>

            <p className="mb-8 text-muted-foreground">{book.description}</p>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <Button
                variant="hero"
                size="xl"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={isPurchasing}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isPurchasing ? 'Processing...' : 'Buy Now'}
              </Button>
              
              {book.forExchange && (
                <Button
                  variant="outline"
                  size="xl"
                  className="flex-1"
                  onClick={handleExchange}
                  disabled={isExchanging}
                >
                  <Repeat className="mr-2 h-5 w-5" />
                  {isExchanging ? 'Requesting...' : 'Request Exchange'}
                </Button>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm text-success">
              <Check className="h-4 w-4" />
              <span>Verified student seller • Safe transaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
