require 'abstract/abstract_dataset'
require 'abstract/categorised_data'
require 'pragmas'

class CategorisedDataset < AbstractDataset

  embeds_one :categorised_data, class_name: "CategorisedData", inverse_of: :categorised_dataset

  def new_data
    build_categorised_data
    categorised_data
  end
end