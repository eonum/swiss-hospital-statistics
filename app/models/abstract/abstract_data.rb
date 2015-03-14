class AbstractData
  include Mongoid::Document
  include MultiLanguageText

  field :year, :type => Integer

  def initialize (year, *args)
    super(args)
    self.year = year
  end

end