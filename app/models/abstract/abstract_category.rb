class AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :categories, :type => Hash, :default => { }

  @tag = 'unknown'

  def self.tag
    @tag
  end

  def add (category)
    categories_copy = self.categories.deep_copy
    categories_copy[category.class.tag.to_s] = [] unless self.at(category.class.tag)
    categories_copy[category.class.tag.to_s].push(category)
    self.categories = categories_copy
  end

  def add_all (categories)
    categories.each { |each| self.add(each) }
  end

  def at (category_id)
    self.categories[category_id.to_s]
  end

  def at_find (category_id, &block)
    return self.at(category_id) unless block_given?
    selected = self.at(category_id).select(&block)
    return nil if selected.empty?
    return selected.first if selected.length == 1
    selected
  end

end