require 'abstract/abstract_code'
require 'abstract/categorised_data'
require 'pragmas'

class CategorisedDataset < AbstractDataset

  def new_data(year)
    CategorisedData.new(year: year)
  end

end