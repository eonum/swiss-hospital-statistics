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

  def at_find (category_id, &block)
    return self.at(category_id) unless block_given?
    selected = self.at(category_id).select(block)
    return nil if selected.empty?
    return selected.first if selected.length == 1
    selected
  end

end