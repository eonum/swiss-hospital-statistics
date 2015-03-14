require 'abstract/abstract_category'

class IntervalCategory < AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :interval, :type => Interval
  field :n, :type => Integer

  def initialize(interval, *args)
    super(*args)
    self.interval = interval
  end

end