require 'abstract/categorised_dataset'
require 'parsers/codes/je_icd_chapter_age_sex_parser'
require 'catalog'

class IcdChapterAgeSexDataset < CategorisedDataset
  belongs_to :icd_chapter

  pragmatize!

  @tag = :icd_chapter_age_sex
  @type_description = 'An icd chapter age sex dataset indicates in which icd chapters most diagnoses fell by age category and sex'

  def find_parent
    # find corresponding Icd Code
    IcdChapter.where(roman_number: self.code).first
  end

  def persist_dataset
    parent_code = find_parent
    if parent_code.nil?
      self.save
    else
      # persist self on parent
      parent_code.icd_chapter_age_sex_datasets.push(self)
      parent_code.save
    end
  end

  _parser
  def self.age_sex_parser
    JeIcdChapterAgeSexParser.new('public/statistics/je-d-14.04.02.02.02.xls')
  end
end


# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that icd chapter age sex dataset exists
class Catalog
  pragmatize!

  _code
  def icd_chapter_age_sex_dataset(context)
    IcdChapterAgeSexDataset
  end
end