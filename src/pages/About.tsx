import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Heart, Recycle, Users, Target, ArrowRight } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Books Exchanged', value: '5,000+' },
    { label: 'Active Students', value: '2,500+' },
    { label: 'Cities Covered', value: '50+' },
    { label: 'Money Saved', value: '₹15L+' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="container py-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground">About Book Exchange Club</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We're on a mission to make entrance exam preparation affordable for every student in India.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-display text-3xl font-bold text-foreground">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Book Exchange Club was born from a simple observation: entrance exam books are 
                <strong className="text-foreground"> expensive</strong>, used for only a 
                <strong className="text-foreground"> few months</strong>, and then often 
                <strong className="text-foreground"> discarded or forgotten</strong>.
              </p>
              <p>
                Whether you're preparing for B.Ed, M.Ed, NEET, or JEE, the cost of study materials 
                can be overwhelming. We saw thousands of perfectly good books sitting unused after 
                exams, while new aspirants struggled to afford the same resources.
              </p>
              <p>
                That's why we created a platform where students can <strong className="text-foreground">buy, sell, 
                and exchange</strong> entrance exam books directly with each other. It's simple, 
                affordable, and sustainable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-foreground">What We Stand For</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">Student First</h3>
              <p className="text-muted-foreground">
                Everything we do is for students. We keep fees minimal and focus on making the platform 
                easy to use.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Recycle className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">Sustainability</h3>
              <p className="text-muted-foreground">
                By reusing books, we reduce waste and help the environment. Every exchange is a 
                step towards sustainability.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">Community</h3>
              <p className="text-muted-foreground">
                We're building a community of learners who support each other through their 
                educational journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="overflow-hidden rounded-2xl gradient-warm p-8 text-center md:p-12">
            <Target className="mx-auto mb-4 h-12 w-12 text-primary-foreground" />
            <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">
              Join Our Mission
            </h2>
            <p className="mb-6 text-primary-foreground/90 md:text-lg">
              Be part of the movement to make education more affordable.
            </p>
            <Link to="/signup">
              <Button size="xl" className="bg-card text-foreground hover:bg-card/90">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
