import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListings } from '@/context/ListingsContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { examTypes, conditions, ExamType, Condition } from '@/data/books';
import { Tag, Upload, Check, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

const SellBooks = () => {
  const navigate = useNavigate();
  const { addListing } = useListings();
  const { isAuthenticated } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    examType: '' as ExamType | '',
    condition: '' as Condition | '',
    usedDuration: '',
    price: '',
    city: '',
    phone: '',
    forExchange: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to list a book');
      navigate('/login');
      return;
    }

    if (!formData.title || !formData.examType || !formData.condition || !formData.price || !formData.city) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await addListing({
        title: formData.title,
        examType: formData.examType as ExamType,
        condition: formData.condition as Condition,
        usedDuration: formData.usedDuration || '6 months',
        price: parseInt(formData.price),
        city: formData.city,
        phone: formData.phone,
        forExchange: formData.forExchange,
      });
      setSubmitted(true);
      toast.success('Book listed successfully!');
    } catch {
      toast.error('Failed to list book');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container max-w-lg">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <Check className="h-10 w-10 text-success" />
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
              Book Listed Successfully!
            </h2>
            <p className="mb-6 text-muted-foreground">
              Your book is now visible to thousands of students looking for affordable entrance exam books.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={() => navigate('/my-listings')}>
                View My Listings
              </Button>
              <Button variant="outline" onClick={() => { setSubmitted(false); setFormData({ title: '', examType: '', condition: '', usedDuration: '', price: '', city: '', phone: '', forExchange: true }); }}>
                List Another Book
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
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Sell Your Books</h1>
          </div>
          <p className="text-muted-foreground">
            Turn your used entrance exam books into cash. List for free!
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
            {/* Book Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Book Name *</Label>
              <Input
                id="title"
                placeholder="e.g., NCERT Physics Class 12"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-background"
              />
            </div>

            {/* Exam Type & Condition */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Exam Category *</Label>
                <Select value={formData.examType} onValueChange={(val) => setFormData({ ...formData, examType: val as ExamType })}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border z-50">
                    {examTypes.map((exam) => (
                      <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Condition *</Label>
                <Select value={formData.condition} onValueChange={(val) => setFormData({ ...formData, condition: val as Condition })}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border z-50">
                    {conditions.map((cond) => (
                      <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Used Duration & Price */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">Used Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 6 months"
                  value={formData.usedDuration}
                  onChange={(e) => setFormData({ ...formData, usedDuration: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Expected Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 350"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-background"
                />
              </div>
            </div>

            {/* City & Phone */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="e.g., Delhi"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g., 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background"
                />
              </div>
            </div>

            {/* Image Upload (Dummy) */}
            <div className="space-y-2">
              <Label>Book Image</Label>
              <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 transition-colors hover:border-primary/50 cursor-pointer">
                <div className="text-center">
                  <ImagePlus className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload book image</p>
                  <p className="text-xs text-muted-foreground">(Demo: Image will be auto-assigned)</p>
                </div>
              </div>
            </div>

            {/* Exchange Option */}
            <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
              <div>
                <p className="font-medium text-foreground">Available for Exchange</p>
                <p className="text-sm text-muted-foreground">Allow other students to propose book exchanges</p>
              </div>
              <Switch
                checked={formData.forExchange}
                onCheckedChange={(checked) => setFormData({ ...formData, forExchange: checked })}
              />
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
              <Upload className="mr-2 h-5 w-5" />
              {isSubmitting ? 'Listing...' : 'List My Book'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellBooks;
