class AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :categories, :type => Array

  def name
    'AbstractCategory'
  end

  def add (category)
    self.categories[category.id] = [] unless self.at(category.id)
    self.categories[category.id].push(category)
    category
  end

  def add_all (categories)
    categories.each { |each| self.add(each) }
  end

  def at (category_id)
    self.categories[category_id]
  end


end