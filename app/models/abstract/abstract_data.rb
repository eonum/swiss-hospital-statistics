class AbstractData
  include Mongoid::Document
  include MultiLanguageText

  field :year, :type => Integer
end