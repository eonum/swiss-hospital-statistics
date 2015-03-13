require 'abstract/interval_category'

class ValueIntervalCategory < IntervalCategory
  include Mongoid::Document
  include MultiLanguageText

  @id = :valueInterval

end