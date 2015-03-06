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
    return :description;
  end

  def years
    return :years;
  end

  def at

  end

  def fromJSON

  end

  def asJSON

  end

  def newData

  end
end