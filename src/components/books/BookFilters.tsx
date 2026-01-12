import { ExamType, Condition, examTypes, conditions } from '@/data/books';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface BookFiltersProps {
  selectedExam: ExamType | 'all';
  selectedCondition: Condition | 'all';
  priceRange: [number, number];
  onExamChange: (exam: ExamType | 'all') => void;
  onConditionChange: (condition: Condition | 'all') => void;
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

const BookFilters = ({
  selectedExam,
  selectedCondition,
  priceRange,
  onExamChange,
  onConditionChange,
  onPriceChange,
  onClearFilters,
}: BookFiltersProps) => {
  const hasFilters = selectedExam !== 'all' || selectedCondition !== 'all' || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Filters</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground">
            <X className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-5">
        {/* Exam Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Exam Type</Label>
          <Select value={selectedExam} onValueChange={(val) => onExamChange(val as ExamType | 'all')}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select exam type" />
            </SelectTrigger>
            <SelectContent className="bg-card border border-border z-50">
              <SelectItem value="all">All Exams</SelectItem>
              {examTypes.map((exam) => (
                <SelectItem key={exam} value={exam}>
                  {exam}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Condition */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Condition</Label>
          <Select value={selectedCondition} onValueChange={(val) => onConditionChange(val as Condition | 'all')}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent className="bg-card border border-border z-50">
              <SelectItem value="all">Any Condition</SelectItem>
              {conditions.map((cond) => (
                <SelectItem key={cond} value={cond}>
                  {cond}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Price Range</Label>
            <span className="text-sm text-muted-foreground">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={(val) => onPriceChange(val as [number, number])}
            min={0}
            max={1000}
            step={50}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BookFilters;
