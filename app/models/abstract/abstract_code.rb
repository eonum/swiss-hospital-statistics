class AbstractCode
  include Mongoid::Document
  include MultiLanguageText

  field :code, :type => String
  field :description, :type => String
  field :years, :type => Hash

  def initialize
    years = Hash.new
  end

  def name
    return 'Abstract Code';
  end

  def description
    self.description;
  end

  # Adds the given data under the given year to this code
  # @param year the year to save the data under
  # @param data the data to save under the year
  def addYear(year, data)
    years[year] = data
  end

  def at(year)
    years[year]
  end

  def newData
    return CategorisedData.new
  end

end