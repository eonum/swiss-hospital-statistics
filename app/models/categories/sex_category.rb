require 'abstract/abstract_category'

class SexCategory < AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :sex, :type => Integer

  @id = :sex

end