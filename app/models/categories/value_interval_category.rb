require 'abstract/interval_category'

class ValueIntervalCategory < IntervalCategory
  include Mongoid::Document
  include MultiLanguageText

  def name
    return 'ValueIntervalCategory'
  end

end