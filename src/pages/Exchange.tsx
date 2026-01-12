import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useListings } from '@/context/ListingsContext';
import { useAuth } from '@/context/AuthContext';
import BookCard from '@/components/books/BookCard';
import { Button } from '@/components/ui/button';
import { Repeat, ArrowRight, Book, CheckCircle, Clock, Tag } from 'lucide-react';

const Exchange = () => {
  const { books, userListings, exchangeRequests } = useListings();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'browse' | 'how-it-works'>('browse');

  const exchangeableBooks = useMemo(() => {
    return books.filter((book) => book.status === 'Active' && book.forExchange);
  }, [books]);

  const steps = [
    {
      icon: Tag,
      title: 'List Your Book',
      description: 'Add the book you want to exchange to your listings. Make sure to enable "Available for Exchange".',
    },
    {
      icon: Book,
      title: 'Browse & Select',
      description: 'Find books you need from other students. Use filters to find the right exam category.',
    },
    {
      icon: Repeat,
      title: 'Send Request',
      description: 'Click "Request Exchange" on the book you want. The other student will be notified.',
    },
    {
      icon: CheckCircle,
      title: 'Confirm & Exchange',
      description: 'Once both parties agree, arrange to meet and exchange your books.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
              <Repeat className="h-5 w-5 text-secondary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Exchange Books</h1>
          </div>
          <p className="text-muted-foreground">
            Swap your books with other students. No money needed!
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Tabs */}
        <div className="mb-8 flex gap-2 rounded-xl bg-muted p-1">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'browse'
                ? 'bg-card text-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Browse for Exchange
          </button>
          <button
            onClick={() => setActiveTab('how-it-works')}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'how-it-works'
                ? 'bg-card text-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            How It Works
          </button>
        </div>

        {activeTab === 'how-it-works' ? (
          <div>
            {/* Steps */}
            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-soft h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block">
                      <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-secondary/10 p-8 text-center">
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                Ready to start exchanging?
              </h3>
              <p className="mb-6 text-muted-foreground">
                {isAuthenticated
                  ? userListings.length > 0
                    ? 'Browse books available for exchange below.'
                    : 'First, list a book you want to exchange.'
                  : 'Create an account to start exchanging books.'}
              </p>
              {isAuthenticated ? (
                userListings.length > 0 ? (
                  <Button variant="secondary" onClick={() => setActiveTab('browse')}>
                    <Repeat className="mr-2 h-4 w-4" />
                    Browse Books
                  </Button>
                ) : (
                  <Link to="/sell">
                    <Button variant="secondary">
                      <Tag className="mr-2 h-4 w-4" />
                      List Your First Book
                    </Button>
                  </Link>
                )
              ) : (
                <Link to="/signup">
                  <Button variant="secondary">Create Account</Button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* Exchange Requests Status */}
            {exchangeRequests.length > 0 && (
              <div className="mb-8 rounded-xl border border-border bg-card p-4 shadow-soft">
                <h3 className="mb-3 font-display font-semibold text-foreground">Your Exchange Requests</h3>
                <div className="space-y-2">
                  {exchangeRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm text-foreground">Exchange request pending</span>
                      </div>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Books Grid */}
            {exchangeableBooks.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {exchangeableBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 py-16">
                <Repeat className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">No books available</h3>
                <p className="mb-4 text-sm text-muted-foreground">Be the first to list a book for exchange!</p>
                <Link to="/sell">
                  <Button>List a Book</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exchange;
