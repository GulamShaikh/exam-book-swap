import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useListings } from '@/context/ListingsContext';
import BookCard from '@/components/books/BookCard';
import BookFilters from '@/components/books/BookFilters';
import { ExamType, Condition } from '@/data/books';
import { ShoppingCart, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const BuyBooks = () => {
  const [searchParams] = useSearchParams();
  const initialExam = searchParams.get('exam') as ExamType | null;
  
  const { books } = useListings();
  const [selectedExam, setSelectedExam] = useState<ExamType | 'all'>(initialExam || 'all');
  const [selectedCondition, setSelectedCondition] = useState<Condition | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeBooks = useMemo(() => {
    return books.filter((book) => {
      if (book.status !== 'Active') return false;
      if (selectedExam !== 'all' && book.examType !== selectedExam) return false;
      if (selectedCondition !== 'all' && book.condition !== selectedCondition) return false;
      if (book.price < priceRange[0] || book.price > priceRange[1]) return false;
      return true;
    });
  }, [books, selectedExam, selectedCondition, priceRange]);

  const clearFilters = () => {
    setSelectedExam('all');
    setSelectedCondition('all');
    setPriceRange([0, 1000]);
  };

  const FiltersContent = () => (
    <BookFilters
      selectedExam={selectedExam}
      selectedCondition={selectedCondition}
      priceRange={priceRange}
      onExamChange={setSelectedExam}
      onConditionChange={setSelectedCondition}
      onPriceChange={setPriceRange}
      onClearFilters={clearFilters}
    />
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Buy Books</h1>
          </div>
          <p className="text-muted-foreground">
            Browse affordable entrance exam books from fellow students.
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden w-72 flex-shrink-0 lg:block">
            <div className="sticky top-24">
              <FiltersContent />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{activeBooks.length}</span> books
              </p>
              
              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-background">
                  <SheetHeader>
                    <SheetTitle className="font-display">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FiltersContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Books Grid */}
            {activeBooks.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {activeBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 py-16">
                <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">No books found</h3>
                <p className="mb-4 text-sm text-muted-foreground">Try adjusting your filters</p>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyBooks;
