require 'abstract/abstract_category'

class IntervalCategory < AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :interval, :type => Interval

end