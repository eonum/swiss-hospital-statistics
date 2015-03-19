require 'abstract/abstract_dataset'
require 'abstract/categorised_data'
require 'pragmas'

class CategorisedDataset < AbstractDataset

  def new_data(year)
    CategorisedData.new(year: year)
  end

end