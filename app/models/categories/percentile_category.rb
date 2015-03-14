require 'abstract/abstract_category'

class PercentileCategory < AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :percentile, :type => Integer
  field :amount, :type => Float

  @id = :percentile

  def initialize (percentile, amount, *args)
    super(*args)
    self.percentile = percentile
    self.amount = amount
  end

end