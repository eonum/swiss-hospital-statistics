require 'abstract/interval_category'

class GeneralIntervalCategory < IntervalCategory
  include Mongoid::Document
  include MultiLanguageText

  field :dad, :type => Integer
  field :sa, :type => Integer
  field :min, :type => Integer
  field :max, :type => Integer

  def name
    return 'GeneralIntervalCategory'
  end

end