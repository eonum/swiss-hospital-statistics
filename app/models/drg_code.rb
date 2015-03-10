require 'abstract/categorised_code'

class DrgCode < CategorisedCode

  include Mongoid::Document
  include MultiLanguageText

  def name
    return 'AgeCode'
  end

end