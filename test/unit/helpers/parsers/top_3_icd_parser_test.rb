require 'test_helper'
require 'cascadable'

class Top3IcdParserTest < ActiveSupport::TestCase

  def setup

  end

  def test_raw_map
    @stream = Top3IcdStream.new(Top3IcdDataset)
    @parser = Top3IcdParser.new('public/statistics/je-d-14.04.02.02.01.xls').stream(@stream)
    @parser.parse
    @codes = @stream.to_codes
  end
end