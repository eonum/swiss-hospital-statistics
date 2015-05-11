class Top3IcdDataset < CategorisedDataset
  pragmatize!

  @tag = :top_3_icd
  @type_description = 'Icd code means something and does something'

  _parser
  def self.top_3_parser
    Top3IcdParser.new('public/statistics/je-d-14.04.02.02.01.xls').stream(Top3IcdStream.new(self))
  end

  # Adds an extension method to code catalog
  # annotated with _code pragma
  # to indicate that icd chapter age sex dataset exists
  class Catalog
    pragmatize!

    _code
    def top_3_icd_dataset(context)
      Top3IcdDataset
    end
  end

end