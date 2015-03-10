require 'abstract/abstract_category'

class PercentileCategory < AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :percentile, :type => Integer
  field :amount, :type => Float

  def name
    return 'PercentileCategory'
  end

  def percentile
    return :percentile
  end

  def amount
    return :amount
  end

end