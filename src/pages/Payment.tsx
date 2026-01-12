import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Book } from '@/data/books';
import { CreditCard, Truck, Check, ArrowLeft, Shield } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book as Book | undefined;
  
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 font-display text-2xl font-bold">No book selected</h2>
          <Link to="/buy">
            <Button>Browse Books</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container max-w-lg">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <Check className="h-10 w-10 text-success" />
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
              Order Confirmed!
            </h2>
            <p className="mb-6 text-muted-foreground">
              Your order for "{book.title}" has been placed successfully.
              {paymentMethod === 'cod' && ' Pay ₹' + book.price + ' on delivery.'}
            </p>
            <div className="mb-6 rounded-xl bg-muted/50 p-4 text-left">
              <p className="text-sm text-muted-foreground mb-1">Order Details:</p>
              <p className="font-medium">{book.title}</p>
              <p className="text-sm text-muted-foreground">Seller: {book.sellerName}, {book.sellerCity}</p>
              <p className="text-sm font-semibold text-foreground mt-2">Total: ₹{book.price}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={() => navigate('/my-listings')}>
                View Orders
              </Button>
              <Button variant="outline" onClick={() => navigate('/buy')}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      <div className="container py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Checkout</h1>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
                <h3 className="mb-4 font-display font-semibold text-foreground">Order Summary</h3>
                <div className="flex gap-4">
                  <div className="h-20 w-16 overflow-hidden rounded-lg bg-muted">
                    <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground line-clamp-2">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.examType} • {book.condition}</p>
                    <p className="mt-1 text-lg font-bold text-foreground">₹{book.price}</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{book.price}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-lg">₹{book.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-4 font-display font-semibold text-foreground">Payment Method</h3>
                
                <RadioGroup value={paymentMethod} onValueChange={(val) => setPaymentMethod(val as 'cod' | 'online')}>
                  <div className={`flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">Pay when you receive the book</p>
                      </div>
                    </Label>
                  </div>

                  <div className={`flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-colors mt-3 ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex items-center gap-3 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Online Payment</p>
                        <p className="text-sm text-muted-foreground">UPI, Card, Net Banking (Demo)</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-6 flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm text-success">
                  <Shield className="h-4 w-4" />
                  <span>Secure transaction • Student verified seller</span>
                </div>

                <Button
                  variant="hero"
                  size="xl"
                  className="w-full mt-6"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay ₹${book.price}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
