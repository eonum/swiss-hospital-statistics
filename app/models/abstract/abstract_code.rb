class AbstractCode
  include Mongoid::Document
  include MultiLanguageText
  include ClassInstanceVariables

  field :code, :type => String
  field :description, :type => String
  field :years, :type => Hash, :default => {}

  inheritable_attributes :id, :name, :type_description

  @id = 'unknown'
  @name = 'Abstract Code'
  @type_description = 'Abstract code does nothing'

  # Adds the given data under the given year to this code
  # @param year the year to save the data under
  # @param data the data to save under the year
  def add_year(year, data)
    years[year] = data
  end

  def at(year)
    years[year]
  end

  def new_data
    CategorisedData.new
  end

end