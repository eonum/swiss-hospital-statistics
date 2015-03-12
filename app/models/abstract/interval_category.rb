require 'abstract/abstract_category'

class IntervalCategory < AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :interval, :type => Interval

  def name
    'Interval Category'
  end

  def interval
    self.interval
  end

  def amount
    #TODO: what is amount?
  end

end