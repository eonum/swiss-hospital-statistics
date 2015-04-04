require 'abstract/categorised_dataset'
require 'parsers/codes/je_age_sex_parser'
require 'catalog'

class AgeSexDataset < CategorisedDataset
  belongs_to :icd_code

  pragmatize!

  @tag = :agesex
  @type_description = 'An age sex dataset indicates the 3 most common icd diagnosis per age category and sex'

  def find_parent
    # find corresponding Icd Code
    IcdCode.where(short_code: self.code).first
  end

  def persist_dataset
    parent_code = find_parent
    if parent_code.nil?
      self.save
    else
      # persist self on parent
      parent_code.icd_code_datasets.push(self)
      parent_code.save
    end
  end

  _parser
  def self.age_sex_parser
    JeAgeSexParser.new('public/statistics/je-d-14.04.02.02.01.xls')
  end
end


# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that agesex dataset exists
class Catalog
  pragmatize!

  _code
  def age_sex_dataset(context)
    AgeSexDataset
  end
end