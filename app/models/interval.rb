class Interval

  attr_accessor :from
  attr_accessor :to

  def duration
    return Float::INFINITY if self.infinite?
    (@to - @from)
  end

  def infinite?
    !@to
  end

  def ==(another)
    @from == another.from && @to == another.to
  end

  def from_s (string)
    arr = string.split(/-|\+/).collect{|each| each.to_i}
    @from = arr[0] unless arr.empty?
    @to = arr[1] if arr.length > 1
    self
  end

end