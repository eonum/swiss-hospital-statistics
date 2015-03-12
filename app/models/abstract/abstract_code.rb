class AbstractCode
  include Mongoid::Document
  include MultiLanguageText

  field :code, :type => String
  field :description, :type => String
  field :years, :type => Hash

  def name
    return 'Abstract Code';
  end

  def description
    self.description;
  end

  def years
    self.years;
  end

  def at(year)
    self.years[year]
  end

  def newData
    AbstractData.new(self.years)
  end

end