import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, dummyBooks, ExamType, Condition, ListingStatus } from '@/data/books';

interface NewListing {
  title: string;
  examType: ExamType;
  condition: Condition;
  usedDuration: string;
  price: number;
  city: string;
  phone: string;
  forExchange: boolean;
}

interface ExchangeRequest {
  id: string;
  fromBookId: string;
  toBookId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface ListingsContextType {
  books: Book[];
  userListings: Book[];
  exchangeRequests: ExchangeRequest[];
  addListing: (listing: NewListing) => Promise<Book>;
  updateListingStatus: (bookId: string, status: ListingStatus) => void;
  removeListing: (bookId: string) => void;
  requestExchange: (fromBookId: string, toBookId: string) => Promise<ExchangeRequest>;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

export const ListingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(dummyBooks);
  const [userListings, setUserListings] = useState<Book[]>([]);
  const [exchangeRequests, setExchangeRequests] = useState<ExchangeRequest[]>([]);

  const addListing = async (listing: NewListing): Promise<Book> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newBook: Book = {
      id: 'book-' + Date.now(),
      title: listing.title,
      author: 'User Listed',
      publication: 'Various',
      examType: listing.examType,
      condition: listing.condition,
      price: listing.price,
      originalPrice: Math.round(listing.price * 1.5),
      usedDuration: listing.usedDuration,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop',
      sellerId: 'demo-user',
      sellerName: 'Demo Student',
      sellerCity: listing.city,
      description: `${listing.title} for ${listing.examType} preparation.`,
      status: 'Active',
      listedDate: new Date().toISOString().split('T')[0],
      forExchange: listing.forExchange,
    };

    setBooks(prev => [newBook, ...prev]);
    setUserListings(prev => [newBook, ...prev]);
    return newBook;
  };

  const updateListingStatus = (bookId: string, status: ListingStatus) => {
    setBooks(prev => prev.map(book => 
      book.id === bookId ? { ...book, status } : book
    ));
    setUserListings(prev => prev.map(book => 
      book.id === bookId ? { ...book, status } : book
    ));
  };

  const removeListing = (bookId: string) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
    setUserListings(prev => prev.filter(book => book.id !== bookId));
  };

  const requestExchange = async (fromBookId: string, toBookId: string): Promise<ExchangeRequest> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const request: ExchangeRequest = {
      id: 'exchange-' + Date.now(),
      fromBookId,
      toBookId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setExchangeRequests(prev => [...prev, request]);
    return request;
  };

  return (
    <ListingsContext.Provider value={{
      books,
      userListings,
      exchangeRequests,
      addListing,
      updateListingStatus,
      removeListing,
      requestExchange,
    }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
};
