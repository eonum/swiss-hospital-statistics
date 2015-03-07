class AbstractCategory
  include Mongoid::Document
  include MultiLanguageText

  field :categories, :type => Array

  def name
    return 'AbstractCategory'
  end

  def categories
    #TODO: implement this
  end

  def at
    #TODO: implement this
  end


end