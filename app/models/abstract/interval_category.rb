require 'abstract/abstract_category'

class IntervalCategory < AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :interval, :type => Interval

  def name
    return 'Interval Category'
  end

  def interval
    return :interval
  end

  def amount
    #TODO: what is amount?
  end

end