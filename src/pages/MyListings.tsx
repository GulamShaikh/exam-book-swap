import { Link } from 'react-router-dom';
import { useListings } from '@/context/ListingsContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { List, Plus, Trash2, Edit, CheckCircle, MapPin, Repeat } from 'lucide-react';
import { toast } from 'sonner';

const statusColors = {
  Active: 'bg-success/10 text-success border-success/20',
  Sold: 'bg-muted text-muted-foreground border-border',
  Exchanged: 'bg-secondary/10 text-secondary border-secondary/20',
};

const MyListings = () => {
  const { userListings, updateListingStatus, removeListing } = useListings();
  const { isAuthenticated } = useAuth();

  const handleMarkAsSold = (bookId: string) => {
    updateListingStatus(bookId, 'Sold');
    toast.success('Book marked as sold!');
  };

  const handleRemove = (bookId: string) => {
    removeListing(bookId);
    toast.success('Listing removed');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container text-center">
          <List className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
          <h2 className="mb-2 font-display text-2xl font-bold text-foreground">Login Required</h2>
          <p className="mb-6 text-muted-foreground">Please login to view your listings.</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <List className="h-5 w-5 text-primary" />
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground">My Listings</h1>
              </div>
              <p className="text-muted-foreground">
                Manage your books listed for sale or exchange.
              </p>
            </div>
            <Link to="/sell">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Book
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {userListings.length > 0 ? (
          <div className="space-y-4">
            {userListings.map((book) => (
              <div
                key={book.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center"
              >
                {/* Image */}
                <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {book.examType}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${statusColors[book.status]}`}>
                      {book.status}
                    </Badge>
                    {book.forExchange && (
                      <Badge variant="outline" className="text-xs bg-secondary/10 text-secondary border-secondary/20">
                        <Repeat className="mr-1 h-3 w-3" />
                        Exchange
                      </Badge>
                    )}
                  </div>
                  <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">₹{book.price}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {book.sellerCity}
                    </span>
                    <span>Listed: {book.listedDate}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:flex-col">
                  {book.status === 'Active' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsSold(book.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Mark Sold
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemove(book.id)}
                        className="flex-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Remove
                      </Button>
                    </>
                  )}
                  {book.status !== 'Active' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemove(book.id)}
                      className="text-muted-foreground"
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 py-16">
            <List className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 font-display text-lg font-semibold text-foreground">No listings yet</h3>
            <p className="mb-4 text-sm text-muted-foreground">Start selling your entrance exam books!</p>
            <Link to="/sell">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                List Your First Book
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
