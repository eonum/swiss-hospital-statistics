require_relative "../../../../app/helpers/parsers/su_dicd_parser.rb"

require 'minitest/autorun'

class TestSuDICDParser < MiniTest::Unit::TestCase

  def setup
    @parser = SuDICDParser.new("./test/fixtures/su_d_icd.xls")
  end

  def test_basic_test
    @parser.parse
  end
end
