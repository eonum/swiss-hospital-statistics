require 'abstract/categorised_code'
require 'catalog'
require 'parsers/codes/su_chop_drg_icd_parser'
require 'parsers/streams/su_chop_drg_icd_stream'

class ChopCodeDataset < CategorisedDataset
  pragmatize!

  belongs_to :chop_code

  @tag = :chop
  @type_description = 'Chop code means something and does something'

  _parser
  def self.chop_parser
    SuChopDrgIcdParser.new('public/statistics/su-d-14.04.02-CHOP-zp-2013.xls').stream(SuChopDrgIcdStream.new(self))
    #SuChopDrgIcdParser.new('./test/fixtures/su_d_chop.xls').stream(SuChopDrgIcdStream.new(self))
  end
end

# Adds an extension method to code catalog
# annotated with _code pragma
# to indicate that chop code exists
class Catalog
  pragmatize!

  _code
  def chop_code_in(context)
    ChopCodeDataset
  end
end