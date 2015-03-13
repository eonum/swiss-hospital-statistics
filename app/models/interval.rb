class Interval
  include Mongoid::Document
  include MultiLanguageText

  field :from, :type => Integer
  field :to, :type => Integer

  def duration
    return (to - from)
  end

  def isInfinite
    to.nil? && !from.nil?
  end

end