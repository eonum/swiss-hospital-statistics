class Interval
  include Mongoid::Document
  include MultiLanguageText

  field :from, :type => Integer
  field :to, :type => Integer

  def initialize (from = nil, to = nil, *args)
    super(args)
    self.from = from
    self.to = to
  end

  def duration
    return Float::INFINITY if self.infinite?
    (to - from)
  end

  def infinite?
    !to
  end

  def ==(another)
    self.from == another.from && self.to == another.to
  end

  def from_s (string)
    arr = string.split(/-|\+/).collect{|each| each.to_i}
    self.from = arr[0] unless arr.empty?
    self.to = arr[1] if arr.length > 1
    self
  end

end