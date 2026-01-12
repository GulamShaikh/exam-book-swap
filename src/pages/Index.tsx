import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, ShoppingCart, Tag, Repeat, Leaf, Wallet, Users } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Wallet,
      title: 'Save Money',
      description: 'Buy used books at 40-60% lower prices than new ones.',
    },
    {
      icon: Leaf,
      title: 'Reduce Waste',
      description: 'Give your books a second life instead of throwing them away.',
    },
    {
      icon: Users,
      title: 'Student to Student',
      description: 'Direct exchange between verified student accounts.',
    },
  ];

  const examCategories = [
    { name: 'B.Ed', count: 120, color: 'bg-primary/10 text-primary' },
    { name: 'M.Ed', count: 85, color: 'bg-secondary/10 text-secondary' },
    { name: 'NEET', count: 340, color: 'bg-success/10 text-success' },
    { name: 'JEE', count: 290, color: 'bg-accent text-accent-foreground' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero book-pattern">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <BookOpen className="h-4 w-4" />
              India's #1 Entrance Exam Book Marketplace
            </div>
            
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Entrance Exam Books.{' '}
              <span className="text-primary">Reused Smartly.</span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Buy, sell, or exchange B.Ed, M.Ed, NEET, JEE and other entrance exam books at affordable prices. Join thousands of students saving money.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/buy">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Books
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  <Tag className="mr-2 h-5 w-5" />
                  Sell Your Books
                </Button>
              </Link>
              <Link to="/exchange">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  <Repeat className="mr-2 h-5 w-5" />
                  Exchange Books
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-4 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Why Choose Book Exchange Club?
            </h2>
            <p className="text-muted-foreground">
              We understand entrance exam books are expensive and used for a short time.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Categories */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Browse by Exam Category
            </h2>
            <p className="text-muted-foreground">
              Find books specifically for your entrance exam preparation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {examCategories.map((category) => (
              <Link
                key={category.name}
                to={`/buy?exam=${category.name}`}
                className="group rounded-xl border border-border bg-card p-6 text-center shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1"
              >
                <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full ${category.color} transition-transform group-hover:scale-110`}>
                  <span className="font-display text-xl font-bold">{category.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{category.count}+ Books</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="overflow-hidden rounded-2xl gradient-warm p-8 text-center md:p-12">
            <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Start?
            </h2>
            <p className="mb-8 text-primary-foreground/90 md:text-lg">
              Join thousands of students who are saving money on entrance exam books.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/signup">
                <Button size="xl" className="bg-card text-foreground hover:bg-card/90">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/buy">
                <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Browse Books
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
