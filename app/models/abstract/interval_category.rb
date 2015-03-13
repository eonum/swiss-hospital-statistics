require 'abstract/abstract_category'

class IntervalCategory < AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :interval, :type => Interval

  def name
    'Interval Category'
  end

  def amount
    #TODO
  end

end