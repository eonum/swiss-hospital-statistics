require 'abstract/abstract_code'

class CategorisedCode < AbstractCode

  def new_data(year)
    CategorisedData.new(year)
  end

end