class Interval
  include Mongoid::Document
  include MultiLanguageText

  field :from, :type => Integer
  field :to, :type => Integer

  def duration
    (to - from)
  end

  def is_infinite
    !to
  end

  def from_s (string)
    arr = string.split(/-|\+/).collect{|each| each.to_i}
    self.from = arr[0] unless arr.empty?
    self.to = arr[1] if arr.length > 1
  end

end