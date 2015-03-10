class Interval
  include Mongoid::Document
  include MultiLanguageText

  field :from, :type => Integer
  field :to, :type => Integer

  def from
    return :from
  end

  def to
    return :to
  end

  def duration
    return (:to - :from)
  end

  def isInfinite
    #TODO: what's the convention for infnity?
  end

end