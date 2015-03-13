require 'abstract/abstract_data'

class CategorisedData < AbstractData
  include Mongoid::Document
  include MultiLanguageText

  field :categories, :type => Hash, :default => { }

  def add (category)
    self.categories[category.id] = category
    category
  end

  def at (category_id)
    self.categories[category_id]
  end

end