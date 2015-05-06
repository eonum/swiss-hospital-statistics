class AbstractCategory

  attr_accessor :categories

  # tags will be used to identify the category
  # default value is set to unknown
  @tag = 'unknown'

  # class method that returns the variable @tag
  def self.tag
    @tag
  end

  def initialize
    super
    @categories = {}
  end

  def instance_values
    my_values = Hash[instance_variables.map { |name| [name[1..-1], instance_variable_get(name)] }]
    my_values[:_mongoclass] = self.class.name
    my_values
  end

  # Tests if category is already present. If it is
  # the category is pushed to existing hash key, otherwise
  # a new key value pair is created.
  # param category a category to be added ()eg. PercentilCategory)
  def add (category)
    @categories[category.class.tag.to_s] = [] unless self.at(category.class.tag)
    self.at(category.class.tag.to_s).push(category)
  end

  # Adds several categories to the class field.
  def add_all (categories)
    categories.each { |each| self.add(each) }
  end

  # if category_id is already present in categories hash
  # it will return its value thus true, otherwise false
  # param category_id category_id is the string of a category class
  def at (category_id)
    @categories[category_id.to_s]
  end

  def at_find (category_id, &block)
    return self.at(category_id) unless block_given?
    selected = self.at(category_id).select(&block)
    return nil if selected.empty?
    return selected.first if selected.length == 1
    selected
  end

end