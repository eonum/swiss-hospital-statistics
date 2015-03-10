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

  def dad
    return :dad
  end

  def sa
    return :sa
  end

  def min
    return :min
  end

  def max
    return :max
  end

end