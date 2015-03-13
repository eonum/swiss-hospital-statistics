require 'abstract/abstract_data'

class CategorisedData < AbstractData
  include Mongoid::Document
  include MultiLanguageText

  field :categories, :type => Hash, :default => { }

  def add (category)
    self.categories[category.id] = [] unless self.at(category.id)
    self.at(category.id).push(category)
    category
  end

  def add_all (categories)
    categories.each { |each| self.add(each) }
  end

  def at (category_id)
    self.categories[category_id]
  end

end