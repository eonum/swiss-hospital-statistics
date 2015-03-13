class AbstractCategory
  include Mongoid::Document
  include MultiLanguageText
  include ClassInstanceVariables

  field :categories, :type => Hash, :default => { }

  inheritable_attributes :id

  @id = 'unknown'

  def add (category)
    self.categories[category.class.id] = [] unless self.at(category.class.id)
    self.at(category.class.id).push(category)
    category
  end

  def add_all (categories)
    categories.each { |each| self.add(each) }
  end

  def at (category_id)
    self.categories[category_id]
  end

end