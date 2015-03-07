require 'abstract/abstract_category'

class PercentileCategory < AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :percentile, :type => Integer

  def name
    return 'PercentileCategory'
  end

  def percentile
    return :percentile
  end

  def amount
    #TODO what is amont? how do I get it?
  end

end