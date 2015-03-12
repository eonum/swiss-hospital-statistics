require 'abstract/abstract_data'

class CategorisedData < AbstractData
  include Mongoid::Document
  include MultiLanguageText

  field :categories, :type => Hash

  def categories
    :categories.self
  end

  def at(key)
    :categories[key]
  end

end